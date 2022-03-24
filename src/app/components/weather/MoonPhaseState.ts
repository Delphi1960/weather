import { toNumber } from 'lodash';

export default function MoonPhaseState(moonPhase: string) {
  function moonState(phase: number) {
    if (phase > 0 && phase < 25) return "растущий серп";
    if (phase === 25) return "первая четверть";
    if (phase > 25 && phase < 50) return "растущая Луна";
    if (phase === 50) return "полнолунье";
    if (phase > 50 && phase < 75) return "убывающая Луна";
    if (phase > 50 && phase < 75) return "убывающая Луна";
    if (phase === 75) return "последняя четверть";
    if (phase > 75 && phase < 100) return "убывающий серп";
  }

  return moonState(toNumber(toNumber(moonPhase).toFixed()));
}
