import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import MyAssets from "./pages/MyAssets";
import IssueCollectible from "./pages/IssueCollectible";
import { CollectiblesProvider } from "./hooks/useCollectibles.jsx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "var(--font-headline)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Placeholder for Logo */}
          <img src="/react.svg" alt="Evaltree Logo" className="h-8 w-8" />
          <span className="text-xl sm:text-2xl font-bold text-[color:var(--primary-color)]">Evaltree</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-lg">
          <Link to="/" className="hover:text-[color:var(--accent-color)] transition-colors">Home</Link>
          <Link to="/marketplace" className="hover:text-[color:var(--accent-color)] transition-colors">Marketplace</Link>
          <Link to="/my-assets" className="hover:text-[color:var(--accent-color)] transition-colors">My Assets</Link>
          <Link to="/issue" className="hover:text-[color:var(--accent-color)] transition-colors">Issue Collectible</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pb-4 border-t border-gray-200"
        >
          <div className="flex flex-col gap-4 pt-4">
            <Link to="/" className="hover:text-[color:var(--accent-color)] transition-colors px-4" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/marketplace" className="hover:text-[color:var(--accent-color)] transition-colors px-4" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
            <Link to="/my-assets" className="hover:text-[color:var(--accent-color)] transition-colors px-4" onClick={() => setIsMenuOpen(false)}>My Assets</Link>
            <Link to="/issue" className="hover:text-[color:var(--accent-color)] transition-colors px-4" onClick={() => setIsMenuOpen(false)}>Issue Collectible</Link>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--neutral-color-light)] text-center py-4 mt-12 shadow-inner" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-gray-500">© {new Date().getFullYear()} Evaltree By Mihir Dodiya All rights reserved.</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <CollectiblesProvider>
      <Router>
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[color:var(--neutral-color)] via-[color:var(--neutral-color-light)] to-[color:var(--neutral-color)]">
          <Header />
          <motion.main className="flex-1 flex flex-col items-center justify-center w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/my-assets" element={<MyAssets />} />
                <Route path="/issue" element={<IssueCollectible />} />
              </Routes>
            </div>
          </motion.main>
          <Footer />
        </div>
      </Router>
    </CollectiblesProvider>
  );
}

export default App;
