import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import MiniPlayer from './components/MiniPlayer';
import Player from './components/Player';

import track from './data/playlist.json';

type AudioListState = {
  showPlayerModal: boolean;
};
type AudioListProps = {};

export default class AudioList extends React.Component<
  AudioListProps,
  AudioListState
> {
  constructor(props: AudioListState) {
    super(props);

    this.state = {
      showPlayerModal: false,
    };
  }

  public componentDidMount() {
    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
      console.log('TrackPlayer all setup');
    });

    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });

    TrackPlayer.add([...track]).then(() => {
      // The tracks were added
      console.log('TrackPlayer add()');
    });
  }

  private audioControl = async (index: number) => {
    const playbackState = await TrackPlayer.getState();
    await TrackPlayer.skip(track[index].id);
    if (
      playbackState === TrackPlayer.STATE_PAUSED ||
      playbackState === TrackPlayer.STATE_STOPPED ||
      playbackState === TrackPlayer.STATE_READY
    ) {
      await TrackPlayer.play();
      return;
    }
  };

  private renderAudioItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.audioControl(index)}>
        <View key={item.id} style={styles.audioItemContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.artwork,
            }}
          />
          <View style={styles.trackDetailContainer}>
            <Text>{item.title}</Text>
            <Text style={styles.artistText}>{item.artist}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  public render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.audioListContainer}>
          <FlatList
            data={track}
            renderItem={this.renderAudioItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.miniPlayerContainer}>
          <MiniPlayer
            togglePlayback={this.togglePlayback}
            togglePlayer={this.togglePlayerModal}
            skipNext={this.skipNext}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showPlayerModal}
          onRequestClose={this.togglePlayerModal}
          style={styles.mainModalContainer}>
          <View
            onTouchEnd={this.togglePlayerModal}
            style={[
              styles.transparentBackgroundContainer,
              styles.transparentContainer,
            ]}
          />
          <View
            style={[
              styles.transparentBackgroundContainer,
              styles.flexOneOnlyContainer,
            ]}>
            <View
              onTouchMove={this.togglePlayerModal}
              style={styles.playerTopSectionContainer}>
              <View style={styles.greyBarContainer} />
            </View>
          </View>
          <View style={styles.mainPlayerContainer}>
            <View style={styles.flexOneOnlyContainer}>
              <Player
                seek={this.seek}
                skipNext={this.skipNext}
                skipPrevious={this.skipPrevious}
                togglePlayback={this.togglePlayback}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  private togglePlayerModal = () => {
    this.setState({ showPlayerModal: !this.state.showPlayerModal });
  };
  private skipPrevious = async (): Promise<void> => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  };
  private skipNext = async (): Promise<void> => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  };
  private seek = (seconds: number = 15): void => {
    TrackPlayer.getPosition().then(async (positionInSeconds) => {
      await TrackPlayer.seekTo(positionInSeconds + seconds);
    });
  };
  private togglePlayback = async (): Promise<void> => {
    const playbackState = await TrackPlayer.getState();
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
      return;
    }
    await TrackPlayer.play();
  };
}

const styles = StyleSheet.create({
  /* containers */
  audioItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 2,
    marginLeft: 10,
  },
  audioListContainer: { flex: 1, height: '100%' },
  flexOneOnlyContainer: { flex: 1 },
  greyBarContainer: {
    backgroundColor: 'lightgrey',
    width: 40,
    height: 5,
    borderRadius: 2.5,
  },
  mainModalContainer: { flex: 1 },
  mainPlayerContainer: {
    flex: 24,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  miniPlayerContainer: {
    height: 54,
  },
  playerTopSectionContainer: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackDetailContainer: {
    flex: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,

    marginLeft: 20,
  },
  viewContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  transparentBackgroundContainer: { backgroundColor: 'rgba(52, 52, 52, 0.5)' },
  transparentContainer: { flex: 2 },

  /* text */
  artistText: { color: 'grey', fontSize: 12 },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
