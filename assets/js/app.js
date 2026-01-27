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


//DASHBOARD

 // Gráfico de líneas
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['31 dic', '04 ene', '06 ene', '09 ene', '11 ene', '14 ene', '17 ene', '19 ene'],
                datasets: [{
                    label: 'Ingresos',
                    data: [3600, 100, 50, 200, 150, 100, 300, 800],
                    borderColor: '#3ec8a8',
                    backgroundColor: 'rgba(62, 200, 168, 0.15)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#3ec8a8',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }, {
                    label: 'Gastos',
                    data: [900, 85, 65, 120, 45, 230, 150, 100],
                    borderColor: '#ff5e3a',
                    backgroundColor: 'rgba(255, 94, 58, 0.15)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#ff5e3a',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 13,
                                weight: 600
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Gráfico de pastel
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Vivienda', 'Alimentación', 'Shopping', 'Servicios', 'Transporte', 'Entretenimiento', 'Salud'],
                datasets: [{
                    data: [53, 15, 11, 8, 7, 4, 3],
                    backgroundColor: [
                        '#4a90e2',
                        '#ff7a59',
                        '#5fd3bc',
                        '#f5a623',
                        '#7b68ee',
                        '#50c878',
                        '#ff6b9d'
                    ],
                    borderWidth: 4,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                weight: 500
                            }
                        }
                    }
                }
            }
        });

function initTheme() {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Actualizar icono
    updateThemeIcon(isDark);
    
    // Animación suave
    body.style.transition = 'all 0.3s ease';
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    }
}

// ========== GRÁFICOS ==========
const gastosPorCategoria = window.gastosPorCategoria || [];

// Configuración de colores para Chart.js según el tema
function getChartColors() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        textColor: isDark ? '#e8eaed' : '#1e3a52',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        backgroundColor: isDark ? '#1e2329' : '#ffffff'
    };
}

// Gráfico de línea
if (document.getElementById('lineChart')) {
    const colors = getChartColors();
    
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['31 dic', '04 ene', '06 ene', '09 ene', '11 ene', '14 ene', '17 ene', '19 ene'],
            datasets: [
                {
                    label: 'Ingresos',
                    data: [1000, 0, 0, 0, 0, 0, 0, 1000],
                    borderColor: '#5fd3bc',
                    backgroundColor: 'rgba(95, 211, 188, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Gastos',
                    data: [1000, 100, 50, 80, 120, 90, 110, 500],
                    borderColor: '#ff7a59',
                    backgroundColor: 'rgba(255, 122, 89, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: colors.textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor
                    },
                    ticks: {
                        color: colors.textColor
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.textColor
                    }
                }
            }
        }
    });
}

// Gráfico de torta
if (document.getElementById('pieChart') && gastosPorCategoria.length > 0) {
    const colors = getChartColors();
    
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    const labels = gastosPorCategoria.map(item => item.categoria_nombre);
    const data = gastosPorCategoria.map(item => item.total);
    
    const backgroundColors = [
        '#4a90e2',
        '#ff7a59',
        '#5fd3bc',
        '#ffa500',
        '#9b59b6',
        '#3ec8a8',
        '#ff6b9d'
    ];
    
    new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: colors.backgroundColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: colors.textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        }
    });
}

// ========== MODAL ==========
function abrirModal() {
    document.getElementById('modalTransaccion').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalTransaccion').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modalTransaccion');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initTheme();
    
    // Auto-ocultar mensajes después de 5 segundos
    const mensaje = document.querySelector('.mensaje');
    if (mensaje) {
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => mensaje.remove(), 300);
        }, 5000);
    }
});

// Animación de salida para mensajes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);