import axios from "axios"
import { useEffect, useState } from "react"
import { ToDoItem, ToDoUList, ToDoCompleted, EditButton, AddButton, ListContainer, CompleteDiv, ToDoDesc } from '../../styles/styles'
import { useNavigate } from "react-router-dom"

type ToDo = {
    Description: string
    Completed: boolean
}

export const ToDoList = () => {

    const navigate = useNavigate()
    const [toDoList, setToDoList] = useState<{ [key: string]: ToDo }>({})

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/todo-list");
                setToDoList(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const navigateTo = (url: string) => {
        navigate(url)
    }

    const renderList = () => {
        const ids = Object.keys(toDoList)
        if (ids.length > 0) {
            const items = ids.map((id: string) => {
                return (
                    <ToDoItem key={id}>
                        <ToDoDesc>{toDoList[id].Description}</ToDoDesc>
                        <CompleteDiv>
                            <label>Complete:
                                <ToDoCompleted type="checkbox" disabled checked={toDoList[id].Completed} />
                            </label>
                        </CompleteDiv>
                        <EditButton onClick={() => navigateTo(`/todo/${id}`)}>Edit</EditButton></ToDoItem>
                )
            })
            return items

        }
    }
    return (
        <ListContainer>
            <h2>To Do List</h2>
            <ToDoUList>{renderList()}</ToDoUList>
            <AddButton onClick={() => navigateTo(`/create`)}>Create</AddButton>
        </ListContainer>
    )
}