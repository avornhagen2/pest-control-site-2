"use client";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "GuardPest came out the same day I called. Within 48 hours the ant trails were completely gone. I haven't seen a single one since.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Rachel Monroe",
    role: "Homeowner, Austin TX",
  },
  {
    text: "I'd tried every store spray on the market. One visit from GuardPest and my roach problem was solved for good. Worth every penny.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Derek Walsh",
    role: "Apartment Resident",
  },
  {
    text: "They found a termite colony in my crawl space I had no idea about. The treatment was fast and the follow-up monitoring gives me real peace of mind.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Patricia Nguyen",
    role: "Homeowner, Dallas TX",
  },
  {
    text: "Mice were getting into my garage every winter. GuardPest sealed the entry points and set up a baiting program — haven't had one since last November.",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    name: "James Calloway",
    role: "Property Owner",
  },
  {
    text: "The technician explained every step and was respectful of my home. No harsh smells, no mess. My kids and pets were safe the same evening.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    name: "Maria Santos",
    role: "Parent & Homeowner",
  },
  {
    text: "As a property manager I've used several pest control companies. GuardPest is the only one I trust for consistent results across all my units.",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    name: "Tom Ellison",
    role: "Property Manager",
  },
  {
    text: "Bed bugs are a nightmare. GuardPest handled it professionally and discreetly. Two treatments and the problem was completely eliminated.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Sandra Kim",
    role: "Hotel Operations",
  },
  {
    text: "I run a restaurant and pest control is critical. GuardPest keeps us compliant and their quarterly visits have kept us inspection-ready every time.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Carlos Reyes",
    role: "Restaurant Owner",
  },
  {
    text: "Quick response, fair pricing, and it actually works. I recommended them to my whole neighborhood after they cleared out a wasp nest in my attic.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    name: "Linda Hoffman",
    role: "Homeowner, San Antonio TX",
  },
];

const firstColumn  = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn  = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <div className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-14"
      >
        <div className="flex justify-center">
          <div className="border border-white/20 text-white/60 text-xs uppercase tracking-widest py-1 px-4 rounded-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Testimonials
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mt-5 text-center">
          What our customers say
        </h2>
        <p className="text-center mt-4 text-white/50">
          Thousands of homeowners and businesses trust GuardPest to keep their spaces pest-free.
        </p>
      </motion.div>

      <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} accentColor="green" />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} accentColor="blue" />
        <TestimonialsColumn testimonials={thirdColumn}  className="hidden lg:block" duration={17} accentColor="orange" />
      </div>
    </div>
  );
}
