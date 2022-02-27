import { React, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#003B73',
    margin: 8,
    height: 100,
  },

  frontView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074B7',
    borderRadius: 8,
    borderWidth: 4,
  },

  backView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60A3D9',
    borderRadius: 8,
    borderWidth: 4,
  },

  cardText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#BFD7ED',
  },

  backAnimatedView: {
    position: 'absolute',
    top: 0,
  },
});

// eslint-disable-next-line react/prop-types
export default function SingleCard({ card, handleChoice, flipped }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [aValue, setAValue] = useState(0);

  const doAFlip = () => {
    if (aValue >= 90) {
      setAValue(0);
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      setAValue(180);
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const handleClick = () => {
    handleChoice(card);
    doAFlip();
  };

  const frontView = (
    <TouchableHighlight onPress={handleClick} style={styles.frontView}>
      <Animated.View style={frontAnimatedStyle}>
        <View>
          <Text style={styles.cardText}>?</Text>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );

  const backView = (
    <Animated.View style={backAnimatedStyle}>
      <View style={styles.backView}>
        <Text style={styles.cardText}>{card.number}</Text>
      </View>
    </Animated.View>
  );

  return <View style={styles.container}>{flipped ? backView : frontView}</View>;
}
