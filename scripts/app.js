let 
  taskInput = document.getElementById("task-add-input"),
  addButton = document.querySelector(".task__add"),
  incompleteTaskHolder = document.querySelector(".incomplete"),
  completedTasksHolder = document.querySelector(".completed");


let ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTaskHolder ul list items
//for each list item
//for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
 // bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
//}

//cycle over completedTasksHolder ul list items 
//for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
//  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
//}

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
    {"class":"task-list__item task"}, 
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
  console.log("Add Task...");

  if (!taskInput.value) return;
  let listItem = getNewTask(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {

  let 
    listItem = this.parentNode,
    editInput = listItem.querySelector("input[type='text']"),
    label = listItem.querySelector("label"),
    editBtn = listItem.querySelector(".edit"),
    containsClass = listItem.classList.contains("task_edit-mode");
  //If class of the parent is .task_edit-mode
  if (containsClass) {

    //switch to .task_edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .task_edit-mode on the parent.
  listItem.classList.toggle("task_edit-mode");
}

function deleteTask() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);

}
function taskCompleted() {
  console.log("Complete Task...");

  //Append the task list item to the .completed
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}
function taskIncomplete() {
  console.log("Incomplete Task...");

  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {

  let 
    checkBox = taskListItem.querySelector("input[type=checkbox]"),
    editButton = taskListItem.querySelector("button.edit"),
    deleteButton = taskListItem.querySelector(".del-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}