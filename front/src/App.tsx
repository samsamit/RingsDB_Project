import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField/TextField";
import DeckIdInput from "./components/DeckIdInput";
import { getDeckList } from "./Api/RingsDbApi";

function App() {
  const [deckId, setdeckId] = useState<number>();
  const deckSelect = (deckId: number) => {
    console.log(deckId);
    setdeckId(deckId);
  };

  useEffect(() => {
    deckId &&
      getDeckList(deckId)
        .then((res) => console.log(res.data))
        .catch((e) => console.error(e));
  }, [deckId]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>RingsDB Deck Finder</h1>
        <DeckIdInput submitCallback={deckSelect} />
      </header>
    </div>
  );
}

export default App;
