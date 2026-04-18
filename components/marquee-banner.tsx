"use client";

import { motion } from "motion/react";

const items = [
  "Welcome to our store",
  "We are Open from 8am - 5pm! ⌚",
  "No refunds unless we don't deliver",
  "⚠️ No changes allowed after placing your order",
  "Feedback / Complaints are only valid within 4 hours after receiving your order",
];

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-banner py-2">
      <motion.div
        className="flex w-max items-center gap-10 px-4 text-center text-caps font-light"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={index} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
