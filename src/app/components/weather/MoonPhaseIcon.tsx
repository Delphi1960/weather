import { styled } from '@mui/material/styles';
import { toNumber } from 'lodash';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';

type phaseProps = { moonPhase: string; sizeIcon: number };

const Img = styled("img")({
  margin: 0,
  display: "block",
  // maxWidth: "100%",
  // maxHeight: "100%",
});

export default function MoonPhaseIcon({ moonPhase, sizeIcon }: phaseProps) {
  function GetMoonPhaseIcon(moonPhase: string) {
    const phase: number = toNumber(toNumber(moonPhase).toFixed(0));

    if (phase > 1 && phase <= 4) return Icons.moon4;
    if (phase > 4 && phase <= 8) return Icons.moon8;
    if (phase > 8 && phase <= 12) return Icons.moon12;
    if (phase > 12 && phase <= 16) return Icons.moon16;
    if (phase > 16 && phase <= 23) return Icons.moon20;

    if (phase > 23 && phase <= 25) return Icons.moon25; //первая четверть

    if (phase > 25 && phase <= 29) return Icons.moon29;
    if (phase > 29 && phase <= 33) return Icons.moon33;
    if (phase > 33 && phase <= 37) return Icons.moon37;
    if (phase > 37 && phase <= 41) return Icons.moon37;
    if (phase > 41 && phase <= 48) return Icons.moon45;

    if (phase > 48 && phase <= 50) return Icons.moon50; //полнолуние

    if (phase > 50 && phase <= 54) return Icons.moon54;
    if (phase > 54 && phase <= 58) return Icons.moon58;
    if (phase > 58 && phase <= 62) return Icons.moon62;
    if (phase > 62 && phase <= 66) return Icons.moon66;
    if (phase > 66 && phase <= 72) return Icons.moon70;

    if (phase > 72 && phase <= 75) return Icons.moon75; //последняя четверть

    if (phase > 75 && phase <= 79) return Icons.moon79;
    if (phase > 79 && phase <= 83) return Icons.moon83;
    if (phase > 83 && phase <= 87) return Icons.moon87;
    if (phase > 87 && phase <= 91) return Icons.moon91;
    if (phase > 91 && phase <= 98) return Icons.moon95;
    if ((phase > 0 && phase <= 1) || (phase > 98 && phase <= 100))
      return Icons.moon0; //новолунье
  }

  return (
    <Img
      alt="moonphase"
      width={sizeIcon}
      src={GetMoonPhaseIcon(moonPhase) as IconsKey}
      // src={Icons.moon50 as IconsKey}
    />
  );
}
