import Card from "@mui/material/Card/Card";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { getDeckList } from "../Api/RingsDbApi";
import { decodeDeckResponse, IDeck } from "../Api/RingsDbTypes";

const IdInputTextfield = styled(TextField)({
  "&": {
    margin: 10,
    maxWidth: 300,
  },
});

interface Iprops {
  deckCallback: (deck: IDeck) => void;
}

const DeckIdInput = (props: Iprops) => {
  // state holds the input value
  const [deckId, setdeckId] = useState<number>();
  // state holds possible error messages to be displayed below input
  const [error, seterror] = useState<string | undefined>(undefined);
  // When input field is submitted make the api call and decode its contents and send the IDeck object to the callback
  const onSubmit = () => {
    deckId &&
      getDeckList(deckId)
        .then((res) => {
          // If error in ringsDb occurred
          if (res.data.error) {
            console.error(res.data.error);
            seterror(res.data.error);
          } else {
            let deck = decodeDeckResponse(res.data);
            props.deckCallback(deck);
          }
        })
        .catch((e) => console.error(e));
  };

  return (
    <Card variant="outlined">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <IdInputTextfield
          error={error ? true : false}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Deck ID"
          variant="outlined"
          onChange={(e) => {
            setdeckId(Number(e.target.value));
            seterror(undefined);
          }}
          helperText={error}
        />
      </form>
    </Card>
  );
};

export default DeckIdInput;
