import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Photo from './Photo';
import { styles } from '../styles';

const CharacterItem: React.FC<
  Pick<Character, 'id' | 'name' | 'image'>
> = ({ name, image, id }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = () => {
    navigation.navigate('CharacterDetail', {
      id,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Photo style={styles.image} image={image} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CharacterItem);
