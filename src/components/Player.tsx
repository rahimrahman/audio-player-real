import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import TrackPlayer, {
  getCurrentTrack,
  getTrack,
  Track,
  // @ts-ignore
  usePlaybackState,
  // @ts-ignore
  useTrackPlayerEvents,
} from 'react-native-track-player';

import PlayerArtwork from './PlayerArtwork';
import PlayerButton from './PlayerButton';
import PlayerProgressBar from './PlayerProgressBar';

interface IPlayerProps {
  seek: (seconds: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  togglePlayback: () => void;
}
interface IPlaybackEventProps {
  type: string;
  nextTrack: any;
}
const Player = (props: IPlayerProps) => {
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');

  useEffect(() => {
    const fetchTheTrack = async () => {
      const track = await getTheTrack();
      setTrackArtwork(track.artwork);
      setTrackTitle(track.title);
      setTrackArtist(track.artist);
    };
    fetchTheTrack();
  }, []);

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
        const { title, artist, artwork } = track || {};
        setTrackArtwork(artwork);
        setTrackArtist(artist);
        setTrackTitle(title);
      }
    },
  );

  const seekPrevious = () => {
    props.seek(-30);
  };
  const seekNext = () => {
    props.seek(30);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.artworkContainer}>
        <PlayerArtwork artwork={trackArtwork} />
      </View>
      <View style={styles.trackControlContainer}>
        <Text style={styles.titleText}>{trackTitle}</Text>
        <Text style={styles.artistText}> {trackArtist}</Text>
        <PlayerProgressBar />
        <View style={styles.playerControlContainer}>
          <PlayerButton title={'<<'} onPress={props.skipPrevious} />
          <PlayerButton title={'<'} onPress={seekPrevious} />
          <PlayerButton
            title={playPauseButton}
            onPress={props.togglePlayback}
          />
          <PlayerButton title={'>'} onPress={seekNext} />
          <PlayerButton title={'>>'} onPress={props.skipNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getTheTrack = async (): Promise<Track> => {
  const id = await getCurrentTrack();
  return getTrack(id);
};

export default Player;

const styles = StyleSheet.create({
  /* containers */
  artworkContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: { flex: 1, height: '100%', marginHorizontal: 30 },
  playerControlContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  trackControlContainer: {
    flex: 1,
    height: '100%',
  },

  /* text */
  artistText: {
    fontSize: 18,
    color: '#ff0040',
    fontFamily: 'System',
    fontWeight: '300',
  },
  titleText: { fontSize: 22, fontWeight: '500' },
});
