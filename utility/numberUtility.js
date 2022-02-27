function generateRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function generateUniqueRandomNumbers(max, min, length) {
  const array = [];
  while (array.length < length) {
    const number = generateRandomNumber(max, min);
    if (array.indexOf(number) === -1) array.push(number);
  }

  return array;
}
