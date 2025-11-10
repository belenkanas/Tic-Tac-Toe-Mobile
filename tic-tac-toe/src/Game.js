import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { use } from 'react'
import Board from './Board'
import { useState, useEffect} from 'react'


const Game = () => {

    const initialBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const [board, setBoard] = useState(initialBoard);
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState('');

    useEffect(() => {
        checkWinner();
    }, [board]);

    const handlePress = (rowIndex, colIndex) => {
        if (board[rowIndex][colIndex] === '' && !winner) {
            const newBoard = [...board];
            newBoard[rowIndex][colIndex] = player;
            setBoard(newBoard);
            setPlayer(player === 'X' ? 'O' : 'X');
        }
    };

    const checkWinner = () => {
        //Filas
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && 
                board[i][0] === board[i][1] && 
                board[i][0] === board[i][2]
                ) {
                setWinner(board[i][0]);
                Alert.alert(`Jugador ${board[i][0]} gana la partida!`);
                break;
            }
        }

        //Columnas
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== '' && 
                board[0][i] === board[1][i] && 
                board[0][i] === board[2][i]
                ) {
                setWinner(board[0][i]);
                Alert.alert(`Jugador ${board[0][i]} gana la partida!`);
                break;
            }
        }

        //Diagonales
        if (board[0][0] !== '' && 
            board[0][0] === board[1][2] && 
            board[0][0] === board[2][2]
            ) {
            setWinner(board[0][0]);
            Alert.alert(`Jugador ${board[0][0]} gana la partida!`);
        } else if (
            board[0][2] !== '' && 
            board[0][2] === board[1][1] && 
            board[0][2] === board[2][0]
            ) {
            setWinner(board[0][2]);
            Alert.alert(`Jugador ${board[0][2]} gana la partida!`);
        }
        
    };

    const resetBoard = () => {
        setBoard(initialBoard);
        setPlayer('X');
        setWinner('');
    }


    useEffect(() => {
        if (winner) {
            Alert.alert(`Jugador ${winner} gana la partida!`, '', [
                { text: 'Reiniciar', onPress: resetBoard }
            ]);
        } 
    }, [winner]);


    useEffect(() => {
        if (!winner){
            const isBoardFull = board.every(row => row.every(cell => cell !== ''));
            if (isBoardFull) {
                Alert.alert('Empate!', '', [
                    { text: 'Reiniciar', onPress: resetBoard }
                ]);
            }
        }
    }, [board]);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Board board={board} onPress={handlePress} />
      <TouchableOpacity 
        style= {styles.resetButton}
        onPress={resetBoard} >
        <Text style={styles.resetButtonText}>
            Reiniciar Juego
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  resetButtonText: { 
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold', 
  },
});