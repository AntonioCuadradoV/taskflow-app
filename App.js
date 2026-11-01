
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './src/theme/globalStyles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>
        Checkpoint 1: Estructura Base
      </Text>

      <StatusBar style="light" />
    </View>
  );
}
