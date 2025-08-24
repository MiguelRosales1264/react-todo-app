import { Link } from 'react-router';
import Button from '../components/ui/Button';
import { useTodos } from '../hooks/useTodos';
import TodosList from '../components/todos/TodosList';

export default function TaskDashboard() {
    const { todos, loading } = useTodos();

    if (loading) return <div>Loading...</div>;

    // Filter for overdue tasks
    const overdueTasks = todos.filter((todo) => {
        if (!todo.dueDate || todo.completed) return false;
        const dueDate = new Date(todo.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
        return dueDate < today;
    });

    return (
        <div className="flex flex-col gap-6 p-4">
            <div>
                <h1 className="text-2xl font-bold">Task Dashboard</h1>
                <p>Stay organized and achieve your goals</p>
                <Link to="/new-task">
                    <Button variant="primary" className="mt-4">
                        + New Task
                    </Button>
                </Link>
            </div>

            {/* Overdue Tasks Section */}
            {overdueTasks.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-red-700 mb-3">
                        Overdue Tasks ({overdueTasks.length})
                    </h2>
                    <TodosList
                        todos={overdueTasks}
                        className="bg-white rounded-lg shadow-sm"
                    />
                </div>
            )}

            {/* All Tasks Section */}
            <div>
                <h2 className="text-lg font-semibold mb-3">All Tasks</h2>
                <TodosList todos={todos} />
            </div>
        </div>
    );
}
