import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollectibleCard from "../components/CollectibleCard";
import { useCollectibles } from "../hooks/useCollectibles.jsx";
import RaffleWidget from "../components/RaffleWidget";

const USER_ID = "demo-user-1";

export default function Marketplace() {
  const { collectibles, loading, addPurchasedCollectible } = useCollectibles();
  const [showRaffleAward, setShowRaffleAward] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState("");

  // Check for Stripe success param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setShowRaffleAward(true);
      handleEnroll();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleEnroll = async () => {
    if (enrolled) return;
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, platform: "Evaltree" }),
    });
    const data = await res.json();
    setEnrolled(true);
    setEnrollMsg(data.message);
    setTimeout(() => setEnrollMsg(""), 2500);
  };

  const handleSimulatedBuy = async (collectible) => {
    setShowRaffleAward(true);
    await handleEnroll();
    addPurchasedCollectible(collectible);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] px-4"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-[color:var(--primary-color)]" style={{ fontFamily: "var(--font-headline)" }}>
        Marketplace
      </h2>
      <AnimatePresence>
        {enrollMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 rounded-lg bg-green-50 border border-green-300 text-green-800 text-center shadow"
          >
            {enrollMsg}
          </motion.div>
        )}
      </AnimatePresence>
      {loading ? (
        <div className="text-gray-500 text-center text-lg sm:text-xl">Loading collectibles...</div>
      ) : collectibles.length === 0 ? (
        <div className="text-gray-500 text-center text-lg sm:text-xl">No collectibles available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {collectibles.map((c) => (
            <CollectibleCard key={c.id} collectible={c} onBuy={handleSimulatedBuy} />
          ))}
        </div>
      )}
      <RaffleWidget triggerAward={showRaffleAward} />
    </motion.section>
  );
} 