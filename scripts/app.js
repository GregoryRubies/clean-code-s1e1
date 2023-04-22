let 
  taskInput = document.getElementById("task-add-input"),
  addButton = document.querySelector(".task__add"),
  incompleteTaskHolder = document.querySelector(".task-list_incomplete"),
  completedTasksHolder = document.querySelector(".task-list_completed");

addButton.addEventListener("keyEnter", addTask);
addButton.addEventListener("click", addTask);

document.querySelectorAll(".task-list__item")
  .forEach(v => bindTaskEvents(
    v, v.classList.contains("task_incomplete") ? taskCompleted : taskIncomplete
  ));

function generateNewElement(tag, attributes = null, content = null){

  let element = document.createElement(tag);

  for(let attr in attributes){
    
    element.setAttribute(attr, attributes[attr]);
  }

  if(content){ 

    if(content.__proto__.constructor.name == "Array"){

      content.forEach(e => element.append(e));
    } else { 

      element.append(content);
    }
  }
  return element; 
}

function getNewTask(taskText){

  return generateNewElement(
    "li",
    {"class":"task-list__item task task_incomplete"}, 
    [
      generateNewElement("input", {"class":"task__check checkbox", "type": "checkbox"}),
      generateNewElement("label", {"class":"task__text label"}, taskText),
      generateNewElement("input", {"class":"task__input task__input_hidd text-input"}),
      generateNewElement("button", {"class":"task__edit text-button"}, "Edit"),
      generateNewElement(
        "button", 
        {"class":"task__del del-button"}, 
        generateNewElement("img", {"class":"del-button__img", "src":"./images/remove.svg", "alt":"delete button"})
      )
    ]
  );
}

function addTask() {

  if(!!taskInput.value){

    let task = getNewTask(taskInput.value);

    incompleteTaskHolder.append(task);
    bindTaskEvents(task, taskCompleted);
    taskInput.value = "";
  }
}

function editTask() {

  let 
    task = this.parentNode,
    taskInput = task.querySelector(".task__input"),
    taskText = task.querySelector(".task__text"),
    taskEdit = this,
    state = taskEdit.classList.contains("task__edit_on");

  if (state) {

    taskText.innerText = taskInput.value;
    taskEdit.innerText = "Edit";
  } else {

    taskInput.value = taskText.innerText;
    taskEdit.innerText = "Save";
  }

  taskText.classList.toggle("task__text_edit");
  taskInput.classList.toggle("task__input_hidd");
  taskEdit.classList.toggle("task__edit_on");
}

function deleteTask() {

  let 
    task = this.parentNode,
    taskList = task.parentNode;

  taskList.removeChild(task);
}

function taskCompleted() {

  let 
    task = this.parentNode
    taskText = task.querySelector(".task__text");

  completedTasksHolder.append(task);
  bindTaskEvents(task, taskIncomplete);
  this.classList.add("task__check_checked");
  task.classList.toggle("task_completed", "task_incomplete");
  taskText.classList.add("task__text_completed");
}

function taskIncomplete() {

  let 
    task = this.parentNode,
    taskText = task.querySelector(".task__text");

  incompleteTaskHolder.append(task);
  bindTaskEvents(task, taskCompleted);
  this.classList.remove("task__check_checked"); 
  task.classList.toggle("task_completed", "task_incomplete");
  taskText.classList.remove("task__text_completed");
}

function bindTaskEvents(task, checkBoxEventHandler) {

  let 
    checkBox = task.querySelector(".task__check"),
    editButton = task.querySelector(".task__edit"),
    deleteButton = task.querySelector(".task__del");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}