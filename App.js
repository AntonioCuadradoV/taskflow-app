
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';

import {
  setUser,
  setAuthLoading,
} from './src/redux/authSlice';

import {
  setTasks,
  clearTasks,
} from './src/redux/taskSlice';

import { auth } from './firebaseConfig';

import { subscribeToTasks } from './src/services/taskService';

function RootApp() {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.auth.isLoading
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  // Escuchar cambios en la sesión de Firebase.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
            })
          );
        } else {
          dispatch(setUser(null));
          dispatch(clearTasks());
        }

        dispatch(setAuthLoading(false));
      }
    );

    return unsubscribe;
  }, [dispatch]);

  // Sincronizar las tareas del usuario con Firestore.
  useEffect(() => {
    if (!user?.uid) {
      dispatch(clearTasks());
      return;
    }

    const unsubscribe = subscribeToTasks(
      user.uid,
      (tasks) => {
        dispatch(setTasks(tasks));
      },
      (error) => {
        console.error(
          'Error al sincronizar las tareas:',
          error
        );
      }
    );

    return unsubscribe;
  }, [user?.uid, dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

        <Text style={styles.loadingText}>
          Cargando TaskFlow...
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#4B5563',
  },
});
