//create a function that reads the diconary.txt file and returns an array of words
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readDictionary = () => {
  const dictionary = fs.readFileSync(
    path.resolve(__dirname, "dictionary.txt"),
    "utf8"
  );
  return dictionary.split("\n");
};

function isSubsequence(str1, str2) {
  let index1 = 0;
  let index2 = 0;

  if (str1.length === 0) return true;

  while (index2 < str2.length) {
    if (str1[index1] === str2[index2]) {
      index1++;
    }
    if (index1 === str1.length) return true;
    index2++;
  }

  return false;
}

function hasMixedCasing(word) {
  if (word.length === 0) return false;
  let firstLetter = word[0];
  let restOfWord = word.slice(1);
  //first letter is uppercase
  if (firstLetter === firstLetter.toUpperCase()) {
    //rest of the word is lowercase (word is capitalized)
    if (restOfWord === restOfWord.toLowerCase()) return false;
    //rest of the word is uppercase (word is all caps)
    if (restOfWord === restOfWord.toUpperCase()) return false;
    //rest of the word is mixed casing (word is mixed casing)
    return true;
  }
  //first letter is lowercase
  if (firstLetter === firstLetter.toLowerCase()) {
    //rest of the word is lowercase (word is lowercase)
    if (restOfWord === restOfWord.toLowerCase()) return false;
    //rest of the word is uppercase (word has mixed casing)
    if (restOfWord === restOfWord.toUpperCase()) return true;
    //rest of the word is mixed casing (word is mixed casing)
    return true;
  }
}

function removeRepeatingLetters(text) {
  return text.replace(/(.)\1+/g, function (match, p1) {
    return p1;
  });
}

export {
  readDictionary,
  isSubsequence,
  removeRepeatingLetters,
  hasMixedCasing,
};
