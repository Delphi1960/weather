import { toNumber } from 'lodash';

export default function MoonPhaseState(moonPhase: string) {
  function moonState(phase: number) {
    if (phase > 0 && phase < 25) return "растущая";
    if (phase === 25) return "первая четверть";
    if (phase > 25 && phase < 50) return "растущая";
    if (phase === 50) return "полнолунье";
    if (phase > 50 && phase < 75) return "убывающая";
    if (phase > 50 && phase < 75) return "убывающая ";
    if (phase === 75) return "последняя четверть";
    if (phase > 75 && phase < 100) return "убывающая";
    if (phase === 100) return "новолунье";
  }

  return moonState(toNumber(toNumber(moonPhase).toFixed()));
}
