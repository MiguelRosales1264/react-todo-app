import { useState, useEffect } from 'react';
import {
    getTodoById,
    updateTodo,
    deleteTodo,
    addSubtask,
    updateSubtask,
    deleteSubtask,
} from '../firebase/todoService';

export const useTodo = (id) => {
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch single todo by ID
    useEffect(() => {
        if (!id) return;

        const fetchTodo = async () => {
            try {
                setLoading(true);
                const todoData = await getTodoById(id);
                setTodo(todoData);
            } catch (err) {
                setError(err);
                console.error('Error fetching todo:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    // Update todo
    const editTodo = async (id, updates) => {
        try {
            await updateTodo(id, updates);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, ...updates } : todo
                )
            );
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    // Update the todo
    const update = async (updatedData) => {
        if (!id) return;
        try {
            const updatedTodo = await updateTodo(id, updatedData);
            setTodo((prev) => ({ ...prev, ...updatedTodo }));
            return updatedTodo;
        } catch (err) {
            setError(err);
            console.error('Error updating todo:', err);
            throw err;
        }
    };

    // Delete the todo
    const remove = async () => {
        if (!id) return;
        try {
            setLoading(true);
            await deleteTodo(id);
            setTodo(null);
        } catch (err) {
            setError(err);
            console.error('Error deleting todo:', err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle complete status
    const toggleComplete = async () => {
        if (!todo) return;
        try {
            await update({ completed: !todo.completed });
        } catch (err) {
            setError(err);
            console.error('Error toggling complete status:', err);
        }
    };

    // Add a subtask
    const addTodoSubtask = async (subtaskData) => {
        if (!id) return;
        try {
            const newSubtask = await addSubtask(id, subtaskData);
            setTodo((prev) => ({
                ...prev,
                subtasks: [...(prev.subtasks || []), newSubtask],
            }));
        } catch (err) {
            setError(err);
            console.error('Error adding subtask:', err);
        } finally {
            setLoading(false);
        }
    };

    // Update a subtask
    const updateTodoSubtask = async (subtaskId, subtaskData) => {
        if (!id) return;
        try {
            const updatedSubtask = await updateSubtask(
                id,
                subtaskId,
                subtaskData
            );
            setTodo((prev) => ({
                ...prev,
                subtasks: prev.subtasks.map((st) =>
                    st.id === subtaskId ? { ...st, ...updatedSubtask } : st
                ),
            }));
            return updatedSubtask;
        } catch (err) {
            setError(err);
            console.error('Error updating subtask:', err);
            throw err;
        }
    };

    // Delete a subtask
    const deleteTodoSubtask = async (subtaskId) => {
        if (!id) return;
        try {
            await deleteSubtask(id, subtaskId);
            setTodo((prev) => ({
                ...prev,
                subtasks: prev.subtasks.filter((st) => st.id !== subtaskId),
            }));
        } catch (err) {
            setError(err);
            console.error('Error deleting subtask:', err);
            throw err;
        }
    };

    return {
        todo,
        loading,
        error,
        update,
        remove,
        toggleComplete,
        addTodoSubtask,
        updateTodoSubtask,
        deleteTodoSubtask,
    };
};
