// need to calculate score for each word
// map letters to each score
// function that takes word as an argument and returns the score

//prettier-ignore
const scores = {"e": 1, "a": 1, "i": 1, "o": 1, "n": 1, "r": 1, "t": 1, "l": 1, "s": 1, "u": 1,
                "d": 2, "g": 2, "b": 3, "c": 3, "m": 3, "p": 3, "f": 4, "h": 4, "v": 4, "w": 4,
                "y": 4, "k": 5, "j": 8, "x": 8, "q": 10, "z": 10}

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

//console.log(wordScore("hello"));
//console.log(drawFromAlphabet());
