import React from "react";
import { motion } from "framer-motion";
import { useCollectibles } from "../hooks/useCollectibles.jsx";
import CollectibleCard from "../components/CollectibleCard";

export default function MyAssets() {
  const { purchasedCollectibles } = useCollectibles();

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
      {purchasedCollectibles.length === 0 ? (
        <div className="text-gray-500 text-center text-lg sm:text-xl">You have not purchased any collectibles yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {purchasedCollectibles.map((c, i) => (
            <CollectibleCard key={c.id + '-' + i} collectible={c} />
          ))}
        </div>
      )}
    </motion.section>
  );
} 