import { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
    // la Primera vez podria regresar un arreglo vacio
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {
        // el resultado de la función init serán los datos iniciacles de todos
    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }

        dispatch(action)
    }

    const handleToggleTodo = (id) => {
        console.log(id);
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch(action)
    }

    const todosCount = todos.length;

    const pewndingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        todos,
        todosCount,
        pewndingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }


}
