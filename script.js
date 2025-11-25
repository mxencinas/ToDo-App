const taskContainer = document.getElementById("task-container")
//const lbl = document.getElementById("lbl");

const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.className = "task-input";
    taskInput.placeholder = "Tarea";

const btnCrear = document.createElement("button");
btnCrear.textContent = "Crear"
btnCrear.addEventListener("click", (e) => {
    taskContainer.appendChild(createTask(taskInput.value));
    taskInput.value = "";
})

taskContainer.appendChild(taskInput);
taskContainer.appendChild(btnCrear);


function createTask(tarea){
    // Crear el elemento <li> principal
    const itemTask = document.createElement("li");

    // Crear el checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    // Crear elemento de texto
    const spanTask = document.createElement('span');
    spanTask.textContent = tarea;
    spanTask.className = 'task-text';

    // 4. Crear el botón de editar
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar';
    btnEditar.onclick = function() {
      itemTask.contentEditable("input")
    };

    // 5. Crear el botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.onclick = function() {
        itemTask.remove();
    };

    // 6. Añadir los elementos al <li> en el orden deseado
    itemTask.appendChild(checkbox);
    itemTask.appendChild(spanTask);
    itemTask.appendChild(btnEditar);
    itemTask.appendChild(btnEliminar);

    return itemTask;
}