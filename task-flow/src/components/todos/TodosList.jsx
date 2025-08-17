import { useTodos } from '../../hooks/useTodos';
import { Link } from 'react-router';
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
                <h2 className="text-xl font-semibold mb-4">Your Tasks ({todos.length})</h2>
                <section className="space-y-4">
                    {todos.map(todo => (
                        <div 
                            key={todo.id}
                            className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                            {/* Top Section: Title, Category, and Actions */}
                            <div className="flex items-start justify-between w-full mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                    {/* Checkbox */}
                                    <Button 
                                        variant="icon" 
                                        className="-ml-1.5 text-gray-400 hover:text-gray-600"
                                        ariaLabel="Mark task complete"
                                    >
                                        <img src={checkMark} alt="" className="w-6 h-6" />
                                    </Button>

                                    {/* Title and Category */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-medium text-gray-900 truncate">
                                            {todo.name}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Chip color="blue">
                                                {todo.category || 'No Category'}
                                            </Chip>
                                            <span className="text-sm text-gray-500">
                                                {todo.timeEstimate} min
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Menu */}
                                <Button 
                                    variant="icon"
                                    className="text-gray-400 hover:text-gray-600"
                                    ariaLabel="More options"
                                >
                                    <img src={optionsVertical} alt="" className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Bottom Section: Due Date, Progress, etc */}
                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">
                                        Due {todo.dueDate?.toLocaleDateString()}
                                    </span>
                                    {todo.scheduledTime && (
                                        <span className="text-sm text-gray-500">
                                            @ {todo.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Progress Indicator (if there are subtasks) */}
                                {todo.subtasks && todo.subtasks.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                                            <div 
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ 
                                                    width: `${(todo.subtasks.filter(st => st.completed).length / todo.subtasks.length) * 100}%` 
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {todo.subtasks.filter(st => st.completed).length}/{todo.subtasks.length}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Focus Session Button */}
                            <div className="mt-4 flex justify-end">
                                <Link to={`/focus-session/${todo.id}`}>
                                    <Button
                                        variant="primary"
                                        className="flex items-center gap-2"
                                    >
                                        Start Focus Session
                                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}