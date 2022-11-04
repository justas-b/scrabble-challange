import shuffle from "./shuffle.js";

// need to calculate score for each word
// map letters to each score
// function that takes word as an argument and returns the score

let dict = await Deno.readTextFile("./dictionary.txt");
let dictArray = dict.split("\n");
let filteredArray = dictArray.filter((word) => word.length < 8);

//prettier-ignore
const scores = {"e": 1, "a": 1, "i": 1, "o": 1, "n": 1, "r": 1, "t": 1, "l": 1, "s": 1, "u": 1,
                "d": 2, "g": 2, "b": 3, "c": 3, "m": 3, "p": 3, "f": 4, "h": 4, "v": 4, "w": 4,
                "y": 4, "k": 5, "j": 8, "x": 8, "q": 10, "z": 10}

//prettier-ignore
const tilesCount = {"e": 12, "a": 9, "i": 9, "o": 8, "n": 6, "r": 6, "t": 6, "l": 4, "s": 4, "u": 4,
                    "d": 4, "g": 3, "b": 2, "c": 2, "m": 2, "p": 2, "f": 2, "h": 2, "v": 2, "w": 2,
                    "y": 2, "k": 1, "j": 1, "x": 1, "q": 1, "z": 1}

function wordScore(word) {
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    score += scores[word[i]];
  }
  return score;
}

// need to draw letter at random from an alphabet
// make alphabet string and make a function that picks a letter at random until 7 letters are drawn

function drawFromAlphabet() {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let tiles = [];

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * 26);
    tiles.push(alphabet[randomIndex]);
  }

  return tiles;
}

// need to make a bag of random letters
// first put all the tiles in order into the back
// use the shuffle function from blackjack to shuffle the tiles
// return array of shuffled tiles
// shift 7 tiles from the start of the array and add to hand

function makeShuffledBag() {
  let bag = [];

  for (let tile in tilesCount) {
    const numOfTiles = tilesCount[tile];
    for (let i = 0; i < numOfTiles; i++) {
      bag.push(tile);
    }
  }

  return shuffle(bag, Date.now());
}

function drawFromBag(hand, bag) {
  let updatedHand = hand;

  while (updatedHand.length < 7) {
    updatedHand.push(bag.shift());
  }

  return updatedHand;
}

//need to check whether a user entered word is a valid word
//will import the dictionary and filter out words that are >7 letter as we are only given 7 tiles
//will loop through the filtered dictionary and check whether the word they input is valid and output the score
//will have a score variable that tracks their score

function checkWord(word) {
  if (filteredArray.some((checkWord) => word === checkWord)) {
    return true;
  } else {
    return false;
  }
}

function removeLetters(word, hand) {
  for (let i = 0; i < word.length; i++) {
    hand.splice(hand.indexOf(word[i]), 1);
  }
  return hand;
}

function main() {
  let bag = makeShuffledBag();
  let hand = [];
  let userScore = 0;
  let isValid = true;

  hand = drawFromBag(hand, bag);

  do {
    let userWord = window
      .prompt(`Your tiles are ${hand}, please enter a valid word: `)
      .toLowerCase();
    isValid = checkWord(userWord);
    if (!isValid) {
      console.log(`${userWord} is not a valid word! Try again.`);
    } else {
      console.log(
        `${userWord} is a valid word! ${wordScore(userWord)} points.`
      );
      userScore += wordScore(userWord);
      hand = removeLetters(userWord, hand);
      drawFromBag(hand, bag);
    }
  } while (!isValid);
}

main();
