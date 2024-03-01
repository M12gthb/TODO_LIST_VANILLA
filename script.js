const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-Button");

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
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if(inputIsValid) {
        return inputElement.classList.remove("error")
    }
}

inputElement.addEventListener("change", () => handleInputChange())

addTaskButton.addEventListener("click", (e) =>{ 
    e.preventDefault()
    handleAddTask()
})