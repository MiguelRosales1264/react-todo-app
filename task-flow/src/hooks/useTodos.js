import { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../firebase/todoService';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch todos from Firestore on mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const todosData = await getTodos();
                setTodos(todosData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    // Add todo
    const createTodo = async (todoData) => {
        try {
            const newTodo = await addTodo(todoData);
            setTodos(prev => [newTodo, ...prev]);
            return newTodo;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    // Update todo
    const editTodo = async (id, updates) => {
        try {
            await updateTodo(id, updates);
            setTodos(prev => prev.map(todo => 
                todo.id === id ? { ...todo, ...updates } : todo
            ));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    // Delete todo
    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    }

    return {
        todos,
        loading,
        error,
        createTodo,
        editTodo,
        removeTodo
    };
};