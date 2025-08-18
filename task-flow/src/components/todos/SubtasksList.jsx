import React from 'react';
import { useTodo } from '../../hooks/useTodo';

export const SubtasksList = ({ todoId, subtasks = [] }) => {
    const { updateTodoSubtask } = useTodo(todoId);

    const handleToggleSubtask = async (subtaskId, completed) => {
        await updateTodoSubtask(subtaskId, { completed: !completed });
    };

    return (
        <div className="mt-2 space-y-2">
            {subtasks.map((subtask) => (
                <label
                    key={subtask.id}
                    className="flex items-center space-x-2 cursor-pointer group"
                >
                    <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(subtask.id, subtask.completed)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors"
                    />
                    <span className={`text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {subtask.title || subtask.name || 'Untitled Subtask'}
                    </span>
                </label>
            ))}
        </div>
    );
};
