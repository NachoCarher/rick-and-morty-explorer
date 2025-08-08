import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Favorites from "./components/Favorites.jsx";
import { CharacterProvider } from "./contexts/CharacterContext.jsx";
import CharacterDetails from "./components/CharacterDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CharacterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<h2>Nothing to explore here</h2>} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </BrowserRouter>
    </CharacterProvider>
  </React.StrictMode>
);
