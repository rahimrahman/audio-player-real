import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

// import Player from './components/Player';
import MiniPlayer from './components/MiniPlayer';

// const track = [
//   {
//     id: '1', // Must be a string, required
//
//     url:
//       'https://designband.com/wp-content/uploads/2012/10/All-About-That-Bass-D.mp3', // Load media from the network
//
//     title: 'All About That Bass',
//     artist: 'Meghan Traynor',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2014-05-20T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is3-ssl.mzstatic.com/image/thumb/Features124/v4/84/cc/c4/84ccc473-77cd-e056-a73b-7b5b1db4c473/pr_source.png/190x190cc-60.jpg', // Load artwork from the network
//   },
//   {
//     id: '2', // Must be a string, required
//
//     url: 'https://designband.com/wp-content/uploads/2012/10/Uptown-Funk-D.mp3',
//
//     title: 'Uptown Funk',
//     artist: 'Bruno Mars',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2014-05-20T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is5-ssl.mzstatic.com/image/thumb/Music/v4/89/88/62/898862e2-3dda-efb4-dc3e-00a06d8b4dd7/075679956491.jpg/300x300bb-60.jpg',
//   },
//   {
//     id: 'sample-1', // Must be a string, required
//
//     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
//
//     title: 'Avaritia',
//     artist: 'T. Schürger',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2009-07-06T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/cc/7f/78/cc7f784c-5f6d-7aae-013d-350ab7999c84/075679871503.jpg/300x300bb-60.jpg', // Load artwork from the network
//   },
//
//   {
//     id: 'sample-2', // Must be a string, required
//
//     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Load media from the network
//
//     title: 'Avaritia II',
//     artist: 'deadmau5',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2014-05-20T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/cc/7f/78/cc7f784c-5f6d-7aae-013d-350ab7999c84/075679871503.jpg/300x300bb-60.jpg', // Load artwork from the network
//   },
//   {
//     id: 'sample-3', // Must be a string, required
//
//     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Load media from the network
//
//     title: 'Avaritia III',
//     artist: 'deadmau5',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2014-05-20T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/cc/7f/78/cc7f784c-5f6d-7aae-013d-350ab7999c84/075679871503.jpg/300x300bb-60.jpg', // Load artwork from the network
//   },
//   {
//     id: 'sample-8', // Must be a string, required
//
//     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // Load media from the network
//
//     title: 'Sound Helix Sample 8',
//     artist: 'T. Schürger',
//     album: 'while(1<2)',
//     genre: 'Progressive House, Electro House',
//     date: '2014-05-20T07:00:00+00:00', // RFC 3339
//
//     artwork:
//       'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/cc/7f/78/cc7f784c-5f6d-7aae-013d-350ab7999c84/075679871503.jpg/300x300bb-60.jpg', // Load artwork from the network
//   },
// ];

const track = require('./data/playlist.json');

export default class AudioList extends React.Component {
  public componentDidMount() {
    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
      console.log('TrackPlayer all setup');
    });

    TrackPlayer.add(track).then(() => {
      // The tracks were added
      console.log('TrackPlayer add()');
    });
  }

  private audioControl = async (index: number) => {
    const playbackState = await TrackPlayer.getState();

    await TrackPlayer.skip(track[index].id);

    console.log(playbackState);

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

        <View style={styles.playerContainer}>
          <MiniPlayer
            togglePlayback={this.togglePlayback}
            skipNext={this.skipNext}
          />
          {/*<Player*/}
          {/*  seek={this.seek}*/}
          {/*  skipNext={this.skipNext}*/}
          {/*  skipPrevious={this.skipPrevious}*/}
          {/*  togglePlayback={this.togglePlayback}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }

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
  playerContainer: {
    height: 54,
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

  /* text */
  artistText: { color: 'grey', fontSize: 12 },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
