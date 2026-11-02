import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import colors from '../constants/colors';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState('');

  const categories = ['Trabajo', 'Personal', 'Estudio'];

  // Comprueba que todos los campos cumplan los requisitos.
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres.';
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
    } else if (description.trim().length < 10) {
      newErrors.description =
        'La descripción debe tener al menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = () => {
    setTouched({
      title: true,
      description: true,
    });

    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: new Date(),
    };

    console.log('Nueva tarea:', newTask);

    Alert.alert('Éxito', 'Tarea capturada localmente');

    // Limpia el formulario después del envío exitoso.
    setTitle('');
    setDescription('');
    setCategory('Trabajo');
    setErrors({});
    setTouched({});
    setFocused('');
  };

  const showTitleError = touched.title && errors.title;
  const showDescriptionError = touched.description && errors.description;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear nueva tarea</Text>
        <Text style={styles.subtitle}>
          Completá los datos para agregar una tarea a TaskFlow.
        </Text>

        {/* Campo título */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={[
            styles.input,
            focused === 'title' && styles.inputFocused,
            showTitleError && styles.inputError,
          ]}
          placeholder="Ej. Preparar presentación"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          onFocus={() => setFocused('title')}
          onBlur={() => {
            setFocused('');
            setTouched((prev) => ({ ...prev, title: true }));
            validateForm();
          }}
          autoCapitalize="sentences"
          returnKeyType="next"
          selectionColor={colors.primary}
        />

        {showTitleError ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}

        {/* Campo descripción */}
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            focused === 'description' && styles.inputFocused,
            showDescriptionError && styles.inputError,
          ]}
          placeholder="Describí brevemente la tarea..."
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          onFocus={() => setFocused('description')}
          onBlur={() => {
            setFocused('');
            setTouched((prev) => ({ ...prev, description: true }));
            validateForm();
          }}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          autoCapitalize="sentences"
          returnKeyType="default"
          selectionColor={colors.primary}
        />

        {showDescriptionError ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}

        {/* Selección de categoría */}
        <Text style={styles.label}>Categoría</Text>

        <View style={styles.categories}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.categorySelected,
              ]}
              onPress={() => setCategory(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Guardar tarea</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  textArea: {
    height: 120,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 6,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  categorySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: colors.white,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});