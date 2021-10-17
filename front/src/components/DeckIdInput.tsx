import Card from "@mui/material/Card/Card";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const IdInputTextfield = styled(TextField)({
  "&": {
    margin: 10,
    maxWidth: 300,
  },
});

interface Iprops {
  deckIdCallback: (deck: number) => void;
  error?: string;
}

const DeckIdInput = (props: Iprops) => {
  // state holds the input value
  const [deckId, setdeckId] = useState<number>();
  // state holds possible error messages to be displayed below input
  const [error, seterror] = useState<string | undefined>(undefined);
  // When input field is submitted make the api call and decode its contents and send the IDeck object to the callback
  const onSubmit = () => {
    deckId && props.deckIdCallback(deckId);
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
          error={props.error ? true : false}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Deck ID"
          variant="outlined"
          onChange={(e) => {
            setdeckId(Number(e.target.value));
            seterror(undefined);
          }}
          helperText={props.error}
        />
      </form>
    </Card>
  );
};

export default DeckIdInput;
