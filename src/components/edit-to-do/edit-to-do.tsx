import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToDoItem, ToDoCompleted, EditButton, ToDoUList, DeleteButton, ConfirmButton, ListContainer, CompleteLabel } from "../../styles/styles"

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

    if (id && toDo) {
        return (
            <ListContainer>
                <h2>Edit To Do</h2>
                <ToDoUList>
                    <ToDoItem key={id}>
                        <div>{toDo[id].Description}</div>
                        <div>
                            <CompleteLabel>Complete:
                                <ToDoCompleted type="checkbox" checked={complete} onChange={() => handleClick()} />
                            </CompleteLabel>
                        </div>
                        <DeleteButton onClick={() => deleteToDo()}>Delete</DeleteButton>
                    </ToDoItem></ToDoUList>
                <ConfirmButton onClick={handleSave}>save</ConfirmButton>
            </ListContainer>
        )
    } else {
        return <h2>Item doesn't exist</h2>
    }
}