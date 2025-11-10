import { View, Text, TouchableOpacity,  StyleSheet} from 'react-native'
import React from 'react'

const Board = ({ board, onPress }) => {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
            {
                row.map((cell, cellIndex) => (
                    <TouchableOpacity
                        key={cellIndex}
                        style={styles.cell}
                        onPress={() => onPress(rowIndex, cellIndex)}
                    >
                        <Text style={styles.cellText}>
                            {cell}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
        ))}
    </View>
  )
}
export default Board

const styles = StyleSheet.create({
  board: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
  fontSize: 36,
  },
});