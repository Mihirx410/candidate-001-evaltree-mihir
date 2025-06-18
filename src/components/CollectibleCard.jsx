import React, { useState } from "react";

export default function CollectibleCard({ collectible, onBuy }) {
  const [purchased, setPurchased] = useState(false);

  const handleBuyNow = () => {
    setPurchased(true);
    if (onBuy) onBuy(collectible);
    setTimeout(() => setPurchased(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-[color:var(--primary-color)] w-full max-w-xs mx-auto min-h-[270px]">
      <h3 className="text-xl font-bold text-[color:var(--primary-color)]" style={{ fontFamily: 'var(--font-headline)' }}>{collectible.name}</h3>
      <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>{collectible.description}</p>
      <div className="text-sm text-gray-500 mb-2">Only {collectible.cap} available &middot; {collectible.available} left</div>
      <div style={{ minHeight: 32 }}>
        {purchased && (
          <div className="text-green-800 bg-green-100 border border-green-300 rounded px-2 py-1 text-sm text-center transition-all duration-200">
            Simulated purchase successful!
          </div>
        )}
      </div>
      <button
        className="mt-auto bg-[color:var(--accent-color)] text-[color:var(--primary-color)] font-bold py-2 rounded-lg shadow hover:bg-[color:var(--primary-color)] hover:text-[color:var(--accent-color)] transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)]"
        onClick={handleBuyNow}
        disabled={collectible.available === 0 || purchased}
      >
        {collectible.available === 0 ? "Sold Out" : purchased ? "Purchased" : "Buy Now (€1)"}
      </button>
    </div>
  );
} 