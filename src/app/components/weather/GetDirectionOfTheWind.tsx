import { styled } from '@mui/material';
import React from 'react';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';

type WindProps = {
  windDirection: number;
};

const Img = styled("img")({
  margin: 0,
  display: "block",
});

export default function GetDirectionOfTheWind({ windDirection }: WindProps) {
  function GetDirection(direction: number) {
    if (direction === 0) return Icons.w0; //ветер ссевера
    if (direction > 0 && direction <= 10) return Icons.w10;
    if (direction > 10 && direction <= 20) return Icons.w20;
    if (direction > 20 && direction <= 30) return Icons.w30;
    if (direction > 30 && direction <= 40) return Icons.w40;
    if (direction > 40 && direction <= 50) return Icons.w50;
    if (direction > 50 && direction <= 60) return Icons.w60;
    if (direction > 60 && direction <= 70) return Icons.w70;
    if (direction > 70 && direction <= 80) return Icons.w80;
    if (direction > 80 && direction <= 90) return Icons.w90;
    if (direction > 90 && direction <= 100) return Icons.w100;
    if (direction > 90 && direction <= 100) return Icons.w100;
    if (direction > 100 && direction <= 110) return Icons.w110;
    if (direction > 110 && direction <= 120) return Icons.w120;
    if (direction > 120 && direction <= 130) return Icons.w130;
    if (direction > 130 && direction <= 140) return Icons.w140;
    if (direction > 140 && direction <= 150) return Icons.w150;
    if (direction > 150 && direction <= 160) return Icons.w160;
    if (direction > 160 && direction <= 170) return Icons.w170;
    if (direction > 170 && direction <= 180) return Icons.w180;
    if (direction > 180 && direction <= 190) return Icons.w190;
    if (direction > 190 && direction <= 200) return Icons.w200;
    if (direction > 200 && direction <= 210) return Icons.w210;
    if (direction > 210 && direction <= 220) return Icons.w220;
    if (direction > 220 && direction <= 230) return Icons.w230;
    if (direction > 230 && direction <= 240) return Icons.w240;
    if (direction > 240 && direction <= 250) return Icons.w250;
    if (direction > 250 && direction <= 260) return Icons.w260;
    if (direction > 260 && direction <= 270) return Icons.w270;
    if (direction > 270 && direction <= 280) return Icons.w280;
    if (direction > 280 && direction <= 290) return Icons.w290;
    if (direction > 290 && direction <= 300) return Icons.w300;
    if (direction > 300 && direction <= 310) return Icons.w310;
    if (direction > 310 && direction <= 320) return Icons.w320;
    if (direction > 320 && direction <= 330) return Icons.w330;
    if (direction > 330 && direction <= 340) return Icons.w340;
    if (direction > 340 && direction <= 350) return Icons.w350;
    if (direction > 350 && direction <= 360) return Icons.w0;
  }

  return (
    <Img
      alt="wind"
      width={15}
      src={GetDirection(windDirection) as IconsKey}
      // src={Icons.moon50 as IconsKey}
    />
  );
}
