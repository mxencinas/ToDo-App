// Selecciones
const taskInput = document.getElementById("task-input");
const createBtn = document.getElementById("create-btn");
const taskList = document.getElementById("task-list");

const STORAGE_KEY = "mi_todo_app_tasks_v1";

// Cargar tareas desde localStorage (si existen)
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Renderizar todas las tareas
function renderTasks() {
  taskList.innerHTML = ""; // limpiar
  // ordenar por creación (opcional): aquí dejo tal cual
  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}

// Crear el elemento DOM de una tarea
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = task.id;

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!task.completed;
  checkbox.className = "task-checkbox";
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    // para que el estilo se actualice
    span.classList.toggle("completed", task.completed);
  });

  // texto (span)
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;
  if (task.completed) span.classList.add("completed");

  // Botón editar
  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.className = "btn btn-edit";
  editBtn.addEventListener("click", () => startEdit(task, span, li, editBtn));

  // Botón eliminar
  const delBtn = document.createElement("button");
  delBtn.textContent = "Eliminar";
  delBtn.className = "btn btn-delete";
  delBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  return li;
}

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Crear nueva tarea (desde input)
function createTaskFromInput() {
  const text = taskInput.value.trim();
  if (!text) return; // no crear tareas vacías
  const newTask = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks();
  taskList.appendChild(createTaskElement(newTask));
  taskInput.value = "";
  taskInput.focus();
}

// Editar (in-place): transforma span en input + Guardar/Cancelar
function startEdit(task, span, li, editBtn) {
  const originalText = task.text;

  // Crear input de edición
  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-edit-input";
  input.value = originalText;

  // Crear botones guardar/cancelar
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "✔️";
  saveBtn.className = "btn btn-save";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌";
  cancelBtn.className = "btn btn-cancel";

  // Reemplazar span por el input
  li.replaceChild(input, span);
  
  // --- CAMBIO AQUÍ: Ocultar el botón editar en lugar de solo deshabilitarlo ---
  editBtn.style.display = "none"; 
  // --------------------------------------------------------------------------

  input.focus();

  // Guardar con Enter o cancelar con Escape
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  });

  function saveEdit() {
    const newText = input.value.trim();
    if (!newText) {
      alert("La tarea no puede quedar vacía.");
      input.focus();
      return;
    }
    task.text = newText;
    saveTasks();
    
    // reconstruir span y reemplazar
    span.textContent = newText;
    li.replaceChild(span, input);
    
    // --- CAMBIO AQUÍ: Volver a mostrar el botón editar ---
    editBtn.style.display = ""; 
    // -----------------------------------------------------

    // quitar botones temporales
    if (saveBtn.parentElement) saveBtn.remove();
    if (cancelBtn.parentElement) cancelBtn.remove();
  }

  function cancelEdit() {
    // restaurar span original
    li.replaceChild(span, input);
    
    // --- CAMBIO AQUÍ: Volver a mostrar el botón editar ---
    editBtn.style.display = ""; 
    // -----------------------------------------------------

    if (saveBtn.parentElement) saveBtn.remove();
    if (cancelBtn.parentElement) cancelBtn.remove();
  }

  // Eventos de botones temporales
  saveBtn.addEventListener("click", saveEdit);
  cancelBtn.addEventListener("click", cancelEdit);

  // Insertar los botones donde estaba el botón de editar (antes de él o después, 
  // como está oculto no importa mucho el orden visual, pero insertamos antes del botón eliminar)
  // Nota: Al usar insertBefore sobre el nextSibling del editBtn, mantenemos la posición.
  li.insertBefore(saveBtn, editBtn.nextSibling);
  li.insertBefore(cancelBtn, saveBtn.nextSibling);
}

// Eventos: click en Crear
createBtn.addEventListener("click", createTaskFromInput);

// Eventos: Enter en input
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") createTaskFromInput();
});

// Inicializar
renderTasks();
