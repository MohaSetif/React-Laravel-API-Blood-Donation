import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import router from "./router.jsx";

// Import index.css for the home page only
if (window.location.pathname === "/") {
  import("./index2.css");
}

// Import index2.css for /admin and /doctor pages
if (window.location.pathname.startsWith("/admin") || 
window.location.pathname.startsWith("/doctor") || 
window.location.pathname.startsWith("/donate") || 
window.location.pathname.startsWith("/profile") || 
window.location.pathname.startsWith("/signup") || 
window.location.pathname.startsWith("/login")) {
  import("./index.css");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
