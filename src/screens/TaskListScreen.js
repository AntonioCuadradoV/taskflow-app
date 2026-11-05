import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { setFilter } from '../redux/taskSlice';
import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.items);
  const filter = useSelector((state) => state.tasks.filter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() =>
        navigation.navigate('TaskDetail', { taskId: item.id })
      }
    >
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
        <Text style={styles.taskStatus}>
          {item.completed ? 'Completada' : 'Pendiente'}
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.greeting}>¡Hola!</Text>
      <Text style={styles.title}>Mis tareas</Text>

      <ProfileCard
        name="Antonio"
        role="Administrador"
        image="https://i.pravatar.cc/150?img=12"
        status="Activo"
      />

      <View style={styles.filterContainer}>
        {[
          { label: 'Todas', value: 'all' },
          { label: 'Pendientes', value: 'pending' },
          { label: 'Completadas', value: 'completed' },
        ].map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterButton,
              filter === option.value && styles.activeFilter,
            ]}
            onPress={() => dispatch(setFilter(option.value))}
          >
            <Text
              style={[
                styles.filterText,
                filter === option.value && styles.activeFilterText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Listado de tareas</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Text style={styles.addButtonText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={filteredTasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTask}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No hay tareas para mostrar.
        </Text>
      }
    />
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
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#4F46E5',
  },
  filterText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  taskCategory: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 12,
    color: '#4F46E5',
    marginTop: 6,
  },
  arrow: {
    fontSize: 28,
    color: '#888888',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 20,
  },
});
