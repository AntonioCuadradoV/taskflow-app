import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ProfileCard({ name, role, image, status }) {
  const isActive = status === 'Activo';

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>

        <View style={[
          styles.statusContainer,
          isActive ? styles.active : styles.inactive
        ]}>
          <Text style={[
            styles.statusText,
            isActive ? styles.activeText : styles.inactiveText
          ]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.border,
  },

  info: {
    marginLeft: 16,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },

  role: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },

  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 9,
  },

  active: {
    backgroundColor: '#DCFCE7',
  },

  inactive: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  activeText: {
    color: '#15803D',
  },

  inactiveText: {
    color: '#B91C1C',
  },
});