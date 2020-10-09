import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
  togglePlayer: () => void;
}
interface IPlaybackEventProps {
  type: string;
  nextTrack: any;
}

const MiniPlayer = ({
  skipNext,
  togglePlayback,
  togglePlayer,
}: IMiniPlayerProps) => {
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState('');
  const playbackState = usePlaybackState();
  let playPauseButton = require('../images/controls/play.png');
  if (playbackState === TrackPlayer.STATE_PLAYING) {
    playPauseButton = require('../images/controls/pause.png');
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
      <TouchableWithoutFeedback onPress={togglePlayer}>
        <View style={styles.artistArtworkContainer}>
          <View style={styles.commonStyleContainer}>
            <Image
              style={styles.tinyArtworkImage}
              source={{
                uri: trackArtwork,
              }}
            />
          </View>
          <View style={[styles.commonStyleContainer, styles.trackContainer]}>
            <Text>{trackTitle}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={[styles.commonStyleContainer, styles.controlContainer]}>
        <PlayerButton
          title={'play'}
          onPress={togglePlayback}
          imagePath={playPauseButton}
          imageStyle={styles.playPauseImage}
          buttonStyle={styles.playPauseButton}
        />
        <PlayerButton
          title={'>>'}
          onPress={skipNext}
          imagePath={require('../images/controls/next.png')}
          imageStyle={styles.nextImage}
        />
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
    flex: 1.2,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  artistArtworkContainer: { flex: 5, flexDirection: 'row' },

  playPauseButton: { width: 50, height: 50 },

  nextImage: { width: 50, height: 50 },
  playPauseImage: { width: 45, height: 45 },
  tinyArtworkImage: {
    width: 40,
    height: 40,
  },
});

export default MiniPlayer;
