import React from "react";
import { motion } from "framer-motion";
import CollectibleIssuanceForm from "../components/CollectibleIssuanceForm";

export default function IssueCollectible() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] px-4 flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-[color:var(--primary-color)]" style={{ fontFamily: "var(--font-headline)" }}>
        Issue a New Collectible
      </h2>
      <CollectibleIssuanceForm />
    </motion.section>
  );
} 