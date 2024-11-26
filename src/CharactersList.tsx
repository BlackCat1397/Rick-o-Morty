import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Character, getCharacters } from './api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App.tsx';
import Photo from './Photo.tsx';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  container: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
  image: {
    width: 70,
    height: 100,
  },
  text: {
    marginHorizontal: 10,
  },
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const CharactersList = () => {
  const [movies, setMovies] = useState<Character[]>();

  const getPopular = useCallback(async () => {
    try {
      await delay(1000);
      const {
        data: { results },
      } = await getCharacters();
      setMovies(results);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getPopular();
    }, [getPopular]),
  );

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={movies}
      onEndReached={getPopular}
      onEndReachedThreshold={0.3}
      scrollEventThrottle={16}
      // refreshing={true}
      // onRefresh={getPopular}
      ListEmptyComponent={<Text>Loading...</Text>}
      renderItem={({ item }) => <CharacterItem {...item} />}
    />
  );
};

const CharacterItem = ({ name, image, id }: Character) => {
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

export default CharactersList;
