import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToDoItem, ToDoCompleted, EditButton, ToDoUList, DeleteButton } from "../../styles/styles"

type ToDo = {
    Description: string
    Completed: boolean
}

export const EditToDo = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [toDo, setToDo] = useState<{ [key: string]: ToDo }>()
    const [complete, setComplete] = useState<boolean>(false)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/todo?id=${id}`);
                setToDo(response.data)
                setComplete(response.data[id!].Completed)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleClick = () => {
        setComplete(!complete)
    }

    const handleSave = () => {
        if (toDo && id) {
            if (complete !== toDo[id].Completed) {
                try {
                    axios.put(`http://localhost:8080/update?id=${id}`)
                    navigate("/")
                } catch (error) {
                    console.log(error)
                }
            }
            navigate("/")
        }
    }

    const deleteToDo = () => {
        if (id) {
            try {
                axios.delete(`http://localhost:8080/remove?id=${id}`)
                navigate("/")
            } catch (error) {
                console.log(error)
            }
            navigate("/")
        }
    }

    const renderList = () => {
        const ids = Object.keys(toDo ?? "0")
        if (ids.length > 0 && toDo) {
            const items = ids.map((id: string) => {
                return (
                    <ToDoItem key={id}>
                        <div>{toDo[id].Description}</div>
                        <div>
                            <label>Complete:
                                <ToDoCompleted type="checkbox" checked={complete} onClick={() => handleClick()} />
                            </label>
                        </div>
                        <DeleteButton onClick={() => deleteToDo()}>Delete</DeleteButton>
                    </ToDoItem>
                )
            })
            return items

        }
    }
    if (id && toDo) {
        return (
            <div>
                <h2>Edit To Do</h2>
                <ToDoUList>
                    <ToDoItem key={id}>
                        <div>{toDo[id].Description}</div>
                        <div>
                            <label>Complete:
                                <ToDoCompleted type="checkbox" checked={complete} onClick={() => handleClick()} />
                            </label>
                        </div>
                        <DeleteButton onClick={() => deleteToDo()}>Delete</DeleteButton>
                    </ToDoItem></ToDoUList>
                <button onClick={handleSave}>save</button>
            </div>
        )
    } else {
        return <h2>Item doesn't exist</h2>
    }
}