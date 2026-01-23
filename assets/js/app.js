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

// AGREGAR ESTE CÓDIGO NUEVO:
// Detectar cuando vuelves a la página (con botón atrás)
window.addEventListener('pageshow', function(event) {
    // Si la página viene del cache (botón atrás)
    if (event.persisted) {
        // Limpiar todos los formularios
        document.querySelectorAll('form').forEach(form => {
            form.reset();
        });
    }
});

// Limpiar formularios cuando se carga la página normalmente
window.addEventListener('load', function() {
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });
});