import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PodcastProvider } from "./context/PodcastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PodcastProvider>
        <App />
      </PodcastProvider>
    </BrowserRouter>
  </StrictMode>,
);
