import { Dimensions } from 'react-native'
import { darken } from 'polished'
import styled from 'styled-components/native';

interface CardColorProps {
  cardColor: String;
  flash: boolean;
  cardColorIndex: number;
}

export const Container = styled.View`
  background-color: #66ffa3; 
  border-radius: ${`${Math.floor(Dimensions.get("window").width / 2)}px`};
  width: 270px;
  padding: 8px;
  border: 3px solid black;

  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
`;

export const CardColor = styled.TouchableOpacity<CardColorProps>`
  width: 120px;
  height: 120px;
  margin: 2px;

  background-color: ${props => props.flash ? props.cardColor : darken(0.3, props.cardColor)};

  border-top-left-radius: ${props => props.cardColorIndex === 0 ? "120px" : "0px"};
  border-top-right-radius: ${props => props.cardColorIndex === 1 ? "120px" : "0px"};
  border-bottom-left-radius: ${props => props.cardColorIndex === 2 ? "120px" : "0px"};
  border-bottom-right-radius: ${props => props.cardColorIndex === 3 ? "120px" : "0px"};

  border: 3px solid #eee;
`;