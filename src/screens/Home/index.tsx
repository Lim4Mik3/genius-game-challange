import React from 'react'
import { SafeAreaView, View } from "react-native"
import GeniusBall from '../../components/GeniusBall'

import { BallContainer } from './styles'

const Home: React.FC  = () => {
  return (
    <SafeAreaView>
      <BallContainer>
        <GeniusBall />
      </BallContainer>
    </SafeAreaView>
  )
}

export default Home;