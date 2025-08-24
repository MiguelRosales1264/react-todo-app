import { Link } from 'react-router';
import Button from '../components/ui/Button';
import { useTodos } from '../hooks/useTodos';
import TodosList from '../components/todos/TodosList';
import TaskCardSkeleton from '../components/todos/TaskCardSkeleton';
import dashboardIcon from '../assets/svg/dashboard.svg';

export default function TaskDashboard() {
    const { todos, loading } = useTodos();

    if (loading) {
        return (
            <div className="flex flex-col gap-6 p-4 animate-fade-in">
                <div>
                    <h1 className="text-2xl font-bold">Task Dashboard</h1>
                    <p>Stay organized and achieve your goals</p>
                    <div className="mt-4">
                        <Button variant="primary" disabled>
                            + New Task
                        </Button>
                    </div>
                </div>

                {/* Loading state for tasks */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">All Tasks</h2>
                    <div className="space-y-4">
                        <TaskCardSkeleton />
                        <TaskCardSkeleton />
                        <TaskCardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // Filter tasks
    const overdueTasks = todos.filter((todo) => {
        if (!todo.dueDate || todo.completed) return false;
        const dueDate = new Date(todo.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
        return dueDate < today;
    });

    const completedTasks = todos.filter((todo) => todo.completed);
    const activeTasks = todos.filter((todo) => !todo.completed);

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

            {/* Active Tasks Section */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Active Tasks</h2>
                {activeTasks.length > 0 ? (
                    <TodosList todos={activeTasks} />
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <img
                            src={dashboardIcon}
                            alt=""
                            className="w-24 h-24 mx-auto mb-4 text-gray-400"
                        />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                        <p className="text-gray-600 mb-4">
                            Get started by creating your first task!
                        </p>
                        <Link to="/new-task">
                            <Button variant="primary">
                                Create Task
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-600 mb-3">
                        Completed Tasks ({completedTasks.length})
                    </h2>
                    <TodosList todos={completedTasks} />
                </div>
            )}
        </div>
    );
}
