import { Link } from "react-router";
import Button from "../components/ui/Button";
import { useTodos } from "../hooks/useTodos";
import TodoList from "../components/todos/TodosList";

export default function TaskDashboard() {
    const { todos, loading } = useTodos();

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-4 p-2">
            <div>
                <h1 className="text-2xl font-bold">Task Dashboard</h1>
                <p>Stay organized and achieve your goals</p>
                <Link to="/new-task">
                    <Button variant="primary" className="mt-4">
                        + New Task
                    </Button>
                </Link>
            </div>
            <div>
                <TodoList todos={todos}/>
            </div>
        </div>
    );
}