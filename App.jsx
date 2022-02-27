import { useEffect, useState, React } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import SingleCard from './components/SingleCard';
import TextButton from './components/TextButton';
import Constraints from './constants';
import generateUniqueRandomNumbers from './utility/numberUtility';

const minCardNumber = 1;
const maxCardNumber = 100;
const numberOfUniqueNumbers = 6;
const numberOfListColumns = 2;

const styles = StyleSheet.create({
  container: {
    ...Constraints.Theme.CommonStyles.safeArea,
  },

  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginHorizontal: 20,
    marginTop: 8,
  },

  stepsInfoContainer: {
    flexDirection: 'row',
  },

  stepsCount: {
    color: 'blue',
  },

  cardListView: {
    marginHorizontal: 20,
  },
});

export default function App() {
  const [cards, setCards] = useState([]);
  const [steps, setSteps] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const CARD_PAIRS_VALUE = generateUniqueRandomNumbers(
      minCardNumber,
      maxCardNumber,
      numberOfUniqueNumbers,
    );

    const allCards = [...CARD_PAIRS_VALUE, ...CARD_PAIRS_VALUE]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, number: card, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(allCards);
    setSteps(0);
  };

  const increaseStepsByOne = () => setSteps((prevSteps) => prevSteps + 1);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    // eslint-disable-next-line no-unused-expressions
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    increaseStepsByOne();
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.number === choiceTwo.number && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards) => prevCards.map((card) => {
          if (card.number === choiceOne.number) {
            return { ...card, matched: true };
          }
          return card;
        }));

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched === true)) {
      Alert.alert(
        'Congratulations!',
        `You win this game by ${steps} steps!`,
        [
          {
            text: 'Try another round',
            onPress: () => shuffleCards(),
          },
        ],
      );
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const isFlipped = (card) => card.matched
        || choiceOne?.id === card.id || choiceTwo?.id === card.id;

  const renderItem = ({ item }) => (
    <SingleCard card={item} handleChoice={handleChoice} flipped={isFlipped(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <TextButton title="Reset" onPress={shuffleCards} />
        <View style={styles.stepsInfoContainer}>
          <Text>Steps : </Text>
          <Text style={styles.stepsCount}>{steps}</Text>
        </View>
      </View>
      <FlatList
        style={styles.cardListView}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numberOfListColumns}
        bounces="false"
      />
    </SafeAreaView>
  );
}
