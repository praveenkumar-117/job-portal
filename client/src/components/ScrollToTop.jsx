import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Page scroll ke according scroll-to-top button ko show/hide karne ke liye
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // User ko page ke top par smoothly le jane ke liye
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 bg-green-400 hover:bg-green-500 text-black w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-xl font-bold transition"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
