import { useParams } from "react-router"
import { useTodo } from "../hooks/useTodo";

export default function FocusSession() {
    const { todoId } = useParams();
    const { todo, loading, error } = useTodo(todoId);
    console.log(todo);

    if (loading) { return <div>Loading...</div>; };

    return (

        <div>
            <h1 className="text-2xl font-bold">Focus Session</h1>
            <p>Stay focused and productive</p>
        </div>
    );
}
