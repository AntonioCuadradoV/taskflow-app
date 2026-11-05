
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TasksProvider } from '../context/TasksContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TaskStack() {
  return (
    <Stack.Navigator initialRouteName="TaskList">
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ title: 'Mis tareas' }}
      />

      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalle de tarea' }}
      />

      <Stack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={{ title: 'Nueva tarea' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#4F46E5',
            tabBarInactiveTintColor: '#888888',
            tabBarIcon: ({ color, size }) => {
              const iconName =
                route.name === 'Home'
                  ? 'home-outline'
                  : 'person-outline';

              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={TaskStack}
            options={{ title: 'Inicio' }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Perfil' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}
