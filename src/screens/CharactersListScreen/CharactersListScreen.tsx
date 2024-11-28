import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { getCharacters } from 'src/api';
import { useRefresh } from 'src/hooks';
import { delay } from 'src/utils';

import { styles } from './styles.ts';
import { CharacterItem } from './components';



const ITEM_HEIGHT = styles.row.marginTop + styles.image.height;

const CharactersListScreen = () => {
  const [characters, setCharacters] = useState<Character[]>();

  const getPopular = useCallback(async () => {
    await delay(1000);
    try {
      const {
        data: { results },
      } = await getCharacters();
      setCharacters(results);
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

  const keyExtractor = useCallback((item: Character) => item.id, []);

  const renderItem = useCallback(({ item }: { item: Character }) => (
    <CharacterItem {...item} />
  ), []);

  const getItemLayout = useCallback((data: ArrayLike<Character> | null | undefined, index: number) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  ), []);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={characters}
      onEndReached={getPopular}
      onEndReachedThreshold={0.3}
      scrollEventThrottle={16}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <ActivityIndicator
          testID="loading-indicator"
          style={styles.loader}
        />
      }
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      windowSize={5}
    />
  );
};

export default CharactersListScreen;
