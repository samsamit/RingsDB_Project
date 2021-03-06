import Card from "@mui/material/Card/Card";
import TextField from "@mui/material/TextField/TextField";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

const IdInputTextfield = styled(TextField)({
  "&": {
    margin: 10,
    maxWidth: 400,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const useStyles = makeStyles({
  container: {
    backgroundColor: "#00a152",
  },
});

interface Iprops {
  deckIdCallback: (deck: number) => void;
  clearError: () => void;
  error?: string;
}

const DeckIdInput = (props: Iprops) => {
  const classes = useStyles();
  // state holds the input value
  const [deckId, setdeckId] = useState<number>();
  // When input field is submitted make the api call and decode its contents and send the IDeck object to the callback
  const onSubmit = () => {
    deckId && props.deckIdCallback(deckId);
  };

  return (
    <Card variant="outlined" className={classes.container}>
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
            props.clearError();
            setdeckId(Number(e.target.value));
          }}
          helperText={
            props.error
              ? props.error
              : "Give me a deck id and ill fetch the heroes for you."
          }
        />
      </form>
    </Card>
  );
};

export default DeckIdInput;
