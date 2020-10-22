// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { useTrackPlayerProgress } from 'react-native-track-player';

const TIME_TO_SAVE_PROGRESS = 5;

const Progress = (): JSX.Element | null => {
  const progress = useTrackPlayerProgress();
  if (
    progress.position &&
    Math.round(progress.position) % TIME_TO_SAVE_PROGRESS === 0
  ) {
    AsyncStorage.setItem('lastTrackPosition', `${progress.position}`).then(() =>
      console.log('set item at progress.position', progress.position),
    );
  }
  return null;
};

export default Progress;
