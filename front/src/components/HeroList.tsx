import { Card, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getHero, RingsDBUrl } from "../Api/RingsDbApi";
import { IHero } from "../reducer/RingsDbTypes";

import DeleteIcon from "@mui/icons-material/Delete";
interface IProps {
  heros: IHero[];
}

const HeroList = (props: IProps) => {
  const { heros } = props;
  console.log(heros[0]);
  return (
    <>
      {heros.map((hero, key) =>
        hero.error ? (
          <Card>
            <svg data-testid="DeleteIcon"></svg>
          </Card>
        ) : (
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={RingsDBUrl + hero.image}
              alt={hero.name}
            />
          </Card>
        )
      )}
    </>
  );
};

export default HeroList;
