import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, {
  // @ts-ignore
  usePlaybackState,
  // @ts-ignore
  useTrackPlayerEvents,
} from 'react-native-track-player';

import PlayerButton from './PlayerButton';

interface IMiniPlayerProps {
  skipNext: () => void;
  togglePlayback: () => void;
}
interface IPlaybackEventProps {
  type: string;
  nextTrack: any;
}

const MiniPlayer = ({ skipNext, togglePlayback }: IMiniPlayerProps) => {
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState('');
  const playbackState = usePlaybackState();
  let playPauseButton = 'Play';
  if (playbackState === TrackPlayer.STATE_PLAYING) {
    playPauseButton = 'Pause';
  }
  useTrackPlayerEvents(
    ['playback-track-changed'],
    async (event: IPlaybackEventProps) => {
      // @ts-ignore
      if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { title, artwork } = track || {};
        setTrackArtwork(artwork);
        setTrackTitle(title);
      }
    },
  );
  return (
    <View style={styles.miniPlayerContainer}>
      <View style={styles.commonStyleContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: trackArtwork,
          }}
        />
      </View>
      <View style={[styles.commonStyleContainer, styles.trackContainer]}>
        <Text>{trackTitle}</Text>
      </View>
      <View style={[styles.commonStyleContainer, styles.controlContainer]}>
        <PlayerButton title={playPauseButton} onPress={togglePlayback} />
        <PlayerButton title={'>>'} onPress={skipNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniPlayerContainer: {
    backgroundColor: '#ededed',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },
  trackContainer: { flex: 4 },
  commonStyleContainer: { flex: 1, justifyContent: 'center' },
  controlContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});

export default MiniPlayer;
