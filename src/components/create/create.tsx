import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ConfirmButton, CreateContainer, CreateDiv, CreateLabel, CreateToDo } from "../../styles/styles"

export const Create = () => {

    const navigate = useNavigate()
    const [toDo, setToDo] = useState<string>("")

    const handleSave = () => {
        if (toDo) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const toDoToSend = {
                    description: toDo
                }
                axios.post("http://localhost:8080/create",
                    toDoToSend,
                    config
                )
                navigate("/")
            } catch (error) {
                console.log(error)
            }
            navigate("/")
        }
    }

    return (
        <CreateDiv>
            <h2>Edit To Do</h2>
            <CreateContainer>
                <CreateLabel>Description: <CreateToDo type="text" value={toDo} onChange={event => setToDo(event.target.value)} /></CreateLabel>
                <ConfirmButton onClick={handleSave}>save</ConfirmButton>
            </CreateContainer>
        </CreateDiv>
    )
}