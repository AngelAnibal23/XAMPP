// ========== APLICAR TEMA INMEDIATAMENTE (ANTES DE QUE CARGUE EL DOM) ==========
(function() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    
    if (savedTheme === 'dark') {
        html.classList.add('dark-mode');
        if (document.body) {
            document.body.classList.add('dark-mode');
        }
    } else {
        html.classList.remove('dark-mode');
        if (document.body) {
            document.body.classList.remove('dark-mode');
        }
    }
})();

// ========== FUNCIONES DE TEMA ==========
function initTheme() {
    console.log('🎨 Inicializando tema...');
    
    const savedTheme = localStorage.getItem('theme');
    console.log('Tema guardado en localStorage:', savedTheme);
    
    const body = document.body;
    const html = document.documentElement;
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        html.classList.add('dark-mode');
        updateThemeIcon(true);
        console.log('✅ Tema oscuro aplicado');
    } else {
        body.classList.remove('dark-mode');
        html.classList.remove('dark-mode');
        updateThemeIcon(false);
        console.log('✅ Tema claro aplicado');
    }
}

function toggleTheme() {
    console.log('🔄 Cambiando tema...');
    
    const body = document.body;
    const html = document.documentElement;
    const isDark = body.classList.toggle('dark-mode');
    
    if (isDark) {
        html.classList.add('dark-mode');
    } else {
        html.classList.remove('dark-mode');
    }
    
    console.log('Nuevo tema:', isDark ? 'dark' : 'light');
    
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        console.log('💾 Tema guardado:', isDark ? 'dark' : 'light');
    } catch (e) {
        console.error('❌ Error al guardar tema:', e);
    }
    
    updateThemeIcon(isDark);
    setTimeout(updateChartsTheme, 100);
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        console.log('🔄 Icono actualizado:', isDark ? '☀️' : '🌙');
    }
}

// ========== GRÁFICOS ==========
const gastosPorCategoria = window.gastosPorCategoria || [];
let lineChart = null;
let pieChart = null;

function getChartColors() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        textColor: isDark ? '#e8eaed' : '#1e3a52',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        backgroundColor: isDark ? '#1e2329' : '#ffffff'
    };
}

// Gráfico de línea con interacción
function createOrUpdateLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;
    
    const colors = getChartColors();
    const ctx = canvas.getContext('2d');
    
    const evolucion = window.evolucionDatos || {
        labels: ['Sin datos'],
        ingresos: [0],
        gastos: [0]
    };
    
    // Destruir gráfico anterior si existe
    if (lineChart) {
        lineChart.destroy();
    }
    
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: evolucion.labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: evolucion.ingresos,
                    borderColor: '#5fd3bc',
                    backgroundColor: 'rgba(95, 211, 188, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#5fd3bc',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Gastos',
                    data: evolucion.gastos,
                    borderColor: '#ff7a59',
                    backgroundColor: 'rgba(255, 122, 89, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#ff7a59',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: colors.textColor,
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: colors.backgroundColor,
                    titleColor: colors.textColor,
                    bodyColor: colors.textColor,
                    borderColor: colors.gridColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'S/. ' + context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.textColor,
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return 'S/. ' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.textColor,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
    
    console.log('📊 Gráfico de línea creado/actualizado');
}

// Gráfico de torta con interacción
function createOrUpdatePieChart() {
    const canvas = document.getElementById('pieChart');
    if (!canvas || gastosPorCategoria.length === 0) {
        console.log('⚠️ No hay datos de categorías o canvas no encontrado');
        return;
    }
    
    const colors = getChartColors();
    const ctx = canvas.getContext('2d');
    
    const labels = gastosPorCategoria.map(item => item.categoria_nombre);
    const data = gastosPorCategoria.map(item => parseFloat(item.total));
    
    const backgroundColors = [
        '#4a90e2',
        '#ff7a59',
        '#5fd3bc',
        '#ffa500',
        '#9b59b6',
        '#3ec8a8',
        '#ff6b9d',
        '#45b7d1',
        '#f39c12',
        '#27ae60'
    ];
    
    // Destruir gráfico anterior si existe
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderWidth: 3,
                borderColor: colors.backgroundColor,
                hoverOffset: 10,
                hoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: colors.textColor,
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: colors.backgroundColor,
                    titleColor: colors.textColor,
                    bodyColor: colors.textColor,
                    borderColor: colors.gridColor,
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            label += 'S/. ' + value.toFixed(2) + ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
    
    console.log('📊 Gráfico de torta creado/actualizado');
}

function updateChartsTheme() {
    console.log('🎨 Actualizando tema de gráficos...');
    createOrUpdateLineChart();
    createOrUpdatePieChart();
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
    console.log('📄 DOM cargado completamente');
    console.log('Estado actual del body:', document.body.className);
    
    // Inicializar tema
    initTheme();
    
    // Crear gráficos
    createOrUpdateLineChart();
    createOrUpdatePieChart();
    
    // Agregar listener al botón de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log('✅ Event listener agregado al botón de tema');
    } else {
        console.error('❌ No se encontró el botón #themeToggle');
    }
    
    // Auto-ocultar mensajes después de 5 segundos
    const mensaje = document.querySelector('.mensaje');
    if (mensaje) {
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => mensaje.remove(), 300);
        }, 5000);
    }
    
    console.log('✅ Inicialización completa');
    console.log('📊 Datos de categorías:', gastosPorCategoria.length, 'categorías');
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

// ========== DEBUG ==========
function checkThemeStatus() {
    console.log('--- ESTADO DEL TEMA ---');
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
    console.log('Body tiene dark-mode:', document.body.classList.contains('dark-mode'));
    console.log('HTML tiene dark-mode:', document.documentElement.classList.contains('dark-mode'));
    console.log('Body classes:', document.body.className);
    console.log('---------------------');
}

window.checkThemeStatus = checkThemeStatus;