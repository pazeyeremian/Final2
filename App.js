/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React , { useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   TouchableOpacity,
 } from 'react-native';

 import firestore from '@react-native-firebase/firestore';

 
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
import Board from './components/Board/Board';


const App: () => React$Node = () => {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const [isSessionOpen, setSessionOpen] = useState(false);

  const PlayBox = (no) => {
    return(
      <Board 
        no={no}
        boxInfo={{boxes, setBoxes}}
        turn={{ isXTurn, setIsXTurn }}
        winner={winner}
      />
    )
  }

  const winPosition = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const calculateWin = () => {
    for (let i=0;  i<winPosition.length; i++) {
      if( 
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]]
        && boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
       ) {
         setWinner(boxes[winPosition[i][0]]);
         return;
       }
    }
  }

  useEffect(() => {
    calculateWin();
  }, [isXTurn])

  const resetValues = () => {
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXTurn(true);
  }

  const createSession = () => {
    firestore()
      .collection('Sessions')
      .add({ winner: '', board: [] })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto"  backgroundColor='red'/>
      <View style={styles.resetButtonContainer}>
        {
          isSessionOpen
            ? (
              <TouchableOpacity onPress={resetValues}>
                <Text>Quit session</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity onPress={createSession}>
                <Text>Create a session</Text>
              </TouchableOpacity>
            )
        }
      </View>

      <View style={styles.featureContainer}>
        {winner !== null 
        ? <Text style={[styles.primaryText, styles.winnerText]}>{winner} IS THE WINNER</Text>
        : <Text style={styles.primaryText}>Turn: {isXTurn ? 'X' : 'O'}</Text>
        }

        
      </View>

      <View style={styles.resetButtonContainer}>
        <TouchableOpacity onPress={resetValues}>
          <Text>Reset Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFA8B',
    alignItems: 'center',
    justifyContent: 'center',

  },
  playBoard: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'black',
    marginLeft: 30,
    marginRight: 30,
  },
  rows: {
    flexDirection: 'row',
  },
  resetIcon: {
    position: 'absolute',
    right: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  resetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 10,
    marginRight: 10
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  winnerText: {
    color: 'purple',
    fontSize: 48,
  }
});