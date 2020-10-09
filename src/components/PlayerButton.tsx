import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';

interface IPlayerButtonProps {
  title: string;
  onPress: () => void;
  imagePath?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  buttonStyle?: ImageStyle;
}
const PlayerButton = ({
  buttonStyle,
  imagePath,
  imageStyle,
  title,
  onPress,
}: IPlayerButtonProps) => {
  return (
    <View style={[styles.playerViewContainer, imageStyle]}>
      <TouchableHighlight
        style={[styles.controlButtonContainer, imageStyle, buttonStyle]}
        onPress={onPress}
        underlayColor={'lightgrey'}>
        {renderButton(title, imagePath, imageStyle)}
      </TouchableHighlight>
    </View>
  );
};

const renderButton = (
  title: string,
  imagePath?: ImageSourcePropType,
  imageStyle?: ImageStyle,
) => {
  if (imagePath) {
    return (
      <Image
        source={imagePath}
        style={[styles.controlButtonImageContainer, imageStyle]}
      />
    );
  } else {
    return <Text style={styles.controlButtonText}>{title}</Text>;
  }
};

export default PlayerButton;

const styles = StyleSheet.create({
  playerViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  controlButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  controlButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  controlButtonImageContainer: {
    width: 50,
    height: 50,
  },
});
