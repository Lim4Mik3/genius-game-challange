import React from 'react'

import { Container, Title } from './styles'

interface PlayButtonProps {
  onPress: () => void;
}

const PlayButton = ({ onPress }: PlayButtonProps) => {
  return (
    <Container
      activeOpacity={1}
      onPress={onPress}
    >
    </Container>
  )
}

export default PlayButton;