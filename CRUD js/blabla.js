document.addEventListener('DOMContentLoaded', () => { //Cuando el HTML carga por completo, esto hace que se ejecute Javascript
   
    const form = document.getElementById('user-form'); //Definimos variable para identificar el el elemento user-form

    const userList = document.getElementById('user-list');//Definimos variable para identificar el el elemento user-list
    
    let users = [];
    let editingUserId = null; // Variable para rastrear si estamos editando un usuario

    // Función de manejo de envío del formulario (Agregar o Editar)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const status = document.getElementById('user-status').value;

        if (name && email) {
            if (editingUserId === null) {
                // Si no estamos editando, agregar un nuevo usuario
                const user = { id: Date.now(), name, email, status };
                users.push(user);
            } else {
                // Si estamos editando, actualizar el usuario existente
                const user = users.find(user => user.id === editingUserId);
                user.name = name;
                user.email = email;
                user.status = status;
                editingUserId = null; // Restablecer el modo edición
                form.querySelector('button').textContent = 'Agregar Usuario'; // Cambiar el texto del botón
            }

            renderUsers();
            form.reset();
        }
    });

    // Función para manejar los clicks en la lista (Editar, Eliminar o Cambiar Estado)
    userList.addEventListener('click', (e) => {
        const id = e.target.parentElement.parentElement.dataset.id;

        if (e.target.classList.contains('delete-button')) {
            users = users.filter(user => user.id != id);
            renderUsers();
        } else if (e.target.classList.contains('edit-button')) {
            const user = users.find(user => user.id == id);
            
            // Rellenar el formulario con los datos del usuario para editar
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-status').value = user.status;

            editingUserId = user.id; // Guardar el ID del usuario que estamos editando
            form.querySelector('button').textContent = 'Actualizar Usuario'; // Cambiar el texto del botón a "Actualizar"
        } else if (e.target.classList.contains('status-button')) {
            // Cambiar estado de Activo a Inactivo o viceversa
            const user = users.find(user => user.id == id);
            user.status = user.status === 'Activo' ? 'Inactivo' : 'Activo';
            renderUsers();
        }
    });

    // Función para renderizar los usuarios en la tabla
    const renderUsers = () => {
        userList.innerHTML = '';
        users.forEach(user => {
            userList.innerHTML += `
                <tr data-id="${user.id}">
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.status}</td>
                    <td class="actions">
                        <button class="edit-button">Editar</button>
                        <button class="delete-button">Eliminar</button>
                        <button class="status-button">${user.status === 'Activo' ? 'Marcar Inactivo' : 'Marcar Activo'}</button>
                    </td>
                </tr>
            `;
        });
    };
});
