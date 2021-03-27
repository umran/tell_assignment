import { RecoilRoot } from "recoil"
import Todos from "./components/todo_list"

function App() {
  return (
    <RecoilRoot>
      <Todos />
    </RecoilRoot>
  )
}

export default App
