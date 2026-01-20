function showForm(formType) {
            // Ocultar todos los formularios
            document.querySelectorAll('.form-content').forEach(form => {
                form.classList.remove('active');
            });
            
            // Desactivar todas las pestañas
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Mostrar el formulario seleccionado
            document.getElementById(formType).classList.add('active');
            
            // Activar la pestaña correspondiente
            event.target.classList.add('active');
}