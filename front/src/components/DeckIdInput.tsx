import Card from "@mui/material/Card/Card";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const IdInputTextfield = styled(TextField)({
  "&": {
    margin: 10,
  },
});

interface Iprops {
  submitCallback: (id: any) => void;
}

const DeckIdInput = (props: Iprops) => {
  const [deckID, setdeckID] = useState<number>();
  const onSubmit = (e: any) => {
    props.submitCallback(deckID);
  };

  return (
    <Card variant="outlined">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <IdInputTextfield
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Outlined"
          variant="outlined"
          onChange={(e) => setdeckID(Number(e.target.value))}
        />
      </form>
    </Card>
  );
};

export default DeckIdInput;
