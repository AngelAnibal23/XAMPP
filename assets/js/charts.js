// ================== CONFIG GLOBAL (NITIDEZ) ==================
Chart.defaults.devicePixelRatio = 2;

// ================== VARIABLES ==================
let lineChart = null;
let pieChart = null;

const gastosPorCategoria = window.gastosPorCategoria || [];

// ================== COLORES SEGÚN TEMA ==================
function getChartColors() {
    const isDark = document.body.classList.contains('dark-mode');

    return {
        text: isDark ? '#e8eaed' : '#1e3a52',
        grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        background: isDark ? '#1e2329' : '#ffffff',
        tooltipBg: isDark ? '#2a2f36' : '#ffffff'
    };
}

// ================== LINE CHART ==================
function createOrUpdateLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;

    const c = getChartColors();

    const evolucion = window.evolucionDatos || {
        labels: ['31 dic', '04 ene', '06 ene', '09 ene', '11 ene', '14 ene', '17 ene', '19 ene'],
        ingresos: [3600, 100, 50, 200, 150, 100, 300, 800],
        gastos: [900, 85, 65, 120, 45, 230, 150, 100]
    };

    // ✅ SI YA EXISTE, SOLO ACTUALIZA COLORES (NO OPTIONS COMPLETO)
    if (lineChart) {
        lineChart.options.plugins.legend.labels.color = c.text;
        lineChart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
        lineChart.options.plugins.tooltip.titleColor = c.text;
        lineChart.options.plugins.tooltip.bodyColor = c.text;
        lineChart.options.plugins.tooltip.borderColor = c.grid;
        lineChart.options.scales.x.ticks.color = c.text;
        lineChart.options.scales.y.ticks.color = c.text;
        lineChart.options.scales.y.grid.color = c.grid;
        
        lineChart.update();
        return; // ✅ IMPORTANTE: RETURN AQUÍ
    }

    // ✅ CREAR GRÁFICO POR PRIMERA VEZ
    const ctx = canvas.getContext('2d');
    
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: evolucion.labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: evolucion.ingresos,
                    borderColor: '#3ec8a8',
                    backgroundColor: 'rgba(62, 200, 168, 0.15)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#3ec8a8',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Gastos',
                    data: evolucion.gastos,
                    borderColor: '#ff5e3a',
                    backgroundColor: 'rgba(255, 94, 58, 0.15)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#ff5e3a',
                    pointBorderColor: '#ffffff',
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
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: c.text,
                        padding: 15,
                        usePointStyle: false,
                        font: {
                            size: 13,
                            weight: '600'
                        }
                    }
                    // ✅ NO TOCAR onClick - Chart.js lo maneja automáticamente
                },
                tooltip: {
                    backgroundColor: c.tooltipBg,
                    titleColor: c.text,
                    bodyColor: c.text,
                    borderColor: c.grid,
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label(ctx) {
                            return `${ctx.dataset.label}: S/. ${ctx.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: c.text,
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: c.grid,
                        drawBorder: false
                    },
                    ticks: {
                        color: c.text,
                        callback: v => 'S/. ' + v
                    }
                }
            }
        }
    });
}

// ================== PIE / DOUGHNUT ==================
function createOrUpdatePieChart() {
    const canvas = document.getElementById('pieChart');
    if (!canvas) return;

    const c = getChartColors();

    const labels = gastosPorCategoria.length
        ? gastosPorCategoria.map(i => i.categoria_nombre ?? 'Sin categoría')
        : ['Vivienda', 'Alimentación', 'Shopping', 'Servicios', 'Transporte', 'Entretenimiento', 'Salud'];

    const data = gastosPorCategoria.length
        ? gastosPorCategoria.map(i => Number(i.total))
        : [53, 15, 11, 8, 7, 4, 3];

    // ✅ SI YA EXISTE, SOLO ACTUALIZA COLORES
    if (pieChart) {
        pieChart.options.plugins.legend.labels.color = c.text;
        pieChart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
        pieChart.options.plugins.tooltip.titleColor = c.text;
        pieChart.options.plugins.tooltip.bodyColor = c.text;
        pieChart.options.plugins.tooltip.borderColor = c.grid;
        pieChart.data.datasets[0].borderColor = c.background;
        
        pieChart.update();
        return; // ✅ IMPORTANTE: RETURN AQUÍ
    }

    // ✅ CREAR GRÁFICO POR PRIMERA VEZ
    const ctx = canvas.getContext('2d');
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
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
                borderColor: c.background,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: c.text,
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: c.tooltipBg,
                    titleColor: c.text,
                    bodyColor: c.text,
                    borderColor: c.grid,
                    borderWidth: 1
                }
            }
        }
    });
}

// ================== UPDATE POR CAMBIO DE TEMA ==================
function updateChartsTheme() {
    createOrUpdateLineChart();
    createOrUpdatePieChart();
}