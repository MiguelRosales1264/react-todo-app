import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where, 
    orderBy,
} from 'firebase/firestore';
import { db } from './config';

const TODOS_COLLECTION = 'todos';

// Add a new todo
export const addTodo = async (todoData) => {
    try {
        const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
            ...todoData,
            createdAt: new Date(),
            completed: false,
        });
        return { id: docRef.id, ...todoData };
    } catch (error) {
        console.error("Error adding todo: ", error);
        throw error;
    }
};

// Get all todos
export const getTodos = async () => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, TODOS_COLLECTION), orderBy('createdAt', 'desc'))
        );
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting todos: ", error);
        throw error;
    }
};

// Update a todo
export const updateTodo = async (id, updates) => {
    try {
        const todoRef = doc(db, TODOS_COLLECTION, id);
        await updateDoc(todoRef, updates);
        return { id, ...updates };
    } catch (error) {
        console.error("Error updating todo: ", error);
        throw error;
    }
};

// Delete a todo
export const deleteTodo = async (id) => {
    try {
        await deleteDoc(doc(db, TODOS_COLLECTION, id));
        return id;
    } catch (error) {
        console.error("Error deleting todo: ", error);
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
            where('createdAt', '<', tomorrow),
            // orderBy('createdAt', 'desc'),
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting today's todos: ", error);
        throw error;
    }
};