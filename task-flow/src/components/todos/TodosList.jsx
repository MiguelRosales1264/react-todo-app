import { useTodos } from '../../hooks/useTodos';
import TodoCard from './TodoCard';

export default function TodosList() {
    const { todos, loading, updateTodo } = useTodos(); // Get all hooks at once

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const handleToggleComplete = async (id) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        
        try {
            await updateTodo(id, {
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date() : null
            });
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
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

                {/* Active Tasks */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Active Tasks ({todos.filter(todo => !todo.completed).length})
                    </h2>
                    <div className="space-y-4">
                        {todos
                            .filter(todo => !todo.completed)
                            .map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ))}
                        {todos.filter(todo => !todo.completed).length === 0 && (
                            <p className="text-gray-500 text-center py-4">No active tasks</p>
                        )}
                    </div>
                </section>

                {/* Completed Tasks */}
                <section className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-600">
                        Completed Tasks ({todos.filter(todo => todo.completed).length})
                    </h2>
                    <div className="space-y-4">
                        {todos
                            .filter(todo => todo.completed)
                            .map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ))}
                        {todos.filter(todo => todo.completed).length === 0 && (
                            <p className="text-gray-500 text-center py-4">No completed tasks</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
