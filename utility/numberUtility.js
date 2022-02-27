function generateRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function generateRandomNumbers(max, min, length) {
  return Array.from({ length }, () => generateRandomNumber(max, min));
}
