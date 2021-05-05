import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Board = ({ no, boxInfo , turn, winner }) => {

    const { isXTurn, setIsXTurn } = turn;
    const { boxes, setBoxes } = boxInfo;
    const player = isXTurn ? 'X' : 'O';

    const pressHandler = () => {
        console.log('PRESS');
        if( boxes[no] === null && winner === null) {
            setBoxes((prevBoxInfo) => {
                prevBoxInfo[no] = player
                return prevBoxInfo;
            });
            setIsXTurn((prevState) => !prevState)
        }
    };

    const xText = () => (
        <Text style={styles.xText}>X</Text>
    );

    const oText = () => (
        <Text style={styles.oText}>O</Text>
    );

    const emptyText = () => (
        <Text></Text>
    );

    const getBoxContent = () => {
        if (boxes[no] === null) {
            return emptyText();
        }

        return boxes[no] === 'X' ? xText() : oText();
    };

    return (
        <TouchableOpacity onPress={() => pressHandler()}>
            <View style={styles.boxView}>
                {getBoxContent()}
            </View>
        </TouchableOpacity>
    )
}

export default Board;


const styles = StyleSheet.create({
    boxView: {
        minWidth: 110,
        minHeight: 110,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    xText: {
        color: '#CF660E',
        fontSize: 55,
    },
    oText: {
        color: '#5E99F7',
        fontSize: 55,
    },
})
