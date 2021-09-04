import React, {useRef, useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, FlatList, Dimensions, Animated } from 'react-native';
import TrackPlayer, {Capability, useTrackPlayerEvents, usePlaybackState, TrackPlayerEvents, STATE_PLAYING, Event} from 'react-native-track-player';
import {PLAYBACK_TRACK_CHANGED} from 'react-native-track-player/lib/eventTypes';

const {width, height} = Dimensions.get('window');

const TRACK_PLAYER_CONTROLS_OPTS = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOS,
    TrackPlayer.CAPABILITY_SEEK_TO,
  ], 
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILTY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
};

export default function Player() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slider = useRef(null);
  const isPlayerReady = useRef(false);
  const index = useRef(0);

  const [songIndex, setSongIndex] = useState(0);

  const isItFromUser = useRef(true);

  const position = useRef(Animated.divide(scrollX, width)).current;
  const playbackState = usePlaybackState();

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const val = Math.round(value / width);
      setSongIndex(val);
    });

    TrackPlayer.setupPlayer().then(async () => {
      console.log('Player ready');
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      TrackPlayer.play();
      isPlayerReady.current = true;
    })
  })
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Local files and assets can be imported by dragging and dropping them into the editor
      </Text>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
