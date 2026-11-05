
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import colors from '../constants/colors';

export default function ProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  const displayName = user?.displayName || 'Usuario';
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo cerrar la sesión. Intentá nuevamente.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Mi perfil</Text>

      <Text style={styles.subtitle}>
        Información de tu cuenta de TaskFlow
      </Text>

      <View style={styles.accountCard}>
        <View style={styles.avatar}>
  <Text style={styles.avatarText}>
    {displayName.charAt(0).toUpperCase()}
  </Text>
</View>

<Text style={styles.accountTitle}>
  {displayName}
</Text>

<Text style={styles.accountEmail}>
  {user?.email || 'Sin correo registrado'}
</Text>

<View style={styles.statusContainer}>
  <View style={styles.statusIndicator} />
  <Text style={styles.statusText}>Sesión activa</Text>
</View>

<TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutButtonText}>
    Cerrar sesión
  </Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 24,
  },
  accountCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 12,
    marginBottom: 28,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  accountEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  statusIndicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    marginRight: 8,
  },
  statusText: {
    color: '#16A34A',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  avatar: {
  width: 76,
  height: 76,
  borderRadius: 38,
  backgroundColor: '#4F46E5',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
},
avatarText: {
  color: '#FFFFFF',
  fontSize: 30,
  fontWeight: 'bold',
},
statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 16,
},
statusIndicator: {
  width: 9,
  height: 9,
  borderRadius: 5,
  backgroundColor: '#16A34A',
  marginRight: 8,
},
statusText: {
  color: '#16A34A',
  fontSize: 14,
  fontWeight: '600',
},
});
