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