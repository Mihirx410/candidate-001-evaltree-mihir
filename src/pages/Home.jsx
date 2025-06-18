import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 max-w-2xl w-full text-center border border-[color:var(--primary-color)]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[color:var(--primary-color)]" style={{ fontFamily: "var(--font-headline)" }}>
          Welcome to Evaltree
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-2 sm:mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Discover, issue, and collect limited-edition digital collectibles.
        </p>
        <p className="text-sm sm:text-md lg:text-lg text-[color:var(--accent-color)] font-medium" style={{ fontFamily: "var(--font-body)" }}>
          Upscale. Exclusive. Artistic.
        </p>
      </div>
    </motion.section>
  );
} 