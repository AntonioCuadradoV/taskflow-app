
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';

import { createTask } from '../services/taskService';
import colors from '../constants/colors';

export default function TaskFormScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveTask = async () => {
    if (title.trim().length < 5) {
      Alert.alert(
        'Título inválido',
        'El título debe tener al menos 5 caracteres.'
      );
      return;
    }

    if (description.trim().length < 10) {
      Alert.alert(
        'Descripción inválida',
        'La descripción debe tener al menos 10 caracteres.'
      );
      return;
    }

    if (!user?.uid) {
      Alert.alert(
        'Error',
        'No se encontró una sesión de usuario activa.'
      );
      return;
    }

    try {
      setIsSaving(true);

      await createTask(user.uid, {
        title: title.trim(),
        description: description.trim(),
        category,
      });

      Alert.alert(
        'Éxito',
        'La tarea se guardó correctamente.'
      );

      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);

      Alert.alert(
        'Error',
        'No se pudo guardar la tarea. Intentá nuevamente.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>

      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá el título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descripción</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ingresá una descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Categoría</Text>

      <View style={styles.categories}>
        {['Trabajo', 'Personal', 'Estudio'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          isSaving && styles.disabledButton,
        ]}
        onPress={handleSaveTask}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>
            Guardar tarea
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
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4F46E5',
  },
  categoryText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
