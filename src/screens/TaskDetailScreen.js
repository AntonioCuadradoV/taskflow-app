
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';

import {
  updateTaskStatus,
  removeTask,
} from '../services/taskService';

import colors from '../constants/colors';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const task = useSelector((state) =>
    state.tasks.items.find((item) => item.id === taskId)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          No se encontró la tarea.
        </Text>
      </View>
    );
  }

  const handleToggleStatus = async () => {
    try {
      setIsUpdating(true);

      await updateTaskStatus(task.id, !task.completed);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);

      Alert.alert(
        'Error',
        'No se pudo actualizar el estado de la tarea.'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que querés eliminar esta tarea? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);

              await removeTask(task.id);

              navigation.navigate('TaskList');
            } catch (error) {
              console.error('Error al eliminar la tarea:', error);

              Alert.alert(
                'Error',
                'No se pudo eliminar la tarea. Intentá nuevamente.'
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.description}>{task.description}</Text>

      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.info}>{task.category}</Text>

      <Text style={styles.label}>Fecha de creación</Text>
      <Text style={styles.info}>
        {new Date(task.createdAt).toLocaleDateString('es-AR')}
      </Text>

      <Text style={styles.label}>Estado</Text>
      <Text style={styles.info}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          isUpdating && styles.disabledButton,
        ]}
        onPress={handleToggleStatus}
        disabled={isUpdating || isDeleting}
      >
        {isUpdating ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {task.completed
              ? 'Marcar como pendiente'
              : 'Marcar como completada'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.deleteButton,
          isDeleting && styles.disabledButton,
        ]}
        onPress={handleDeleteTask}
        disabled={isDeleting || isUpdating}
      >
        {isDeleting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.deleteButtonText}>
            Eliminar tarea
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 18,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  info: {
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  notFound: {
    fontSize: 18,
    color: colors.text,
  },
});
