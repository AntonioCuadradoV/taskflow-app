import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: colors.subtitle,
    textAlign: 'center',
  },
});

export default globalStyles;
