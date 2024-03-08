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

    updateLocalStorage()
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
    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked){
            taskItemContainer.remove()
        }
    }
    updateLocalStorage()
}

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes

    const localStorageTask = [...tasks].map((task) => {
        const content = task.firstChild
        const isCompleted = content.classList.contains("completed")

        return {description: content.innerText, isCompleted: isCompleted}
    })

    localStorage.setItem("tasks", JSON.stringify(localStorageTask))
}

const refreshTaskUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))

    for(const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement("div")
        taskItemContainer.classList.add("task-item")
    
        const taskContent = document.createElement("p")
        taskContent.innerText = task.description

        if(task.isCompleted){
            taskContent.classList.add("completed")
        }
    
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
    }
}

refreshTaskUsingLocalStorage()

inputElement.addEventListener("change", () => handleInputChange())

addTaskButton.addEventListener("click", (e) =>{ 
    e.preventDefault()
    handleAddTask()
})