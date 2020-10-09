import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';

interface IPlayerButtonProps {
  title: string;
  onPress: () => void;
}
const PlayerButton = ({ title, onPress }: IPlayerButtonProps) => {
  return (
    <View style={styles.playerViewContainer}>
      <TouchableHighlight
        style={styles.controlButtonContainer}
        onPress={onPress}
        underlayColor={'lightgrey'}>
        <Text style={styles.controlButtonText}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PlayerButton;

const styles = StyleSheet.create({
  playerViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
  },
  controlButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  controlButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
