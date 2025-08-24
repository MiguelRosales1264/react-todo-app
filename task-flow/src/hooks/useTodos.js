import { useState, useEffect } from 'react';
import {
    subscribeTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from '../firebase/todoService';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Subscribe to todos from Firestore on mount
    useEffect(() => {
        setLoading(true);
        
        // Subscribe to real-time updates
        const unsubscribe = subscribeTodos((todosData) => {
            setTodos(todosData);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Add todo
    const createTodo = async (todoData) => {
        try {
            const newTodo = await addTodo(todoData);
            setTodos((prev) => [newTodo, ...prev]);
            return newTodo;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    // Update todo
    const editTodo = async (id, updates) => {
        try {
            const updatedTodo = await updateTodo(id, updates);
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? updatedTodo : todo))
            );
            return updatedTodo;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    // Delete todo
    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        todos,
        loading,
        error,
        createTodo,
        editTodo,
        updateTodo: editTodo, // Alias for compatibility
        removeTodo,
        deleteTodo: removeTodo, // Alias for clarity
    };
};
