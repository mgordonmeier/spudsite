import { useStore } from "./hooks/useStore";
import '../MApp.css'

export const Menu = () => {
    const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])

    return(
        <div className="menu rocksalt">
        <button onClick={() => saveWorld()} className="btn btn-success">Save</button>
        <button onClick={() => resetWorld()} className="btn btn-warning">Reset</button>
        </div>
    )
}