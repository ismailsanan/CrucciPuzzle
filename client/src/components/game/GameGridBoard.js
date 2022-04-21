import { useState, useEffect, useContext } from "react";
import { valdiateWord } from "../../utils/word-selector-validation";
import AuthContext from "../../store/auth-context";
import {
  checkIfWordExists,
  insertScoreForUser,
} from "../../lib/api";

import Card from "../UI/Card";
import classes from "./GameGridBoard.module.css";

let defaultDiff = undefined;
let selectedIndexes = [];
let selectedIndexesForRightWords = [];
let rightWordsIndexes = [];
let totalScore = 0;
let gameTime = 60;

const GameGridBoard = (props) => {
  const board = props.gameBoard;

  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLogged;
  const userId = authContext.userId;

  const diff = props.diff;
  //console.log("GameGridBoard -> ", isLoggedIn, userId);

  if (!defaultDiff) {
    defaultDiff = diff;
  }

  if (diff !== defaultDiff) {
    defaultDiff = diff;
    selectedIndexes = [];
    rightWordsIndexes = [];
    totalScore = 0;
  }

  const rows = board.length;

  const [selectedWord, setSelectedWord] = useState(undefined);
  const [stopTimer, setStopTimer] = useState(true);
  const [timer, setTimer] = useState(gameTime);

  const clearStuff = (interval) => {
    setStopTimer(true);
    selectedIndexes = [];
    rightWordsIndexes = [];
    alert("Your score is " + totalScore);
    totalScore = 0;
    setTimer(gameTime);
    clearInterval(interval);
  };

  useEffect(() => {
    if (!stopTimer) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        }
        if (timer === 0) {
          // check if logged in -> if yes insert score, auth context save id user
    
          
          if (isLoggedIn) {
            //console.log("Inserting score");

            //console.log("record to insert: ", userId, defaultDiff, totalScore);
            insertScoreForUser(userId, defaultDiff, totalScore)
              .then((res) => {
               // console.log("api resp", res);
                clearStuff(interval);
              })
              .catch((err) => {
                //console.log("err in inserting score", err);
                clearStuff(interval);
              });
          } else {
            //console.log("Guest -> no score inserted");
            clearStuff(interval);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stopTimer, timer, diff, isLoggedIn, userId]);

  const chosenLettersHandler = async (rowIndex, columnIndex) => {
    if (!selectedWord) {
      selectedIndexes.push({ rowIndex, columnIndex });
      setSelectedWord({
        word: board[rowIndex][columnIndex],
        i: rowIndex,
        j: columnIndex,
      });
    } else {
      if (
        selectedIndexesForRightWords &&
        selectedIndexesForRightWords.find(
          (obj) => obj.rowIndex === rowIndex && obj.columnIndex === columnIndex
        ) &&
        selectedIndexesForRightWords.find(
          (obj) =>
            obj.rowIndex === selectedWord.i &&
            obj.columnIndex === selectedWord.j
        )
      ) {
        return;
      }

      // check user selection: H, V, or D
      const userSelection = valdiateWord(
        selectedWord.i,
        selectedWord.j,
        rowIndex,
        columnIndex
      );
      if (userSelection && userSelection.valid) {
        let newWord = selectedWord.word;
        if (userSelection.direction === "H") {
          if (selectedWord.j < columnIndex) {
            for (let j = selectedWord.j + 1; j <= columnIndex; j++) {
              newWord += board[rowIndex][j];
              selectedIndexes.push({ rowIndex, columnIndex: j });
            }
          } else {
            for (let j = selectedWord.j - 1; j >= columnIndex; j--) {
              newWord += board[rowIndex][j];
              selectedIndexes.push({ rowIndex, columnIndex: j });
            }
          }
        }

        if (userSelection.direction === "V") {
          if (selectedWord.i < rowIndex) {
            for (let i = selectedWord.i + 1; i <= rowIndex; i++) {
              newWord += board[i][columnIndex];
              selectedIndexes.push({ rowIndex: i, columnIndex });
            }
          } else {
            for (let i = selectedWord.i - 1; i >= rowIndex; i--) {
              newWord += board[i][columnIndex];
              selectedIndexes.push({ rowIndex: i, columnIndex });
            }
          }
        }

        if (userSelection.direction === "D") {
          if (selectedWord.i < rowIndex && selectedWord.j < columnIndex) {
            let j = selectedWord.j;
            for (let i = selectedWord.i + 1; i <= rowIndex; i++) {
              newWord += board[i][++j];
              selectedIndexes.push({ rowIndex: i, columnIndex: j });
            }
          }

          if (selectedWord.i < rowIndex && selectedWord.j > columnIndex) {
            let j = selectedWord.j;
            for (let i = selectedWord.i + 1; i <= rowIndex; i++) {
              newWord += board[i][--j];
              selectedIndexes.push({ rowIndex: i, columnIndex: j });
            }
          }

          if (selectedWord.i > rowIndex && selectedWord.j < columnIndex) {
            let j = selectedWord.j;
            for (let i = selectedWord.i - 1; i >= rowIndex; i--) {
              newWord += board[i][++j];
              selectedIndexes.push({ rowIndex: i, columnIndex: j });
            }
          }

          if (selectedWord.i > rowIndex && selectedWord.j > columnIndex) {
            let j = selectedWord.j;
            for (let i = selectedWord.i - 1; i >= rowIndex; i--) {
              newWord += board[i][--j];
              selectedIndexes.push({ rowIndex: i, columnIndex: j });
            }
          }
        }

        //console.log(newWord);
        const newSelectedWord = {
          word: newWord,
        };

        setSelectedWord({ newSelectedWord });

        // validate word from server

        const found = await checkIfWordExists(newWord);
       // console.log(selectedWord, found.data);

        if (!found.data) {
          selectedIndexes = [];
        } else {
          totalScore +=(newWord.length * diff);
          rightWordsIndexes = [...rightWordsIndexes, ...selectedIndexes];
          selectedIndexes = [];
          selectedIndexesForRightWords = [
            ...selectedIndexesForRightWords,
            ...rightWordsIndexes,
          ];
        }
        setSelectedWord(undefined);
      }
    }
  };

  let grid = [[]];
  for (let i = 0; i < rows; i++) {
    grid[i] = (
      <tr key={i}>
        {board[i].map((column, index) => {
          const selection = selectedIndexes.find(
            (obj) => obj.rowIndex === i && obj.columnIndex === index
          );

          const right = rightWordsIndexes.find(
            (obj) => obj.rowIndex === i && obj.columnIndex === index
          );

          let styleLetters = classes.letter;
          if (selection) {
            styleLetters += " " + classes.selectedLetter;
          }

          if (right) {
            styleLetters += " " + classes.rightLetters;
          }

          return (
            <td
              className={styleLetters}
              key={index}
              onClick={() =>
                !stopTimer && timer !== 0 && chosenLettersHandler(i, index)
              }
            >
              {column}
            </td>
          );
        })}
      </tr>
    );
  }

  const buttonDescription = stopTimer ? "Play" : "Pause";
  return (
    <>
      <table className={classes.gameboard}>
        <tbody>{grid}</tbody>
      </table>

      <Card>
        <h1>score: {totalScore}</h1>

        {timer !== 0 && (
          <button
            className={classes.gameButton}
            onClick={() => setStopTimer(!stopTimer)}
          >
            {buttonDescription}
          </button>
        )}

        <p>{timer}</p>
      </Card>
    </>
  );
};

export default GameGridBoard;