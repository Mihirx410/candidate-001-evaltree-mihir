import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USER_ID = "demo-user-1";

export default function RaffleWidget({ triggerAward }) {
  const [tickets, setTickets] = useState(0);
  const [message, setMessage] = useState("");

  // Fetch ticket count
  useEffect(() => {
    fetch(`/api/raffle-status?userId=${USER_ID}`)
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets));
  }, []);

  // Automatically award ticket if triggerAward is true
  useEffect(() => {
    if (triggerAward) {
      handleAward();
    }
    // eslint-disable-next-line
  }, [triggerAward]);

  const handleAward = async () => {
    const res = await fetch("/api/raffle-award", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID }),
    });
    const data = await res.json();
    setTickets(data.tickets);
    setMessage(data.message);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 border border-[color:var(--primary-color)] flex flex-col items-center max-w-xs mx-auto mt-6">
      <div className="text-lg font-bold text-[color:var(--primary-color)] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
        Raffle Tickets
      </div>
      <div className="text-3xl font-extrabold text-[color:var(--accent-color)] mb-2">{tickets}</div>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-700 bg-green-50 border border-green-300 rounded px-2 py-1 text-sm mb-2"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 