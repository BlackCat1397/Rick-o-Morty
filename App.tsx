import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { CharactersListScreen, CharacterDetailScreen } from 'src/screens';


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const contextualStyles = useMemo(() => StyleSheet.create({
    background: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    },
  }), [isDarkMode]);

  return (
    <SafeAreaView style={contextualStyles.background}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CharactersList" component={CharactersListScreen} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
