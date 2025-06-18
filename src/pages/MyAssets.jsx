import React from "react";
import { motion } from "framer-motion";

export default function MyAssets() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] px-4"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-[color:var(--primary-color)]" style={{ fontFamily: "var(--font-headline)" }}>
        My Assets
      </h2>
      {/* User assets will go here */}
      <div className="text-gray-500 text-center text-lg sm:text-xl">Your assets will appear here after purchase or issuance.</div>
    </motion.section>
  );
} 