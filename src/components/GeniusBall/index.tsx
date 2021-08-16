import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native';
import timeout from '../../utils/delayTime'
import PlayButton from '../PlayButton'

import { Container, CardColor } from './styles'

interface GameStateProps {
  userIsPlaying: boolean;
  computerIsPlaying: boolean;
  userCombination: String[];
  computerCombination: String[];
  gameLevel: Number;
  userPlayTime: number;
}

interface BlinkColorProps {
  color: String;
}

interface handleUserTapProps {
  color: String;
}

export default function GeniusBall() {
  const [isOn, setIsOn] = useState(false);
  const InitialGameState = {
    userIsPlaying: false,
    computerIsPlaying: false,
    userCombination: [],
    userPlayTime: 0,
    computerCombination: [],
    gameLevel: 0
  }
  const [gameState, setGameState] = useState<GameStateProps>(InitialGameState);

  const [colorFlash, setColorFlash] = useState("" as String);

  const colors: String[] = ["red", "green", "blue", "yellow"];

  const handlePlayButton = async () => {
    setIsOn(false);
    if(!gameState.computerIsPlaying) {
      await computerPlay()
    }
  }

  const userLose = () => {
    Alert.alert("Voce errou a sequencia!")
    setIsOn(false);
    setGameState(InitialGameState);
  }

  const handleUserPlay = ({ color }: handleUserTapProps ) => {
    if (gameState.userIsPlaying) {
      BlinkColor({ color });

      const newUserCombination = [...gameState.userCombination, color]
      
      setGameState(oldState => ({ 
        ...oldState, 
        userCombination: newUserCombination, 
      }));

      const { userCombination, computerCombination } = gameState;
      
      for (let i=0; i<userCombination.length; i++) {
        console.log(`USER: ${userCombination[i]} - COMPUTER: ${computerCombination[i]}`)
      }


    } else {
      return;
    }
  }

  const BlinkColor = async ({ color }: BlinkColorProps) => {
    if (colors.includes(color)) {
      setColorFlash(color)
      await timeout(800);
      setColorFlash("")
      await timeout(800);
    }
  }

  const createRandomColor = () => {
    const newComputerSequence = [...gameState.computerCombination, colors[Math.floor(Math.random() * 4)]]

    setGameState(oldState => ({ ...oldState, computerCombination: newComputerSequence}))

    console.log(gameState.computerCombination);
  }

  const computerPlay = async () => {
    setGameState(oldState => ({ 
      ...oldState, 
      userIsPlaying: false,
      computerIsPlaying: true
    }))

    createRandomColor();

    const { computerCombination } = gameState;

    for(let i=0; i<computerCombination.length; i++) {
      await BlinkColor({ color: computerCombination[i] })
    }

    setGameState(oldState => ({ 
      ...oldState, 
      userIsPlaying: true,
      computerIsPlaying: false
    }))
  }


  return ( 
    <Container>
      {
        colors.map((color, index) => (
          <CardColor 
            key={index}
            cardColor={color} 
            cardColorIndex={index}
            activeOpacity={1}
            touchSoundDisabled={true}
            onPress={() => handleUserPlay({ color })}
            flash={colorFlash === color}
          /> 
        ))
      }
      <PlayButton 
        onPress={handlePlayButton}
      />
      <Text>
        { isOn ? "Off" : "On"}
      </Text>
    </Container>
  ) 
} 
