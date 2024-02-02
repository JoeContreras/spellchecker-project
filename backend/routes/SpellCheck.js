import express from "express";
import {
  readDictionary,
  isSubsequence,
  removeRepeatingLetters,
  hasMixedCasing,
} from "../util.js";

const router = express.Router();
const dictionary = readDictionary();

router.post("/", async (request, response) => {
  const { word: inputWord } = request.body;
  const res = {
    suggestions: [],
    isCorrect: false,
  };

  let cleanWord = removeRepeatingLetters(inputWord.toLowerCase());
  if (!cleanWord) {
    return response.status(400).send("No text provided");
  }

  const checkSpelling = (word) => {
    if (dictionary.includes(inputWord.toLowerCase())) {
      if (!hasMixedCasing(inputWord)) {
        res.isCorrect = true;
        return res;
      }

      res.isCorrect = false;
    }

    for (let i = 0; i < dictionary.length; i++) {
      if (isSubsequence(word, dictionary[i])) {
        if (dictionary[i].length - word.length <= 5) {
          res.suggestions.push(dictionary[i]);
        }
      }

      if (isSubsequence(dictionary[i], word)) {
        if (word.length - dictionary[i].length <= 1) {
          res.suggestions.push(dictionary[i]);
        }
      }
    }
    return res;
  };

  return response.status(200).send(checkSpelling(cleanWord));
});


export default router;
