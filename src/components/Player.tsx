import React from 'react';
import { StyleSheet, View } from 'react-native';

import TrackPlayer, {
  // @ts-ignore
  usePlaybackState,
  // @ts-ignore
  useTrackPlayerProgress,
} from 'react-native-track-player';

import PlayerButton from './PlayerButton';

const PlayerProgressBar = (): JSX.Element => {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.playerProgressBarContainer}>
      <View style={{ flex: progress.position, backgroundColor: 'red' }} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: 'grey',
        }}
      />
    </View>
  );
};

interface IPlayerProps {
  seek: (seconds: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  togglePlayback: () => void;
}
const Player = (props: IPlayerProps) => {
  const playbackState = usePlaybackState();
  let playPauseButton = 'Play';
  if (playbackState === TrackPlayer.STATE_PLAYING) {
    playPauseButton = 'Pause';
  }
  const seekPrevious = () => {
    props.seek(-15);
  };
  const seekNext = () => {
    props.seek(15);
  };
  return (
    <View>
      <PlayerProgressBar />
      <View style={styles.playerControlContainer}>
        <PlayerButton title={'<<'} onPress={props.skipPrevious} />
        <PlayerButton title={'<'} onPress={seekPrevious} />
        <PlayerButton title={playPauseButton} onPress={props.togglePlayback} />
        <PlayerButton title={'>'} onPress={seekNext} />
        <PlayerButton title={'>>'} onPress={props.skipNext} />
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerControlContainer: {
    flexDirection: 'row',
  },
  playerProgressBarContainer: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
});
