export const formatSecondsToHHMMSS = (seconds: number): string => {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds - h * 3600) / 60);
  let s = Math.trunc(seconds - h * 3600 - m * 60);
  let hoursDisplay: string = h.toString(10);
  let minutesDisplay = m.toString(10);
  let secondsDisplay: string = s.toString(10);

  if (h < 10) {
    hoursDisplay = '0' + h;
  }
  if (m < 10) {
    minutesDisplay = '0' + m;
  }
  if (s < 10) {
    secondsDisplay = '0' + s;
  }
  let display = minutesDisplay + ':' + secondsDisplay;
  if (h > 0) {
    display = hoursDisplay + ':' + minutesDisplay + ':' + secondsDisplay;
  }
  return display;
};
