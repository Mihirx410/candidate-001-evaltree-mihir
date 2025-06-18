import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectibles } from "../hooks/useCollectibles.jsx";

export default function CollectibleIssuanceForm() {
  const [form, setForm] = useState({ name: "", description: "", cap: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { addCollectible } = useCollectibles();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage("");
    try {
      const res = await fetch("/api/createCollectible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage(data.message);
        setForm({ name: "", description: "", cap: "" });
        addCollectible(data.data);
      } else {
        setSuccess(false);
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setSuccess(false);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-4 rounded-lg border text-center shadow ${success ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-[color:var(--primary-color)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <label className="text-left font-semibold text-gray-800">Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)]"
            placeholder="e.g. Golden Owl"
          />
        </label>
        <label className="text-left font-semibold text-gray-800">Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)] resize-none"
            placeholder="Describe your collectible..."
            rows={3}
          />
        </label>
        <label className="text-left font-semibold text-gray-800">Edition Cap
          <input
            type="number"
            name="cap"
            value={form.cap}
            onChange={handleChange}
            required
            min={1}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)]"
            placeholder="e.g. 50"
          />
        </label>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="mt-2 bg-[color:var(--primary-color)] text-white font-bold py-2 rounded-lg shadow hover:bg-[color:var(--accent-color)] hover:text-[color:var(--primary-color)] transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)] disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Collectible"}
        </motion.button>
      </form>
    </div>
  );
} 