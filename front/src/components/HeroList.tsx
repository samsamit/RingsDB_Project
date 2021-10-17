import { Card, CardMedia } from "@mui/material";
import { RingsDBUrl } from "../Api/RingsDbApi";
import { IHero } from "../reducer/RingsDbTypes";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import CardMissing from "../media/CardNotFound.jpg";
interface IProps {
  heros: IHero[];
  heroClickCallback: (hero: IHero) => void;
}

const HeroCard = styled(Card)({
  "&": {
    border: "2px solid black",
    margin: "10px",
    borderRadius: 20,
  },
  "&:hover": {
    border: "2px solid #00a152",
    boxShadow: "0px 0px 10px #00a152",
  },
});

const useStyles = makeStyles({
  container: {
    margin: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
  },
  titleContaier: {
    width: "100vw",
    textAlign: "left",
    marginTop: 10,
  },
});

const HeroList = (props: IProps) => {
  const classes = useStyles();
  const { heros } = props;
  return (
    <>
      <div className={classes.titleContaier}>
        <h4 style={{ margin: "0 0 0 20px" }}>
          I present thee, The great heroes!
        </h4>
      </div>
      <div className={classes.container}>
        {heros.map((hero, key) => (
          <HeroCard
            key={key}
            onClick={() => !hero.error && props.heroClickCallback(hero)}
          >
            {hero.error ? (
              <CardMedia component="img" image={CardMissing} alt={hero.name} />
            ) : (
              <CardMedia
                component="img"
                image={RingsDBUrl + hero.image}
                alt={hero.name}
              />
            )}
          </HeroCard>
        ))}
      </div>
    </>
  );
};

export default HeroList;
