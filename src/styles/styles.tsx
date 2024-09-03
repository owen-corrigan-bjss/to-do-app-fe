import styled from "styled-components"

export const ToDoItem = styled.li<{}>`
display: flex;
flex-direction: row;
justify-content: space-evenly;
height: 40px;
`
export const ToDoUList = styled.ul<{}>`
font-size: 1.5rem;
font-weight: 300;
display: flex;
width: 800px;
flex-direction: column;
list-style-type: none;
`
export const ToDoCompleted = styled.input<{}>`
color: green
`

export const EditButton = styled.button<{}>`
font-size: 1.5rem;
background-color: #86BBD8;
color: white
`

export const DeleteButton = styled.button<{}>`
font-size: 1.5rem;
background-color: #BF0603;
color: white
`

export const ConfirmButton = styled.button<{}>`
font-size: 1.5rem;
height: 46px;
background-color: #90A959;
color: white;
`

export const AddButton = styled.button<{}>`
font-size: 1.5rem;
height: 40px;
background-color: #90A959;
color: white;
width: 200px;
`

export const ListContainer = styled.div<{}>`
display: flex;
flex-direction: column;
align-items: center
`

export const CreateToDo = styled.input<{}>`
height: 40px;
width: 600px;
`

export const CreateLabel = styled.label<{}>`
font-size: 1.5rem;
`

export const CreateContainer = styled.div<{}>`
height: 60px;
display: flex;
flex-direction: row;
align-items: center;
`

export const CreateDiv= styled.div<{}>`
display: flex;
flex-direction: column;
align-items: center;
`

export const ToDoDesc= styled.div<{}>`
width: 40%;
`

export const CompleteDiv= styled.div<{}>`
width: 40%;
`