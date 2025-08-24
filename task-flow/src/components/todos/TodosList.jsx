import { useTodos } from '../../hooks/useTodos';
import TodoCard from './TodoCard';

export default function TodosList({ todos, className = '' }) {
    const { loading, updateTodo } = useTodos(); // Get updateTodo function

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!todos) {
        return null;
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

    const handleEdit = async (id) => {
        // Navigate to the task edit page or open edit modal
        window.location.href = `/task/${id}/edit`;
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (!confirmed) return;

        try {
            await updateTodo(id, { deleted: true });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleInProgress = async (id) => {
        try {
            await updateTodo(id, { status: 'in_progress' });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleReschedule = async (id) => {
        // For now, just set to tomorrow. In future, can add a date picker
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        try {
            await updateTodo(id, { dueDate: tomorrow });
        } catch (error) {
            console.error('Error rescheduling task:', error);
        }
    };

    return (
        <div className={`${className}`}>
            <div className="space-y-4">
                {todos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onToggleComplete={() => handleToggleComplete(todo.id)}
                        onEdit={() => handleEdit(todo.id)}
                        onDelete={() => handleDelete(todo.id)}
                        onInProgress={() => handleInProgress(todo.id)}
                        onReschedule={() => handleReschedule(todo.id)}
                    />
                ))}
            </div>
        </div>
    );
}
