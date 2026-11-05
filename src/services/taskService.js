
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

// Obtener las tareas de un usuario en tiempo real.
export function subscribeToTasks(userId, onTasks, onError) {
  const tasksQuery = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );

  return onSnapshot(
    tasksQuery,
    (snapshot) => {
      const tasks = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      onTasks(tasks);
    },
    onError
  );
}

// Crear una tarea.
export async function createTask(userId, task) {
  const newTask = {
    title: task.title,
    description: task.description,
    category: task.category,
    completed: false,
    userId,
    createdAt: new Date().toISOString(),
  };

  const documentRef = await addDoc(
    collection(db, 'tasks'),
    newTask
  );

  return {
    id: documentRef.id,
    ...newTask,
  };
}

// Cambiar el estado de una tarea.
export async function updateTaskStatus(taskId, completed) {
  await updateDoc(doc(db, 'tasks', taskId), {
    completed,
  });
}

// Eliminar una tarea.
export async function removeTask(taskId) {
  await deleteDoc(doc(db, 'tasks', taskId));
}
