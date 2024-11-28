import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type CharacterDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'CharacterDetail'>;
};

export const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
  const { params } = route;
  return (
    <>
      <Text>{params.id}</Text>
    </>
  );
};
