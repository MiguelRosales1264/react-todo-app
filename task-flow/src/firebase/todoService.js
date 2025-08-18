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
}

// Update a todo
export const updateTodo = async (id, updates) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, id);
        const processedUpdates = {
            ...updates,
            dueDate: updates.dueDate
                ? Timestamp.fromDate(new Date(updates.dueDate))
                : null,
            scheduledTime: updates.scheduledTime
                ? Timestamp.fromDate(new Date(updates.scheduledTime))
                : null,
        };
        await updateDoc(todoRef, processedUpdates);
        return { id, ...updates };
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
            id: Date.now().toString(), // Generate a unique ID for the subtask
            createdAt: Timestamp.now(),
            completed: false,
            ...subtaskData
        };

        await updateDoc(todoRef, {
            subtasks: [...currentSubtasks, newSubtask]
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
        const subtaskIndex = subtasks.findIndex(st => st.id === subtaskId);
        
        if (subtaskIndex === -1) {
            throw new Error('Subtask not found');
        }

        const updatedSubtasks = [...subtasks];
        updatedSubtasks[subtaskIndex] = {
            ...updatedSubtasks[subtaskIndex],
            ...updates,
            updatedAt: Timestamp.now()
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
        const updatedSubtasks = subtasks.filter(st => st.id !== subtaskId);

        await updateDoc(todoRef, { subtasks: updatedSubtasks });
        return subtaskId;
    } catch (error) {
        console.error('Error deleting subtask: ', error);
        throw error;
    }
};
