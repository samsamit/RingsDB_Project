import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import DeckIdInput from "./components/DeckIdInput";
import { getDeckList, getHero } from "./Api/RingsDbApi";
import HeroList from "./components/HeroList";
import { deckReducer, DeckReducerInitial } from "./reducer/store";

function App() {
  const [state, dispatch] = useReducer(deckReducer, DeckReducerInitial);
  const [deckId, setdeckId] = useState<number>();
  const [inputError, setinputError] = useState<string | undefined>(undefined);

  // Get the deck
  useEffect(() => {
    console.log("deckID");
    deckId &&
      getDeckList(deckId)
        .then((res) => {
          // If error in ringsDb occurred
          if (res.data.error) {
            console.error(res.data.error);
            setinputError(res.data.error);
          } else {
            console.log(res.data);
            dispatch({ type: "NEW_DECK", payload: res.data });
          }
        })
        .catch((e) => console.error(e));
  }, [deckId]);

  // Get heros from deck
  useEffect(() => {
    console.log("herocodes");
    state.deck &&
      state.deck.heroCodes.forEach((code) => {
        getHero(code)
          .then((res) => {
            dispatch({ type: "ADD_HERO", payload: res.data });
          })
          .catch((err) => {
            console.error(err);
            let errorHero = { error: "No Access to hero", code: code };
            dispatch({ type: "ADD_HERO", payload: errorHero });
          });
      });
  }, [state.deck?.heroCodes]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RingsDB Deck Finder</h1>
        <DeckIdInput
          deckIdCallback={(deckidOut: number) => setdeckId(deckidOut)}
          error={inputError}
        />
        {state.heros && <HeroList heros={state.heros} />}
      </header>
    </div>
  );
}

export default App;
