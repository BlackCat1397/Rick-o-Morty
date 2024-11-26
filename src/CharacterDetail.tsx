import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../App.tsx';

type CharacterDetailProps = {
  route: RouteProp<RootStackParamList, 'CharacterDetail'>;
};
const CharacterDetail = ({ route }: CharacterDetailProps) => {
  const { params } = route;
  return (
    <>
      <Text>{params.id}</Text>
    </>
  );
};

export default CharacterDetail;
