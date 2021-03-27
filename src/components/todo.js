import { useCallback } from "react"
import { useSetRecoilState } from "recoil"
import { todoState } from "./atoms"
import { replaceItemWithId, removeItemWithId } from "./utils"

const Todo = ({ todo }) => {
    const { id } = todo
    const setTodos = useSetRecoilState(todoState)
    
    const toggleTodoComplete = useCallback(() => {
        setTodos(old => {
            const previous = old.filter(item => item.id == id)[0]
            const newTodos = replaceItemWithId(old, id, {
                ...previous,
                completed: !previous.completed
            })
            return newTodos
        })
    }, [id])

    const removeTodo = useCallback(() => {
        setTodos(old => removeItemWithId(old, id))
    }, [id])

    return (
        <div className="flex justify-between shadow-md p-8">
            <div className="flex space-x-2">
                <button
                    className={`flex justify-center items-center rounded-full p-2 h-8 w-8 border-2 ${todo.completed ? "border-red-600" : "border-gray-600"}`}
                    onClick={toggleTodoComplete}
                >
                    {todo.completed &&
                        <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    }
                </button>
                <span className="ml-2 text-lg text-gray-800">
                    {todo.title}
                </span>
            </div>
            <div className="">
                <button className="flex justify-center items-center rounded-full p-2 h-8 w-8" onClick={removeTodo}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Todo