import { useParams } from "react-router"
import { useTodo } from "../hooks/useTodo";

export default function FocusSession() {
    const { todoId } = useParams();
    const { todo, loading, error } = useTodo(todoId);
    console.log(todo);

    if (loading) { return <div>Loading...</div>; };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Focus Session</h1>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {todo ? (
                <div>
                    <h2 className="text-xl font-semibold">{todo.name}</h2>
                    <p className="mt-2">{todo.description}</p>
                    <p className="mt-2">Due Date: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}</p>
                    {/* <p className="mt-2">Scheduled Time: {todo.scheduledTime ? todo.scheduledTime : 'No scheduled time'}</p> */}
                    <p className="mt-2">Category: {todo.category}</p>
                    <p className="mt-2">Time Estimate: {todo.timeEstimate} minutes</p>
                    <p className="mt-2">Completed: {todo.completed ? 'Yes' : 'No'}</p>
                    <p className="mt-2">Created At: {new Date(todo.createdAt).toLocaleString()}</p>
                    
                    {/* // subtasks */}
                    {todo.subtasks && todo.subtasks.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Subtasks</h3>
                            <ul className="list-disc pl-5">
                                {todo.subtasks.map((subtask, index) => (
                                    <li key={index} className="mt-1">
                                        {subtask.name} - {subtask.completed ? 'Completed' : 'Not Completed'}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Add more details as needed */}
                </div>
            ) : (
                <div>No todo found.</div>
            )}
        </div>
    );
}
