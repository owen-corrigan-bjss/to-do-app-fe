import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddButton, CheckMark, CompleteDiv, EditButton, ListContainer, ToDoDesc, ToDoItem, ToDoUList } from '../../styles/styles'

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

    const completeStatus = (id: string) => {
        if (toDoList[id].Completed) {
            return (
                <a title="Emoji One, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Eo_circle_green_checkmark.svg"><CheckMark width="25px" alt="Eo circle green checkmark" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/512px-Eo_circle_green_checkmark.svg.png?20200417132424" /></a>  
            )
        } else {
            return (
               "To Do"
            )
        }
    }

    const renderList = () => {
        const ids = Object.keys(toDoList)
        if (ids.length > 0) {
            const items = ids.map((id: string) => {
                return (
                    <ToDoItem key={id}>
                        <ToDoDesc>{toDoList[id].Description}</ToDoDesc>
                        <CompleteDiv> Complete: {completeStatus(id)}</CompleteDiv>
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