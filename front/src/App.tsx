import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import DeckIdInput from "./components/DeckIdInput";
import { getDeckList, getHero } from "./Api/RingsDbApi";
import HeroList from "./components/HeroList";
import { deckReducer, DeckReducerInitial } from "./reducer/store";
import CardInfoModal from "./components/CardInfoModal";
import { IHero } from "./reducer/RingsDbTypes";

function App() {
  const [state, dispatch] = useReducer(deckReducer, DeckReducerInitial);
  // for storing selected deck id
  const [deckId, setdeckId] = useState<number>();
  // for input error ( if the get req wont find deck)
  const [inputError, setinputError] = useState<string | undefined>(undefined);
  // for modal to show selected hero
  const [selHero, setselHero] = useState<IHero | undefined>(undefined);

  // Get the deck
  useEffect(() => {
    dispatch({ type: "CLEAR", payload: {} });
    deckId &&
      getDeckList(deckId)
        .then((res) => {
          // If error in ringsDb occurred
          if (res.data.error) {
            console.error(res.data.error);
          } else {
            dispatch({ type: "NEW_DECK", payload: res.data });
          }
        })
        .catch((e) => {
          setinputError("Deck not found...");
        });
  }, [deckId]);

  // Get heros from deck
  useEffect(() => {
    state.deck &&
      state.deck.heroCodes.forEach((code) => {
        getHero(code)
          .then((res) => {
            dispatch({ type: "ADD_HERO", payload: res.data });
          })
          .catch((err) => {
            let errorHero = { error: "No Access to hero", code: code };
            dispatch({ type: "ADD_HERO", payload: errorHero });
            console.error("ERROR");
          });
      });
  }, [state.deck, state.deck?.heroCodes]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RingsDB Deck Finder</h1>
        <DeckIdInput
          deckIdCallback={(deckidOut: number) => setdeckId(deckidOut)}
          error={inputError}
          clearError={() => setinputError("")}
        />
        {state.heros && (
          <HeroList
            heros={state.heros}
            heroClickCallback={(hero) => setselHero(hero)}
          />
        )}
        {selHero && (
          <CardInfoModal
            hero={selHero}
            modalCloseCallback={() => setselHero(undefined)}
          />
        )}
      </header>
    </div>
  );
}

export default App;
