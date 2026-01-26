<?php
session_start();
require_once '../config/database.php';
require_once '../functions/transacciones.php';
require_once '../functions/categorias.php';

// Verificar login
if (!isset($_SESSION['usuario_id'])) {
    header('Location: ../login.php');
    exit();
}

$usuario_id = $_SESSION['usuario_id'];

$estadisticas = obtenerEstadisticasMes($usuario_id);
$transacciones = obtenerTransacciones($usuario_id, 5);
$gastosPorCategoria = obtenerGastosPorCategoria($usuario_id); 

?> 

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Gestor de Presupuesto</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../assets/css/overview.css">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/zzz.png">
</head>
<body>
    <header class="header">
        <div class="header-left">
            <h1>Gestor de Presupuesto</h1>
            <p>Controla tus finanzas personales</p>
        </div>
        <button class="btn-primary">
            <span>+</span>
            Nueva Transacción
        </button>
    </header>

    <div class="container">
        <!-- Tarjetas de estadísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Ingresos</span>
                    <div class="stat-icon icon-green">📈</div>
                </div>
                <div class="stat-amount amount-green">4300.00 €</div>
                <div class="stat-label">Total del mes</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Gastos</span>
                    <div class="stat-icon icon-red">📉</div>
                </div>
                <div class="stat-amount amount-red">1695.00 €</div>
                <div class="stat-label">Total del mes</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Balance</span>
                    <div class="stat-icon icon-blue">💰</div>
                </div>
                <div class="stat-amount amount-blue">2605.00 €</div>
                <div class="stat-label">Saldo disponible</div>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="charts-grid">
            <div class="chart-card">
                <h3 class="chart-title">Evolución de Ingresos y Gastos</h3>
                <canvas id="lineChart"></canvas>
            </div>

            <div class="chart-card">
                <h3 class="chart-title">Gastos por Categoría</h3>
                <canvas id="pieChart"></canvas>
            </div>
        </div>

        <!-- Transacciones recientes -->
        <div class="transactions-section">
            <div class="section-header">
                <h3 class="chart-title">Transacciones Recientes</h3>
            </div>

            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon icon-green">💼</div>
                    <div class="transaction-info">
                        <h4>Salario mensual</h4>
                        <p>Salario • 31 dic 2025</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount amount-green">+3500.00 €</span>
                    <button class="btn-delete">🗑</button>
                </div>
            </div>

            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon icon-red">🏠</div>
                    <div class="transaction-info">
                        <h4>Alquiler</h4>
                        <p>Vivienda • 28 dic 2025</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount amount-red">-900.00 €</span>
                    <button class="btn-delete">🗑</button>
                </div>
            </div>

            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon icon-red">🛒</div>
                    <div class="transaction-info">
                        <h4>Supermercado</h4>
                        <p>Alimentación • 27 dic 2025</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount amount-red">-85.50 €</span>
                    <button class="btn-delete">🗑</button>
                </div>
            </div>

            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon icon-red">🚗</div>
                    <div class="transaction-info">
                        <h4>Gasolina</h4>
                        <p>Transporte • 25 dic 2025</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount amount-red">-65.00 €</span>
                    <button class="btn-delete">🗑</button>
                </div>
            </div>

            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon icon-green">💰</div>
                    <div class="transaction-info">
                        <h4>Freelance proyecto</h4>
                        <p>Salario • 20 dic 2025</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount amount-green">+800.00 €</span>
                    <button class="btn-delete">🗑</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/app.js"></script>
       
</body>
</html>