import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

const PlayerArtwork = ({
  artwork,
}: {
  artwork: string | undefined;
}): JSX.Element => {
  return (
    <View style={styles.artworkViewContainer}>
      <Image
        style={styles.artworkImageContainer}
        source={{
          uri: artwork,
        }}
      />
    </View>
  );
};

export default PlayerArtwork;

const styles = StyleSheet.create({
  artworkViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 20,

    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  artworkImageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 12.5,
  },
});
