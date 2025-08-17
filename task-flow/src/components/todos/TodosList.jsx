import { useTodos } from '../../hooks/useTodos';
import Chip from '../ui/Chip';
import optionsVertical from '../../assets/svg/options-vertical.svg';
import checkMark from '../../assets/svg/check-mark-circle.svg';
import Button from '../ui/Button';

export default function TodosList() {
    const { todos, loading } = useTodos();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
                <p className="mt-2 text-3xl font-bold">{todos.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Due Today</h3>
                <p className="mt-2 text-3xl font-bold">
                    {todos.filter(todo => {
                    const today = new Date();
                    return todo.dueDate?.toDateString() === today.toDateString();
                    }).length}
                </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                <p className="mt-2 text-3xl font-bold">
                    {todos.filter(todo => todo.completed).length}
                </p>
                </div>
            </section>

            {/* All Tasks */}
            <div>
                <h2 className="text-xl font-semibold">Your Tasks ({todos.length}):</h2>
                <section>
                    <div className="flex items-start justify-between bg-white rounded-lg shadow p-3 mb-4">
                        {/* Add TodoList component here later */}
                        <div className="space-y-2">
                            <div>
                                <Button className="flex items-center gap-2 text-gray-500 hover:text-gray-700" variant="icon">
                                    <img src={checkMark} alt="Check Mark" className="w-4 h-4" />
                                </Button>
                            </div>
                            <div>
                                {todos
                                .map(todo => (
                                    <div 
                                    key={todo.id} 
                                    className="flex flex-col gap-1 items-center justify-between rounded-md"
                                    >
                                        <span>{todo.name}</span>
                                        <Chip type='category'>Work</Chip>
                                        <span className="text-sm text-gray-500">
                                            {todo.timeEstimate} min
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Button className="flex items-center gap-2 text-gray-500 hover:text-gray-700" variant="icon">
                                <img src={optionsVertical} alt="Options" className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}