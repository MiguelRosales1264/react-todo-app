import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import Button from '../components/ui/Button';
import FormSkeleton from '../components/ui/FormSkeleton';

export default function NewTask() {
    const { todos, loading, createTodo, removeTodo } = useTodos();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [timeEstimate, setTimeEstimate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskInput, setSubtaskInput] = useState('');

    // Add subtask
    const handleAddSubtask = () => {
        if (!subtaskInput.trim()) return;
        const newSubtask = {
            id: `st_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
            title: subtaskInput.trim(),
            description: '',
            status: 'not_started',
            completed: false,
            priority: 'medium',
            estimatedTime: null,
            notes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setSubtasks([...subtasks, newSubtask]);
        setSubtaskInput('');
    };
    // Remove subtask
    const handleRemoveSubtask = (idx) => {
        setSubtasks(subtasks.filter((_, i) => i !== idx));
    };

    // Add new todo
    const handleAddTask = async () => {
        if (!name.trim()) return;
        try {
            await createTodo({
                name,
                category,
                timeEstimate: Number(timeEstimate),
                dueDate: dueDate ? new Date(dueDate) : null,
                scheduledTime: scheduledTime
                    ? new Date(`${dueDate}T${scheduledTime}`)
                    : null,
                description,
                subtasks,
            });
            setName('');
            setCategory('');
            setTimeEstimate('');
            setDueDate('');
            setScheduledTime('');
            setDescription('');
            setSubtasks([]);
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    // Remove todo
    const handleRemoveTask = async (id) => {
        try {
            await removeTodo(id);
        } catch (error) {
            console.error('Failed to remove todo:', error);
        }
    };

    if (loading) {
        return (
            <div className="p-4 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
                <FormSkeleton />
            </div>
        );
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
            <div className="space-y-4 bg-white p-4 rounded shadow">
                <div>
                    <label className="block font-medium">Task Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Task name"
                    />
                </div>
                <div>
                    <label className="block font-medium">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Category (e.g. Work, Personal)"
                    />
                </div>
                <div>
                    <label className="block font-medium">
                        Time Estimate (minutes)
                    </label>
                    <input
                        type="number"
                        value={timeEstimate}
                        onChange={(e) => setTimeEstimate(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="e.g. 30"
                        min="1"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-medium">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                
                                if (selectedDate >= today) {
                                    setDueDate(e.target.value);
                                    // Clear scheduled time if date changes
                                    if (e.target.value !== dueDate) {
                                        setScheduledTime('');
                                    }
                                } else {
                                    alert("Please select today or a future date");
                                }
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-medium">
                            Scheduled Time
                        </label>
                        <input
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => {
                                const selectedTime = e.target.value;
                                const now = new Date();
                                const currentTime = now.toTimeString().slice(0, 5); // Get current time in HH:mm format
                                const selectedDate = new Date(dueDate);
                                
                                // If it's today's date, validate the time
                                if (selectedDate.toDateString() === now.toDateString() && selectedTime <= currentTime) {
                                    alert("Please select a future time for today's tasks");
                                    return;
                                }
                                
                                setScheduledTime(selectedTime);
                            }}
                            className="border p-2 w-full rounded"
                            disabled={!dueDate} // Disable if no date is selected
                            min={dueDate === new Date().toISOString().split('T')[0] ? 
                                new Date().toTimeString().slice(0, 5) : // If today, set min to current time
                                undefined} // If future date, no min time
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Description (optional)"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block font-medium">Subtasks</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={subtaskInput}
                            onChange={(e) => setSubtaskInput(e.target.value)}
                            className="border p-2 flex-1 rounded"
                            placeholder="Add subtask"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSubtask();
                                }
                            }}
                        />
                        <Button
                            onClick={handleAddSubtask}
                            className="bg-blue-500 text-white px-3 py-2 rounded"
                        >
                            + Add
                        </Button>
                    </div>
                    <ul className="space-y-1">
                        {subtasks.map((st, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="flex-1">{st.name}</span>
                                <Button
                                    onClick={() => handleRemoveSubtask(idx)}
                                    variant="danger"
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <Button
                    onClick={handleAddTask}
                    className="px-4 py-2 rounded w-full mt-2 font-semibold"
                    variant="primary"
                >
                    + Create Task
                </Button>
            </div>
        </div>
    );
}
