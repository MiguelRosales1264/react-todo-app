import { useTodos } from '../../hooks/useTodos';
import TodoCard from './TodoCard';

export default function TodosList() {
    const { todos, loading } = useTodos();

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleToggleComplete = (id) => {
        // TODO: Implement toggle complete
        console.log('Toggle complete:', id);
    };

    const handleOptionsClick = (id) => {
        // TODO: Implement options menu
        console.log('Options clicked:', id);
    };

    return (
        <>
            <div className="space-y-6">
                {/* Quick Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">
                            Total Tasks
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {todos.length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">
                            Due Today
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {
                                todos.filter((todo) => {
                                    const today = new Date();
                                    return (
                                        todo.dueDate?.toDateString() ===
                                        today.toDateString()
                                    );
                                }).length
                            }
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">
                            Completed
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {todos.filter((todo) => todo.completed).length}
                        </p>
                    </div>
                </section>

                {/* All Tasks */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Your Tasks ({todos.length})
                    </h2>
                    <div className="space-y-4">
                        {todos.map((todo) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onToggleComplete={(id) => {
                                    // TODO: Implement toggle complete
                                    console.log('Toggle complete:', id);
                                }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
