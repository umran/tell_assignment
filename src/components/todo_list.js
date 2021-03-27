import { useState, useCallback, useEffect } from "react"
import { useSetRecoilState, useRecoilValue, selector, useRecoilCallback } from "recoil"
import { fetchTodos } from "./network"
import { todoState, todoFilterState } from "./atoms"
import Todo from "./todo"
import TodoFilter from "./todo_filter"

const todosURL = "https://jsonplaceholder.typicode.com/todos"

const filteredTodosSelector = selector({
    key: "filteredTodosSelector",
    get: ({ get }) => {
        const allTodos = get(todoState)
        const filter = get(todoFilterState)

        switch (filter) {
            case "Completed":
                return allTodos.filter(todo => todo.completed === true)
            case "Active":
                return allTodos.filter(todo => todo.completed === false)
            default:
                return allTodos
        }
    }
})

const todoStatsSelector = selector({
    key: "todoStatsSelector",
    get: ({ get }) => {
        const allTodos = get(todoState)
        const totalCompleted = allTodos.filter(todo => todo.completed === true).length
        const totalActive = allTodos.filter(todo => todo.completed === false).length

        return {
            totalCompleted,
            totalActive
        }
    }
})

const TodoList = () => {
    const todos = useRecoilValue(filteredTodosSelector)
    const todoStats = useRecoilValue(todoStatsSelector)
    const setTodos = useSetRecoilState(todoState)

    const [newTodo, setNewTodo] = useState("")
    
    const populateTodos = useRecoilCallback(({ set }) => async () => {
        const defaultTodos = await fetchTodos(todosURL)
        set(todoState, defaultTodos.slice(0, 10))
    }, [])

    const onAddTodo = useCallback((e) => {
        e.preventDefault()

        setTodos(old => [
            ...old,
            {
                userId: 1,
                id: old.length > 0 ? old[old.length-1].id + 1 : 1,
                title: newTodo,
                completed: false
            }
        ])

        setNewTodo("")
    }, [newTodo])

    const onClearCompleted = useCallback(() => {
        setTodos(old => old.filter(todo => todo.completed === false))
    }, [])

    return (
        <div className="flex flex-col p-8 shadow-md">
            {todos.length > 0 &&
                <div className="space-y-4">
                    {todos.map((todo, index) => (
                        <Todo key={todo.id} todo={todo} index={index} />
                    ))}
                </div>
            }
            <form className="w-full mt-4 mb-4" onSubmit={onAddTodo}>
                <input
                    className="w-full p-4 shadow-md"
                    value={newTodo}
                    placeholder="What needs to be done?"
                    onChange={({target: {value}}) => setNewTodo(value)}
                />
            </form>

            <div className="flex justify-between items-center">
                <div className="text-base text-gray-800">
                    {`${todoStats.totalActive} items left`}
                </div>
                <TodoFilter />
                { todoStats.totalCompleted > 0 &&
                    <button onClick={onClearCompleted} className="text-base">
                        Clear Completed
                    </button>
                }
            </div>

            <button className="mt-8 px-3 py-2 bg-blue-300 rounded-sm" onClick={populateTodos}>Fetch Todos from External Source</button>
        </div>
    )
}

export default TodoList