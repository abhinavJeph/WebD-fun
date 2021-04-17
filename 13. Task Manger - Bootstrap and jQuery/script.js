const btnAdd = $("#btnAdd");
const btnReset = $("#btnReset");
const btnSort = $("#btnSort");
const btnCleanTasks = $("#btnCleanTasks");

const ulTaskList = $("#ulTaskList");
const inpNewTask = $("#inpNewTask");

function addTask() {
  if (inpNewTask.val() === "") return;
  //Create li element
  var li = $("<li>", {
    class: "list-group-item",
    text: inpNewTask.val(),
  });
  li.css("cursor", "pointer");
  inpNewTask.val("");
  /* Different method to create li element
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerText = inpNewTask.val();
  Add in list
  */
  li.click((e) => {
    li.toggleClass("done");
    if (li.hasClass("done")) console.log("Task Done");
    else console.log("Task Not Done");
  });
  ulTaskList.append(li);
  toggleDisable();
  console.log("New Task Added");
}

function resetTask() {
  console.log("Task Reseted");
  inpNewTask.val("");
  toggleDisable();
}

function clearDone() {
  $(ulTaskList).find(".done").remove();
  console.log("Cleared done tasks");
  toggleDisable();
}

function sortTasks() {
  // can do either way
  // $(ulTaskList).children(".done").appendTo(ulTaskList);
  $("#ulTaskList .done").appendTo(ulTaskList);
  console.log("Tasks sorted");
}

function toggleDisable() {
  let inpIsEmpty = inpNewTask.val() == "";
  let listIsEmpty = ulTaskList.children().length == 0;
  btnAdd.prop("disabled", inpIsEmpty);
  btnReset.prop("disabled", inpIsEmpty);
  btnSort.prop("disabled", listIsEmpty);
  btnCleanTasks.prop("disabled", listIsEmpty);
}

// Add Element when press 'Enter'
$(inpNewTask).keypress((e) => {
  if (e.which == 13) {
    addTask();
  }
});

// Add Elemtent when click Add icon
btnAdd.click(addTask);

//  Reseting the new Task input when clicked on Reset btn
btnReset.click(resetTask);

// clrear the tasks which are done
btnCleanTasks.click(clearDone);

btnSort.click(sortTasks);

inpNewTask.on("input", toggleDisable);
