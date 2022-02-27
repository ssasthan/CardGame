import { React } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#003B73',
    borderRadius: 8,
    borderWidth: 4,
    margin: 8,
    height: 100,
  },

  frontView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074B7',
  },

  backView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60A3D9',
  },

  cardText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#BFD7ED',
  },
});

// eslint-disable-next-line react/prop-types
export default function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  const frontView = (
    <TouchableHighlight onPress={handleClick} style={styles.frontView}>
      <View>
        <Text style={styles.cardText}>?</Text>
      </View>
    </TouchableHighlight>
  );

  const backView = (
    <View style={styles.backView}>
      <Text style={styles.cardText}>{card.number}</Text>
    </View>
  );

  return <View style={styles.container}>{flipped ? backView : frontView}</View>;
}
