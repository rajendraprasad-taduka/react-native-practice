import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useState } from 'react'

export default function App() {
  const initialBoard = Array(9).fill(null)
  const [Board, SetBoard] = useState(initialBoard)
  const [isXTurn, SetisXTurn] = useState(true)
  const [MatchResult, setMatchResult] = useState('')
  const [IsGameOver, SetIsGameOver] = useState(false)

  const WINNIG_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]


  const handleClick = (index: any) => {

    Board[index] = isXTurn ? "X" : "O"
    SetisXTurn(!isXTurn)
    ///CHECK WINNER

    for (let i = 0; i < WINNIG_PATTERN.length; i++) {
      const [a, b, c] = WINNIG_PATTERN[i]
      if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
        setMatchResult(`Game Over Player ${isXTurn ? "X" : "O"} is won`)
        SetIsGameOver(true);
        return;
      }
    }

    if (!Board.includes(null)) {
      setMatchResult(`Game Drawn ...!!!`)
      SetIsGameOver(true);
      return;
    }
  }

  const handleReset = () => {
    SetBoard(initialBoard);
    SetisXTurn(true)
    setMatchResult('')
    SetIsGameOver(false)
  }

  return (
    <>
      <View style={styles.topContainer}>
        {
          !IsGameOver && (
            <Text style={styles.playerTurnText}>Player {isXTurn ? "X" : "O"} Turn</Text>
          )
        }

        <TouchableOpacity style={styles.ResetBtn} onPress={handleReset}>
          <Text style={styles.ResetBtnTxt}>Restart Game</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultWon}>{MatchResult}</Text>
      <View style={styles.board}>
        {

          <FlatList
          
            numColumns={3}
            data={Board}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.boxes} onPress={() => { handleClick(index) }} disabled={item !== null || IsGameOver}  >
                <Text style={styles.text}>{Board[index]}</Text>
              </TouchableOpacity>
            )}

          />
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  boxes: {
    height: 100,
    width: 100,
    // backgroundColor:'gray',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1

  },
  board: {
    marginHorizontal: 20,
    marginVertical: 20,
    // width:200,
    // height:200,
    //backgroundColor:'lightgray'
  },
  text: {
    fontWeight: '600',
    fontSize: 20
  },
  topContainer: {
    margin: 20,
    flexDirection: 'row'
  },
  playerTurnText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'Blue'
  },
  ResetBtn: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 40,
    width: 140,
    backgroundColor: 'lightblue',
    borderRadius: 8
  },
  ResetBtnTxt: {
    fontSize: 16,
    fontWeight: '600'
  },
  resultWon: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
    paddingHorizontal:20
  },
  resultDraw: {
    fontSize: 16,
    fontWeight: '600',
    color: 'Red'
  },

})