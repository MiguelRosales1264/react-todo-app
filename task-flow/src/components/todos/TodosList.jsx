import { useTodos } from '../../hooks/useTodos';
import TodoCard from './TodoCard';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import QuickEditModal from './QuickEditModal';
import Modal from '../ui/Modal';

export default function TodosList({
    todos: initialTodos,
    className = '',
    onTodoUpdate,
}) {
    const { loading, updateTodo } = useTodos();
    const navigate = useNavigate();
    const [editingTodo, setEditingTodo] = useState(null);
    const [deletingTodo, setDeletingTodo] = useState(null);
    const [todos, setTodos] = useState(initialTodos);

    // Keep local todos in sync with prop updates
    useEffect(() => {
        setTodos(initialTodos);
    }, [initialTodos]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!todos) {
        return null;
    }

    const handleToggleComplete = async (id) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        try {
            const updated = await updateTodo(id, {
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date() : null,
            });

            // Update local state
            setTodos((currentTodos) =>
                currentTodos.map((t) => (t.id === id ? updated : t))
            );

            // Notify parent component if callback provided
            if (onTodoUpdate) {
                onTodoUpdate(updated);
            }
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    const handleEdit = async (id) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        setEditingTodo(todo);
    };

    const handleQuickEditSave = async (updatedData) => {
        if (!editingTodo) return;

        try {
            console.log('TodosList: Updating todo with data:', updatedData);
            const updated = await updateTodo(editingTodo.id, updatedData);
            console.log('TodosList: Update successful:', updated);

            // Update local state
            setTodos((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === editingTodo.id ? updated : todo
                )
            );

            // Notify parent component if callback provided
            if (onTodoUpdate) {
                onTodoUpdate(updated);
            }

            setEditingTodo(null); // Close modal after successful update
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (id) => {
        const todo = todos.find(t => t.id === id);
        setDeletingTodo(todo);
    };

    const confirmDelete = async () => {
        if (!deletingTodo) return;

        try {
            const updated = await updateTodo(deletingTodo.id, { deleted: true });

            // Update local state - remove the deleted todo
            setTodos((currentTodos) =>
                currentTodos.filter((todo) => todo.id !== deletingTodo.id)
            );

            // Close the modal
            setDeletingTodo(null);

            // Notify parent component if callback provided
            if (onTodoUpdate) {
                onTodoUpdate(updated);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleInProgress = async (id) => {
        try {
            const updated = await updateTodo(id, {
                status: 'in_progress',
                lastUpdated: new Date(),
            });

            // Update local state
            setTodos((currentTodos) =>
                currentTodos.map((todo) => (todo.id === id ? updated : todo))
            );

            // Notify parent component if callback provided
            if (onTodoUpdate) {
                onTodoUpdate(updated);
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleReschedule = async (id) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        // Open quick edit modal with focus on the date picker
        setEditingTodo({
            ...todo,
            focusField: 'dueDate',
        });
    };

    const handleFocusSession = (id) => {
        navigate(`/task/${id}/focus`);
    };

    return (
        <>
            <div className={`${className}`}>
                <div className="space-y-4">
                    {todos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onToggleComplete={() =>
                                handleToggleComplete(todo.id)
                            }
                            onEdit={() => handleEdit(todo.id)}
                            onDelete={() => handleDelete(todo.id)}
                        />
                    ))}
                </div>
            </div>

            {editingTodo && (
                <QuickEditModal
                    todo={editingTodo}
                    onClose={() => setEditingTodo(null)}
                    onSave={handleQuickEditSave}
                />
            )}

            {deletingTodo && (
                <Modal
                    isOpen={true}
                    onClose={() => setDeletingTodo(null)}
                    title="Delete Task"
                >
                    <div className="p-6">
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete "{deletingTodo.name}"? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeletingTodo(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
