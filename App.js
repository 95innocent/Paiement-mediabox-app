import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/AppContainer';

export default function App() {
  return (
    <NativeBaseProvider>
      <AppContainer />

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
