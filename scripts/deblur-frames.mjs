import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";

const FOLDER = process.argv[2] ?? "ants-to-roaches";
const INPUT_DIR = path.join("public", "frames", FOLDER);
const OUTPUT_DIR = path.join("public", "frames", `${FOLDER}-deblurred`);

fal.config({ credentials: process.env.FAL_KEY });

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const fileStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), fileStream);
}

async function deblurFrame(frameName) {
  const inputPath = path.join(INPUT_DIR, frameName);
  const outputPath = path.join(OUTPUT_DIR, frameName);

  if (fs.existsSync(outputPath)) {
    console.log(`  skip (already done): ${frameName}`);
    return;
  }

  const fileBuffer = fs.readFileSync(inputPath);
  const blob = new Blob([fileBuffer], { type: "image/webp" });
  const imageUrl = await fal.storage.upload(blob);

  const result = await fal.subscribe("fal-ai/nafnet/deblur", {
    input: { image_url: imageUrl },
    logs: false,
  });

  const outputUrl = result.data.image?.url ?? result.data.images?.[0]?.url;
  if (!outputUrl) throw new Error(`No output URL in response: ${JSON.stringify(result.data)}`);

  await downloadFile(outputUrl, outputPath);
  console.log(`  done: ${frameName}`);
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("FAL_KEY environment variable is not set.");
    process.exit(1);
  }

  const frames = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f))
    .sort();

  if (frames.length === 0) {
    console.error(`No image frames found in ${INPUT_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Deblurring ${frames.length} frames from "${FOLDER}" → "${FOLDER}-deblurred"`);

  let done = 0;
  let failed = 0;

  for (const frame of frames) {
    try {
      await deblurFrame(frame);
      done++;
    } catch (err) {
      console.error(`  ERROR on ${frame}: ${err.message}`);
      failed++;
    }
    process.stdout.write(`\rProgress: ${done + failed}/${frames.length}  `);
  }

  console.log(`\nFinished. ${done} succeeded, ${failed} failed.`);
}

main();
