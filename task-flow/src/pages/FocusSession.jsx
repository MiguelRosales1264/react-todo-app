import { useParams } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { useTodo } from '../hooks/useTodo';
import Modal from '../components/ui/Modal';
import NewSubtaskForm from '../components/todos/NewSubtaskForm';
import checkMark from '../assets/svg/check-mark-circle.svg';
import optionsVertical from '../assets/svg/options-vertical.svg';

export default function FocusSession() {
    const { todoId } = useParams();
    const { todo, loading, error, addTodoSubtask, update, updateTodoSubtask, deleteTodoSubtask } = useTodo(todoId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSubtaskMenu, setActiveSubtaskMenu] = useState(null);
    const [editingSubtask, setEditingSubtask] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState('all');
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveSubtaskMenu(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleSubtask = async (subtaskId) => {
        const subtask = todo.subtasks.find(st => st.id === subtaskId);
        if (!subtask) return;

        try {
            await updateTodoSubtask(subtaskId, {
                completed: !subtask.completed,
                status: !subtask.completed ? 'completed' : 'in_progress',
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error toggling subtask completion:', error);
        }
    };
    
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

    const handleEditSubtask = async (subtaskData) => {
        if (!editingSubtask) return;
        
        try {
            await updateTodoSubtask(editingSubtask.id, subtaskData);
            setEditingSubtask(null);
        } catch (error) {
            console.error('Error updating subtask:', error);
        }
    };

    const handleDeleteSubtask = async (subtaskId) => {
        try {
            await deleteTodoSubtask(subtaskId);
            setActiveSubtaskMenu(null);
        } catch (error) {
            console.error('Error deleting subtask:', error);
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
                <div className={`${todo.completed ? 'opacity-50' : ''} bg-white rounded-lg shadow-sm p-6`}>
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6 pb-4 border-b">
                        <div>
                            <h2 className={`text-2xl font-bold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.name}
                            </h2>
                            {todo.description && (
                                <p className="mt-2 text-gray-600">{todo.description}</p>
                            )}
                        </div>
                        <button
                            onClick={handleToggleComplete}
                            className={`px-4 py-2 rounded-md text-white transition-colors ${
                                todo.completed
                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                    </div>

                    {/* Task Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                todo.completed 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {todo.completed ? 'Completed' : 'In Progress'}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                            <p className="text-gray-900">
                                {todo.dueDate
                                    ? new Date(todo.dueDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                    : 'No due date'}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {todo.category || 'Uncategorized'}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Time Estimate</h3>
                            <p className="text-gray-900">
                                {todo.timeEstimate ? `${todo.timeEstimate} minutes` : 'Not set'}
                            </p>
                        </div>
                    </div>

                    {/* Additional Details */}
                                        {/* Additional Details */}
                    <div className="text-sm text-gray-500 flex gap-4 border-t pt-4 mb-6">
                        <span>Created: {new Date(todo.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })}</span>
                        {todo.completed && todo.completedAt && (
                            <span>Completed: {new Date(todo.completedAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                            })}</span>
                        )}
                    </div>

                    {/* Subtasks section */}

                    {/* Subtasks section */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-semibold">Subtasks</h3>
                                <select
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    className="px-2 py-1 border rounded-md text-sm bg-white"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                            >
                                Add Subtask
                            </button>
                        </div>
                        {todo.subtasks && todo.subtasks.length > 0 ? (
                            <ul className="space-y-2 mt-2">
                                {todo.subtasks
                                    .filter(subtask => priorityFilter === 'all' || subtask.priority === priorityFilter)
                                    .map((subtask) => (
                                    <li key={subtask.id} className="p-3 border rounded-lg bg-white shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleToggleSubtask(subtask.id)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                                                        subtask.completed 
                                                            ? 'text-green-600 hover:text-green-700' 
                                                            : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                                >
                                                    <img 
                                                        src={checkMark} 
                                                        alt="Toggle completion"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                                <span className={`font-medium ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                                                    {subtask.title || "No Title"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm px-2 py-1 rounded ${
                                                    subtask.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {subtask.completed ? 'Completed' : 'In Progress'}
                                                </span>
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveSubtaskMenu(activeSubtaskMenu === subtask.id ? null : subtask.id);
                                                        }}
                                                        className="p-1 hover:bg-gray-100 rounded-full"
                                                    >
                                                        <img
                                                            src={optionsVertical}
                                                            alt="Options"
                                                            className="w-4 h-4"
                                                        />
                                                    </button>
                                                    {activeSubtaskMenu === subtask.id && (
                                                        <div
                                                            ref={menuRef}
                                                            className="absolute right-0 mt-1 py-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    setEditingSubtask(subtask);
                                                                    setActiveSubtaskMenu(null);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                            >
                                                                Edit Subtask
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSubtask(subtask.id)}
                                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete Subtask
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {subtask.description && (
                                            <p className="text-sm text-gray-600 mt-1">{subtask.description}</p>
                                        )}
                                        {subtask.notes && (
                                            <p className="text-sm text-gray-500 mt-1">Notes: {subtask.notes}</p>
                                        )}
                                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                            {subtask.priority && (
                                                <span className='capitalize'>Priority: {subtask.priority}</span>
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

            {/* Edit Subtask Modal */}
            <Modal
                isOpen={!!editingSubtask}
                onClose={() => setEditingSubtask(null)}
                title="Edit Subtask"
            >
                {editingSubtask && (
                    <NewSubtaskForm
                        initialData={editingSubtask}
                        onSubmit={handleEditSubtask}
                        onCancel={() => setEditingSubtask(null)}
                    />
                )}
            </Modal>
        </div>
    );
}
