import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { IHero } from "../reducer/RingsDbTypes";
import { Card, CardMedia, IconButton } from "@mui/material";
import { RingsDBUrl } from "../Api/RingsDbApi";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "90vw",
    backgroundColor: "white",
  },
  cardInfoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "0 20px 20px",
  },
  heroInfoContainer: {
    width: "100%",
    margin: "0 10px 10px",
  },
  heroInfoRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    color: "black",
  },
  flavorText: {
    borderRadius: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

interface IProps {
  hero: IHero;
  modalCloseCallback: () => void;
}

const CardInfoModal = (props: IProps) => {
  const classes = useStyles();
  const { hero } = props;

  // HandleModal toggle
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.modalCloseCallback();
  };

  // Array for not showing some keys
  const infoToNotShow = ["error", "code", "image", "text", "flavor"];

  // If hero is upddated re-render
  useEffect(() => {
    props.hero && handleOpen();
  }, [props.hero]);

  // Parse <cite> tags from hero flavor text
  const parseCite = (flavor: string): string => {
    let newFlavor = flavor.replace("<cite>", "-");
    newFlavor = newFlavor.replace("</cite>", "-");
    return newFlavor;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card className={classes.container}>
        <Typography variant="h3" style={{ color: "black", margin: 10 }}>
          {hero.name}
        </Typography>
        <div className={classes.cardInfoContainer}>
          <CardMedia
            style={{ width: "40%", borderRadius: 20 }}
            component="img"
            image={RingsDBUrl + hero.image}
            alt="Live from space album cover"
          />
          <div className={classes.heroInfoContainer}>
            <Typography variant="h6">Hero info</Typography>
            {Object.keys(hero).map((key: string) => {
              if (!infoToNotShow.includes(key)) {
                return (
                  <div className={classes.heroInfoRow}>
                    <div style={{ width: "50%" }}>{key}</div>
                    <div>{hero[key as keyof IHero]}</div>
                  </div>
                );
              }
              return <></>;
            })}

            <div className={classes.flavorText}>
              <blockquote>{hero.flavor && parseCite(hero.flavor)}</blockquote>
            </div>
          </div>
        </div>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Card>
    </Modal>
  );
};

export default CardInfoModal;
