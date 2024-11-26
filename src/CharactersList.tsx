import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Character, getCharacters } from './api';

import { useRefresh } from './hooks/useRefresh.ts';

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
  contentContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 100,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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

  const { isRefreshing, handleRefresh } = useRefresh(getPopular);

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={movies}
      onEndReached={getPopular}
      onEndReachedThreshold={0.3}
      scrollEventThrottle={16}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={<Loader />}
      contentContainerStyle={styles.contentContainer}
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

const Loader = () => {
  return (
    <ActivityIndicator
      style={styles.loader}
    />
  );
};

export default CharactersList;
