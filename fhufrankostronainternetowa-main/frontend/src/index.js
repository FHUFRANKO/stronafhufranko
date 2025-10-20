import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Function to remove Emergent badge
const removeEmergentBadge = () => {
  const removeElements = () => {
    // Remove by ID
    const emergentBadge = document.getElementById('emergent-badge');
    if (emergentBadge) {
      emergentBadge.remove();
    }
    
    // Remove by href containing emergent
    document.querySelectorAll('a[href*="emergent.sh"]').forEach(el => el.remove());
    
    // Remove any elements with "Made with Emergent" text
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent && el.textContent.includes('Made with Emergent')) {
        el.remove();
      }
    });
    
    // Remove fixed positioned elements in bottom right corner that look like badges
    document.querySelectorAll('div').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' && 
          style.bottom && style.bottom !== 'auto' &&
          style.right && style.right !== 'auto' &&
          el.textContent && el.textContent.includes('Emergent')) {
        el.remove();
      }
    });
  };

  // Remove immediately
  removeElements();
  
  // Remove after DOM loads
  document.addEventListener('DOMContentLoaded', removeElements);
  
  // Remove periodically in case badge is added dynamically
  setInterval(removeElements, 1000);
  
  // Use MutationObserver to catch dynamically added elements
  const observer = new MutationObserver(removeElements);
  observer.observe(document.body, { childList: true, subtree: true });
};

// Start badge removal
removeEmergentBadge();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
