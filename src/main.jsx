import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { StoreProvider } from "./context/StoreContext";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/puppies.css";
import "./styles/puppy-details.css";
import "./styles/cart.css";
import "./styles/checkout.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </LanguageProvider>
  </React.StrictMode>
);
