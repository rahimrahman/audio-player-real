import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IPlayerButtonProps {
  title: string;
  onPress: () => void;
}
const PlayerButton = ({ title, onPress }: IPlayerButtonProps) => {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PlayerButton;

const styles = StyleSheet.create({
  controlButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
