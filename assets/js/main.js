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
