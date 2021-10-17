import React, { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField/TextField";
import DeckIdInput from "./components/DeckIdInput";
import { getDeckList } from "./Api/RingsDbApi";
import { IDeck } from "./Api/RingsDbTypes";

function App() {
  const [deck, setdeck] = useState<IDeck>();

  return (
    <div className="App">
      <header className="App-header">
        <h1>RingsDB Deck Finder</h1>
        <DeckIdInput deckCallback={(deck: IDeck) => setdeck(deck)} />
      </header>
    </div>
  );
}

export default App;
