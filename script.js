const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-Button");
const taskContainer = document.querySelector(".task-container")

const validateInput = () => inputElement.value.trim().length > 0;
// if(inputElement.value.trim().length > 0) {
//     return true
// }
// else{
//     return false
// } igual valor a return inputElement.value.trim().length > 0

    
const handleAddTask = () => {
    const insValidInput = validateInput()

    if(!insValidInput){
      return  inputElement.classList.add("error")
    }

    const taskItemContainer = document.createElement("div")
    taskItemContainer.classList.add("task-item")

    const taskContent = document.createElement("p")
    taskContent.innerText = inputElement.value

    taskContent.addEventListener("click", (e) => {
        e.preventDefault()
         handleClick(taskContent)
    })

    const deleteItem = document.createElement("i")
    deleteItem.classList.add("fa-solid")
    deleteItem.classList.add("fa-trash-can")

    deleteItem.addEventListener("click", (e) => {
        e.preventDefault()
         handleDeleteClick(taskItemContainer, taskContent)
    })

    taskItemContainer.append(taskContent,deleteItem)

    taskContainer.appendChild(taskItemContainer)

    inputElement.value = ""
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if(inputIsValid) {
        return inputElement.classList.remove("error")
    }
}

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes
    
    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked){
            task.firstChild.classList.toggle("completed")
        }
    }
  
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked){
            taskItemContainer.remove()
        }
    }
}

inputElement.addEventListener("change", () => handleInputChange())

addTaskButton.addEventListener("click", (e) =>{ 
    e.preventDefault()
    handleAddTask()
})