# Audio Player

Inspired by Apple Music app, Audio Player app has the ability to play music (as well in the background) from a defined playlist json file.  Mini Player at the bottom of the track list can be tapped to get a Full Player.

The package react-native-track-player came with all the nice features to make this app possible without having to add anymore additional packages.  Having the ability to monitor events when changes to the playback allows creation of components without having to use state management package like redux.

iOS           |  Android
:-------------------------:|:-------------------------:
<img src="./docs/AudioPlayerReal-ios.gif" width="227" height="507">  |  <img src="./docs/AudioPlayerReal-android.gif" width="227" height="507">

### Running the App

```
yarn && cd ios && pod install && cd ..

# running on iOS simulator
yarn ios

# running on Android emulator
yarn android
```

### Playing Your Own Playlist

Modify ./src/data/playlist.json and add the tracks with your own .mp3 songs.

### Testing the App

Currently, only doing shallow render on PlayerArtwork component.
```
yarn test
```
