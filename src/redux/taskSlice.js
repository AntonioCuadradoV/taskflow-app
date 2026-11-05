
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            title: task.title,
            description: task.description,
            category: task.category,
            createdAt: task.createdAt || new Date().toISOString(),
            completed: false,
          },
        };
      },
    },

    toggleTaskStatus(state, action) {
      const task = state.items.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    // Recibir y actualizar las tareas desde Firestore.
    setTasks(state, action) {
      state.items = action.payload;
    },

    // Limpiar las tareas al cerrar sesión.
    clearTasks(state) {
      state.items = [];
    },
  },
});

export const {
  addTask,
  toggleTaskStatus,
  deleteTask,
  setFilter,
  setTasks,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
