const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

btn.addEventListener("click", addtask);
function addtask() {
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter the task");
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = task;

  const del = document.createElement("button");
  del.innerText = "🗑️";
  del.style.padding = "5px";
  del.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(del);

  list.appendChild(li);
  input.value = "";
}
