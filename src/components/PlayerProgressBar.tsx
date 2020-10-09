import React from 'react';
// @ts-ignore
import { useTrackPlayerProgress } from 'react-native-track-player';
import { StyleSheet, Text, View } from 'react-native';
import { formatSecondsToHHMMSS } from '../common/helpers';

const PlayerProgressBar = (): JSX.Element => {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progressBarTopContainer}>
      <View
        style={[
          styles.progressBarCommonContainer,
          styles.progressBarContainer,
        ]}>
        <View
          style={[
            styles.progressBarActiveContainer,
            { flex: progress.position },
          ]}
        />
        <View
          style={[
            styles.progressBarCommonContainer,
            { flex: progress.duration - progress.position },
          ]}
        />
      </View>
      <View style={styles.progressBarTimeContainer}>
        <View style={styles.progressBarPositionContainer}>
          <Text style={styles.progressBarTimeText}>
            {formatSecondsToHHMMSS(progress.position)}
          </Text>
        </View>
        <View style={styles.progressBarDurationContainer}>
          <Text style={styles.progressBarTimeText}>
            {formatSecondsToHHMMSS(progress.duration)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  /* container */
  progressBarCommonContainer: {
    height: 3,
    backgroundColor: '#e8e8e8',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarDurationContainer: { flex: 1, alignItems: 'flex-end' },
  progressBarPositionContainer: { flex: 1 },
  progressBarTimeContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 4,
  },
  progressBarTopContainer: { height: 80, justifyContent: 'center' },
  progressBarActiveContainer: {
    height: 3,
    backgroundColor: '#b8b8b8',
  },

  /* text */
  progressBarTimeText: { color: '#c0c0c0', fontFamily: 'System' },
});
