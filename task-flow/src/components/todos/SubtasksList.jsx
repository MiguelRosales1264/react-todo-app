import React, { useState, useEffect } from 'react';
import { useTodo } from '../../hooks/useTodo';

export const SubtasksList = ({ todoId, subtasks = [] }) => {
    const [localSubtasks, setLocalSubtasks] = useState(subtasks);
    const { updateTodoSubtask } = useTodo(todoId);

    // Update local state when props change
    useEffect(() => {
        setLocalSubtasks(subtasks);
    }, [subtasks]);

    const handleToggleSubtask = async (subtask) => {
        try {
            // Optimistic update
            const updatedSubtasks = localSubtasks.map(st => 
                st.id === subtask.id 
                    ? { ...st, completed: !st.completed }
                    : st
            );
            setLocalSubtasks(updatedSubtasks);

            // Update backend
            await updateTodoSubtask(subtask.id, { 
                completed: !subtask.completed,
                status: !subtask.completed ? 'completed' : 'in_progress',
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Failed to toggle subtask:', error);
            // Revert on error
            setLocalSubtasks(subtasks);
        }
    };

    return (
        <div className="space-y-2">
            {localSubtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center space-x-2 p-2 border rounded-lg bg-white">
                    <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(subtask)}
                        className="h-4 w-4 text-blue-600"
                    />
                    <div className="flex-1">
                        <div className="font-medium">{subtask.title}</div>
                        {subtask.description && (
                            <div className="text-sm text-gray-600">{subtask.description}</div>
                        )}
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${
                        subtask.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {subtask.completed ? 'Done' : 'To Do'}
                    </span>
                </div>
            ))}
        </div>
    );
}