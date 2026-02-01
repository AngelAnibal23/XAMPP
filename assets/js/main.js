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


// ========== LOGOUT ==========

function cerrarSesion() {
    if(confirm('¿Seguro que quieres cerrar sesión?')) {
        window.location.href = '../auth/logout.php';
    }
}

// ========== MODAL ==========
function abrirModal() {
    document.getElementById('modalTransaccion').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalTransaccion').style.display = 'none';
}

window.onclick = function (e) {
    const modal = document.getElementById('modalTransaccion');
    if (e.target === modal) modal.style.display = 'none';
};

// ========== DOM ==========
document.addEventListener('DOMContentLoaded', () => {

    initTheme();                // theme.js
    createOrUpdateLineChart();  // charts.js
    createOrUpdatePieChart();   // charts.js

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const mensaje = document.querySelector('.mensaje');
    if (mensaje) {
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => mensaje.remove(), 300);
        }, 5000);
    }
});

// ========== ANIMACIÓN ==========
const style = document.createElement('style');
style.textContent = `
@keyframes slideOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-20px); }
}`;
document.head.appendChild(style);
