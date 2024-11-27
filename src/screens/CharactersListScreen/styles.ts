import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
