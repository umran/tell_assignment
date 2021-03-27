import { useRecoilState } from "recoil"
import { todoFilterState } from "./atoms"

const filters = [
    "All",
    "Completed",
    "Active"
]

const TodoFilter = () => {
    const [filter, setFilter] = useRecoilState(todoFilterState)

    const onFilterChange = f => {
        setFilter(f)
    }

    return (
        <div className="flex justify-center space-x-8">
            {filters.map(f => <button key={f} className={`px-3 py-2 rounded-sm ${filter === f ? "border-red-600 border-2" : ""}`} onClick={() => onFilterChange(f)} >{f}</button>)}
        </div>
    )
}

export default TodoFilter