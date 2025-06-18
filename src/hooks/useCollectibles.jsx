import React, { createContext, useContext, useEffect, useState } from "react";

const CollectiblesContext = createContext();

export function CollectiblesProvider({ children }) {
  const [collectibles, setCollectibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedCollectibles, setPurchasedCollectibles] = useState([]);

  useEffect(() => {
    fetch("/api/collectibles")
      .then((res) => res.json())
      .then((data) => {
        setCollectibles(data);
        setLoading(false);
      });
  }, []);

  const addCollectible = (collectible) => {
    setCollectibles((prev) => [
      { ...collectible, id: Math.floor(Math.random() * 100000), available: collectible.cap },
      ...prev,
    ]);
  };

  const addPurchasedCollectible = (collectible) => {
    setPurchasedCollectibles((prev) => [collectible, ...prev]);
  };

  return (
    <CollectiblesContext.Provider value={{ collectibles, addCollectible, loading, purchasedCollectibles, addPurchasedCollectible }}>
      {children}
    </CollectiblesContext.Provider>
  );
}

export function useCollectibles() {
  return useContext(CollectiblesContext);
} 