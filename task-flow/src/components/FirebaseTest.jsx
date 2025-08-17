import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export default function FirebaseTest() {
    const { todos, loading, createTodo, removeTodo } = useTodos();
    const [testName, setTestName] = useState('');

    // Function to handle adding a test todo
    const handleAddTest = async () => {
        if (!testName.trim()) return;

        try {
            await createTodo({
                name: testName,
                category: 'Personal',
                timeEstimate: 30,
                dueDate: new Date(),
                scheduledTime: null,
            });
            setTestName('');
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    // Function to handle removing a test todo
    const handleRemoveTest = async (id) => {
        try {
            await removeTodo(id);
        } catch (error) {
            console.error('Failed to remove todo:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2>Firebase Test</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Test todo name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddTest}
                    className="bg-blue-500 text-white p-2"
                >
                    Add Test Todo
                </button>
            </div>
            <div>
                <h3>Todos ({todos.length}):</h3>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex flex-col md:flex-row gap-4 justify-between border p-2 mb-2"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-semibold">
                                {todo.name} - {todo.category}
                            </div>
                            <div className="text-sm text-gray-500">
                                {todo.timeEstimate} mins - Due:{' '}
                                {new Date(todo.dueDate).toLocaleDateString()}
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveTest(todo.id)}
                            className="bg-red-500 text-white p-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
