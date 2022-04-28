import { styled } from '@mui/material'
import React from 'react'

import { IconsKey } from '../../types/icon.type'
import GetIconWindDirection from '../weather/GetIconWindDirection'

type WindProps = {
  windDirection: number;
};

const Img = styled("img")({
  margin: 0,
  display: "block",
});

export default function GetDirectionOfTheWind({ windDirection }: WindProps) {
  return (
    <Img
      alt="wind"
      width={16}
      height={15}
      src={GetIconWindDirection(windDirection) as IconsKey}
      // src={Icons.moon50 as IconsKey}
    />
  );
}
