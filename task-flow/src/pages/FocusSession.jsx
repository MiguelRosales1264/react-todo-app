import { useParams } from 'react-router';
import { useState } from 'react';
import { useTodo } from '../hooks/useTodo';
import Modal from '../components/ui/Modal';
import NewSubtaskForm from '../components/todos/NewSubtaskForm';

export default function FocusSession() {
    const { todoId } = useParams();
    const { todo, loading, error, addTodoSubtask, update } = useTodo(todoId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleToggleComplete = async () => {
        try {
            await update({
                completed: !todo.completed,
                // If marking as complete, set completedAt, otherwise null
                completedAt: !todo.completed ? new Date() : null
            });
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };
    
    const handleAddSubtask = async (subtaskData) => {
        try {
            await addTodoSubtask(subtaskData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding subtask:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Focus Session</h1>
            {error && (
                <div className="text-red-500">Error: {error.message}</div>
            )}
            {todo ? (
                <div className={todo.completed ? 'opacity-50' : ''}>
                    <div className="flex justify-between items-start mb-4">
                        <h2 className={`text-xl font-semibold ${todo.completed ? 'line-through' : ''}`}>
                            {todo.name}
                        </h2>
                        <button
                            onClick={handleToggleComplete}
                            className={`px-4 py-2 rounded-md text-white ${
                                todo.completed
                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                    </div>
                    <p className="mt-2">{todo.description}</p>
                    <p className="mt-2">
                        Due Date:{' '}
                        {todo.dueDate
                            ? new Date(todo.dueDate).toLocaleDateString()
                            : 'No due date'}
                    </p>
                    {/* <p className="mt-2">Scheduled Time: {todo.scheduledTime ? todo.scheduledTime : 'No scheduled time'}</p> */}
                    <p className="mt-2">Category: {todo.category}</p>
                    <p className="mt-2">
                        Time Estimate: {todo.timeEstimate} minutes
                    </p>
                    <p className="mt-2">
                        Completed: {todo.completed ? 'Yes' : 'No'}
                    </p>
                    <p className="mt-2">
                        Created At: {new Date(todo.createdAt).toLocaleString()}
                    </p>

                    {/* Subtasks section */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Subtasks</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                            >
                                Add Subtask
                            </button>
                        </div>
                        {todo.subtasks && todo.subtasks.length > 0 ? (
                            <ul className=" space-y-2 mt-2">
                                {todo.subtasks.map((subtask) => (
                                    <li key={subtask.id} className="p-3 border rounded-lg bg-white shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{subtask.title ? subtask.title : "No Title"}</span>
                                            <span className={`text-sm px-2 py-1 rounded ${
                                                subtask.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {subtask.completed ? 'Completed' : 'In Progress'}
                                            </span>
                                        </div>
                                        {subtask.description && (
                                            <p className="text-sm text-gray-600 mt-1">{subtask.description}</p>
                                        )}
                                        {subtask.notes && (
                                            <p className="text-sm text-gray-500 mt-1">Notes: {subtask.notes}</p>
                                        )}
                                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                            {subtask.priority && (
                                                <span>Priority: {subtask.priority}</span>
                                            )}
                                            {subtask.estimatedTime && (
                                                <span>Est. Time: {subtask.estimatedTime}min</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="mt-4 text-gray-500 text-center p-4 border rounded-lg">
                                No subtasks added yet
                            </div>
                        )}
                    </div>
                    {/* Add more details as needed */}
                </div>
            ) : (
                <div>No todo found.</div>
            )}

            {/* New Subtask Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Subtask"
            >
                <NewSubtaskForm
                    onSubmit={handleAddSubtask}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
