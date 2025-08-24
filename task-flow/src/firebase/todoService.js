import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from './config';

const TODOS_COLLECTION = 'todos';

// Add a new todo
export const addTodo = async (todoData) => {
    try {
        const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
            ...todoData,
            createdAt: Timestamp.now(),
            dueDate: todoData.dueData
                ? Timestamp.fromDate(todoData.dueDate)
                : null,
            scheduledTime: todoData.scheduledTime
                ? Timestamp.fromDate(todoData.scheduledTime)
                : null,
            completed: false,
            subtasks: [], // Initialize empty subtasks array
        });
        return { id: docRef.id, ...todoData };
    } catch (error) {
        console.error('Error adding todo: ', error);
        throw error;
    }
};

// Get all todos
export const getTodos = async () => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(db, TODOS_COLLECTION),
                orderBy('createdAt', 'desc')
            )
        );
        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                dueDate: data.dueDate ? data.dueDate.toDate() : null,
                scheduledTime: data.scheduledTime
                    ? data.scheduledTime.toDate()
                    : null,
            };
        });
    } catch (error) {
        console.error('Error getting todos: ', error);
        throw error;
    }
};

// Get a specific todo by ID
export const getTodoById = async (id) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, id); // Reference to the specific todo document
        const docSnap = await getDoc(todoRef); // Using getDoc instead of getDocs
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                dueDate: data.dueDate ? data.dueDate.toDate() : null,
                scheduledTime: data.scheduledTime
                    ? data.scheduledTime.toDate()
                    : null,
            };
        } else {
            console.error('No such todo!');
            throw new Error('Todo not found');
        }
    } catch (error) {
        console.error('Error getting todo by ID: ', error);
        throw error;
    }
};

// Update a todo
export const updateTodo = async (id, updates) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, id);
        const todo = await getDoc(todoRef);

        if (!todo.exists()) {
            throw new Error('Todo not found');
        }

        const currentTodo = todo.data();

        // Process updates while preserving required fields and types
        const processedUpdates = {
            ...currentTodo,
            ...updates,
            id: id, // Ensure ID is not overwritten
            name: String(updates.name || currentTodo.name),
            dueDate: updates.dueDate
                ? Timestamp.fromDate(new Date(updates.dueDate))
                : currentTodo.dueDate || null,
            scheduledTime: updates.scheduledTime
                ? Timestamp.fromDate(new Date(updates.scheduledTime))
                : currentTodo.scheduledTime || null,
            timeEstimate:
                updates.timeEstimate || currentTodo.timeEstimate || null,
            category: updates.category || currentTodo.category || '',
            status: updates.status || currentTodo.status || 'pending',
            completed:
                'completed' in updates
                    ? Boolean(updates.completed)
                    : Boolean(currentTodo.completed),
            completedAt: updates.completed ? Timestamp.now() : null,
            updatedAt: Timestamp.now(),
        };

        await updateDoc(todoRef, processedUpdates);

        // Get and return the updated todo with proper date conversions
        const updatedDoc = await getDoc(todoRef);
        const data = updatedDoc.data();

        return {
            id: updatedDoc.id,
            ...data,
            dueDate: data.dueDate?.toDate() || null,
            scheduledTime: data.scheduledTime?.toDate() || null,
            createdAt: data.createdAt?.toDate() || null,
            completedAt: data.completedAt?.toDate() || null,
            updatedAt: data.updatedAt?.toDate() || null,
        };
    } catch (error) {
        console.error('Error updating todo: ', error);
        throw error;
    }
};

// Delete a todo
export const deleteTodo = async (id) => {
    try {
        await deleteDoc(doc(db, TODOS_COLLECTION, id));
        return id;
    } catch (error) {
        console.error('Error deleting todo: ', error);
        throw error;
    }
};

// Clean up old completed tasks (older than 30 days)
export const cleanupOldCompletedTasks = async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // First get all completed tasks
        const q = query(
            collection(db, TODOS_COLLECTION),
            where('completed', '==', true)
        );

        const querySnapshot = await getDocs(q);

        // Then filter in memory for those older than 30 days
        const oldDocs = querySnapshot.docs.filter((doc) => {
            const completedAt = doc.data().completedAt?.toDate();
            return completedAt && completedAt <= thirtyDaysAgo;
        });

        // Delete the filtered documents
        const deletePromises = oldDocs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        return oldDocs.length; // Return number of deleted tasks
    } catch (error) {
        console.error('Error cleaning up old tasks:', error);
        throw error;
    }
};

// Get today's todos
export const getTodaysTodos = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const q = query(
            collection(db, TODOS_COLLECTION),
            where('createdAt', '>=', today),
            where('createdAt', '<', tomorrow)
            // orderBy('createdAt', 'desc'),
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting today's todos: ", error);
        throw error;
    }
};

// Add a subtask to a todo
export const addSubtask = async (todoId, subtaskData) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, todoId);
        const todo = await getDoc(todoRef);

        if (!todo.exists()) {
            throw new Error('Todo not found');
        }

        const currentSubtasks = todo.data().subtasks || [];
        const newSubtask = {
            id: `st_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
            title: String(
                subtaskData.title || subtaskData.name || 'Untitled Subtask'
            ),
            description: subtaskData.description || '',
            status: 'not_started', // Add status field
            completed: Boolean(subtaskData.completed || false),
            priority: subtaskData.priority || 'medium',
            estimatedTime: subtaskData.estimatedTime || null,
            notes: subtaskData.notes || '',
            dueDate: subtaskData.dueDate
                ? Timestamp.fromDate(new Date(subtaskData.dueDate))
                : null,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await updateDoc(todoRef, {
            subtasks: [...currentSubtasks, newSubtask],
        });

        return newSubtask;
    } catch (error) {
        console.error('Error adding subtask: ', error);
        throw error;
    }
};

// Update a subtask
export const updateSubtask = async (todoId, subtaskId, updates) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, todoId);
        const todo = await getDoc(todoRef);

        if (!todo.exists()) {
            throw new Error('Todo not found');
        }

        const subtasks = todo.data().subtasks || [];
        const subtaskIndex = subtasks.findIndex((st) => st.id === subtaskId);

        if (subtaskIndex === -1) {
            throw new Error('Subtask not found');
        }

        const currentSubtask = subtasks[subtaskIndex];
        const updatedSubtasks = [...subtasks];

        // Update subtask while preserving required fields and types
        updatedSubtasks[subtaskIndex] = {
            ...currentSubtask,
            ...updates,
            id: currentSubtask.id, // Ensure ID is not overwritten
            name: String(updates.name || currentSubtask.name),
            description:
                updates.description || currentSubtask.description || '',
            completed: Boolean(updates.completed ?? currentSubtask.completed),
            priority: updates.priority || currentSubtask.priority || 'medium',
            estimatedTime:
                updates.estimatedTime || currentSubtask.estimatedTime || null,
            notes: updates.notes || currentSubtask.notes || '',
            updatedAt: Timestamp.now(),
        };

        await updateDoc(todoRef, { subtasks: updatedSubtasks });
        return updatedSubtasks[subtaskIndex];
    } catch (error) {
        console.error('Error updating subtask: ', error);
        throw error;
    }
};

// Delete a subtask
export const deleteSubtask = async (todoId, subtaskId) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, todoId);
        const todo = await getDoc(todoRef);

        if (!todo.exists()) {
            throw new Error('Todo not found');
        }

        const subtasks = todo.data().subtasks || [];
        const updatedSubtasks = subtasks.filter((st) => st.id !== subtaskId);

        await updateDoc(todoRef, { subtasks: updatedSubtasks });
        return subtaskId;
    } catch (error) {
        console.error('Error deleting subtask: ', error);
        throw error;
    }
};
