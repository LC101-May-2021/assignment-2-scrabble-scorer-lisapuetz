// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return wordToScore = input.question("Let's play some scrabble! Enter a word: ");
};

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: function(word) {
      let score = word.length;
      return score;
  }
};

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: function(word) {
    word = word.toUpperCase();
    let vowels = ['A', 'E', 'I', 'O', 'U']
	  let score = 0;
	  for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        score += 3;
      } else {
        score += 1;
      }
    }
    return score;
  }
};

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: function(word) {
    word = word.toLowerCase();
	  let letterPoints = 0;
	  for (let i = 0; i < word.length; i++) {
      let letter = word[i]
      letterPoints += newPointStructure[letter];
		 }
    return letterPoints;
	}
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
  let scoringType = Number(input.question('Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: '));
  
  return scoringAlgorithms[scoringType];
}

function transform(obj) {
  let newPointStructure = {};
  for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
        let newKey = obj[key][i];
        let newVal = key;
        newPointStructure[newKey.toLowerCase()] = Number(newVal);
      }
  }
  newPointStructure[' '] = 0
  return newPointStructure;
}

function runProgram() {
  let word = initialPrompt()
  let object = scorerPrompt()
  let score = object.scoringFunction(word);
  console.log(`Score for '${word}': ${score}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

