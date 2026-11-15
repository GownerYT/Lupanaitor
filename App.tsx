import { StatusBar } from 'react-native';
import { MagnifierScreen } from './src/screens/MagnifierScreen';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <MagnifierScreen />
    </>
  );
}
