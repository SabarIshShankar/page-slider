import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {usePlaybackState, useTrackPlayerEvents, Event} from 'react-native-track-player';

export default function Controller({onNext, onPrv}){
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused');
  useEffect(() => {
    console.log('Player state', playbackState);
    if(playbackState === 'playing' || playbackState === 3){
      isPlaying.curent = 'playing';
    } else if(playbackState === 'paused' || playbackState === 2){
      isPlaying.current = 'paused';
    } else {
      isPlaying.current = 'loading';
    }
  }, [playbackState]);

  const returnPlayBtn = () => {
    switch(isPlaying.current){
      case 'playing':
      return <Icon color="#fff" name="pause" size={45}/>;
      case 'paused':
      return <Icon color="fff" name="play-arrow" size={45} />;
      default: 
      return <ActivityIndicator size={45} color="#fff"/>
    }
  };
}