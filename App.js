import { StatusBar } from 'expo-status-bar';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ProfileScreen />
    </>
  );
}