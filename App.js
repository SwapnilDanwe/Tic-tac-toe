import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';

import {
  Text,
  Container,
  Content,
  Header,
  Body,
  Card,
  H1,
  Button,
  Title,
  Toast,
  Root,
} from 'native-base';

import Icons from './components/Icons';

var itemsArr = new Array(9).fill('empty');

const App = () => {
  const [isLike, setIsLike] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [winnerGrids, setWinnerGrids] = useState([]);
  const [winColor, setWinColor] = useState('');

  const color = {
    success: 'green',
    fail: 'red',
    warning: '#DDD101',
  };

  const setWinner = (action = '', elements = []) => {
    if (action == 'win') {
      setWinMessage(`${itemsArr[elements[0]]} Won !!`);
      setWinnerGrids(elements);
      setWinColor(color.success);
    } else if (action == 'draw') {
      setWinMessage('Its A Draw, Play Again');
      setWinnerGrids([]);
      setWinColor(color.warning);
    } else {
      setWinMessage('');
      setWinnerGrids([]);
      setWinColor('');
    }
  };

  const changeItem = (index) => {
    if (winMessage != '') {
      return Toast.show({
        text: 'Already Won !!',
        type: 'warning',
        style: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      });
    }

    if (itemsArr[index] === 'empty') {
      itemsArr[index] = isLike ? 'like' : 'heart';
      setIsLike(!isLike);
    } else {
      return Toast.show({
        text: 'Already Taken !',
        type: 'danger',
      });
    }

    checkWinner();
  };

  const checkWinner = () => {
    if (
      itemsArr[0] === itemsArr[1] &&
      itemsArr[1] === itemsArr[2] &&
      itemsArr[2] !== 'empty'
    ) {
      //First Horizontal row
      setWinner('win', [0, 1, 2]);
    } else if (
      itemsArr[3] === itemsArr[4] &&
      itemsArr[4] === itemsArr[5] &&
      itemsArr[5] !== 'empty'
    ) {
      //second Horizontal row
      setWinner('win', [3, 4, 5]);
    } else if (
      itemsArr[6] === itemsArr[7] &&
      itemsArr[7] === itemsArr[8] &&
      itemsArr[8] !== 'empty'
    ) {
      //third Horizontal row
      setWinner('win', [6, 7, 8]);
    } else if (
      itemsArr[0] === itemsArr[3] &&
      itemsArr[3] === itemsArr[6] &&
      itemsArr[6] !== 'empty'
    ) {
      //first vertical row
      setWinner('win', [0, 3, 6]);
    } else if (
      itemsArr[1] === itemsArr[4] &&
      itemsArr[4] === itemsArr[7] &&
      itemsArr[7] !== 'empty'
    ) {
      //second vertical row
      setWinner('win', [1, 4, 7]);
    } else if (
      itemsArr[2] === itemsArr[5] &&
      itemsArr[5] === itemsArr[8] &&
      itemsArr[8] !== 'empty'
    ) {
      //third vertical row
      setWinner('win', [2, 5, 8]);
    } else if (
      itemsArr[0] === itemsArr[4] &&
      itemsArr[4] === itemsArr[8] &&
      itemsArr[8] !== 'empty'
    ) {
      //first digonal row
      setWinner('win', [0, 4, 8]);
    } else if (
      itemsArr[2] === itemsArr[4] &&
      itemsArr[4] === itemsArr[6] &&
      itemsArr[6] !== 'empty'
    ) {
      //second digonal row
      setWinner('win', [2, 4, 6]);
    } else {
      var isDraw = true;
      itemsArr.map((item) => {
        if (item === 'empty') {
          isDraw = false;
          return;
        }
      });
      if (isDraw) setWinner('draw');
    }
  };

  const reloadGame = () => {
    setIsLike(false);
    itemsArr.fill('empty', 0, 9);
    setWinner();
  };

  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <Container style={{padding: 4}}>
        <Header>
          <Body>
            <Title>Tic Tac Toe</Title>
          </Body>
        </Header>
        <Content>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            {itemsArr.map((item, index) => (
              <TouchableOpacity
                style={
                  winnerGrids.includes(index)
                    ? [styles.box, {backgroundColor: winColor}]
                    : styles.box
                }
                key={index}
                onPress={() => changeItem(index)}>
                <Card style={styles.card}>
                  <Icons name={item} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {winMessage ? (
            <View>
              <H1 style={[styles.message, {backgroundColor: winColor}]}>
                {winMessage}
              </H1>
              <Button onPress={() => reloadGame()} primary rounded block>
                <Text>Play Again</Text>
              </Button>
            </View>
          ) : (
            <View>
              <H1 style={styles.message}>
                {isLike ? "It's Like turn" : "It's Heart turn"}
              </H1>
            </View>
          )}
        </Content>
      </Container>
    </Root>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexShrink: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  box: {
    width: '33%',
    marginBottom: 6,
    borderColor: '#030200',
    borderRadius: 0,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#FFF',
    marginTop: 20,
    backgroundColor: '#4652B3',
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default App;
