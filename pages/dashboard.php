<?php
session_start();
require_once '../config/BDadministrator.php';
require_once '../includes/transacciones.php';
require_once '../includes/categorias.php';

// Verificar login
if (!isset($_SESSION['id_user'])) {
    header('Location: ../pages/index.php');
    exit();
}

$usuario_id = $_SESSION['id_user'];

$estadisticas = obtenerEstadisticasMes($usuario_id);
$transacciones = obtenerTransacciones($usuario_id, 5);
$gastosPorCategoria = obtenerGastosPorCategoria($usuario_id); 
$categorias = obtenerCategorias($usuario_id);

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
        <button class="btn-primary" onclick="abrirModal()">
            <span>+</span>
            Nueva Transacción
        </button>
    </header>

    <div class="container">
        <?php if (isset($_GET['msg'])): ?>
            <div class="mensaje">
                <?php 
                    switch($_GET['msg']) {
                        case 'agregado': echo '✓ Transacción agregada correctamente'; break;
                        case 'eliminado': echo '✓ Transacción eliminada correctamente'; break;
                        case 'error': echo '✗ Error al procesar la transacción'; break;
                    }
                ?>
            </div>
        <?php endif; ?>
        <!-- Tarjetas de estadísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Ingresos</span>
                    <div class="stat-icon icon-green">📈</div>
                </div>
                <div class="stat-amount amount-green"><?php echo number_format($estadisticas['ingresos'], 2); ?> €</div>
                <div class="stat-label">Total del mes</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Gastos</span>
                    <div class="stat-icon icon-red">📉</div>
                </div>
                <div class="stat-amount amount-red"><?php echo number_format($estadisticas['gastos'], 2); ?> €</div>
                <div class="stat-label">Total del mes</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Balance</span>
                    <div class="stat-icon icon-blue">💰</div>
                </div>
                <div class="stat-amount amount-blue"><?php echo number_format($estadisticas['balance'], 2); ?> €</div>
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

            <?php if (empty($transacciones)): ?>
                <p style="text-align: center; padding: 20px; color: #666;">No hay transacciones registradas</p>
            <?php else: ?>
                <?php foreach ($transacciones as $trans): ?>
                    <div class="transaction-item">
                        <div class="transaction-left">
                            <div class="transaction-icon <?php echo $trans['tipo'] == 'ingreso' ? 'icon-green' : 'icon-red'; ?>">
                                <?php echo $trans['icono']; ?>
                            </div>
                            <div class="transaction-info">
                                <h4><?php echo htmlspecialchars($trans['descripcion']); ?></h4>
                                <p><?php echo htmlspecialchars($trans['categoria_nombre']); ?> • <?php echo date('d M Y', strtotime($trans['fecha'])); ?></p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <span class="transaction-amount <?php echo $trans['tipo'] == 'ingreso' ? 'amount-green' : 'amount-red'; ?>">
                                <?php echo $trans['tipo'] == 'ingreso' ? '+' : '-'; ?><?php echo number_format($trans['monto'], 2); ?> €
                            </span>
                            <form method="POST" action="../actions/procesar_transaccion.php" style="display: inline; margin: 0;">
                                <input type="hidden" name="accion" value="eliminar">
                                <input type="hidden" name="id" value="<?php echo $trans['id']; ?>">
                                <button type="submit" class="btn-delete" onclick="return confirm('¿Eliminar esta transacción?')">🗑</button>
                            </form>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>

    <!-- Modal para nueva transacción -->
    <div id="modalTransaccion" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Nueva Transacción</h2>
                <span class="close" onclick="cerrarModal()">&times;</span>
            </div>
            
            <form method="POST" action="../actions/procesar_transaccion.php">
                <input type="hidden" name="accion" value="agregar">
                
                <div class="form-group">
                    <label>Categoría *</label>
                    <select name="categoria_id" required>
                        <option value="">Selecciona una categoría</option>
                        <?php foreach ($categorias as $cat): ?>
                            <option value="<?php echo $cat['id']; ?>">
                                <?php echo $cat['icono'] . ' ' . $cat['nombre'] . ' (' . ucfirst($cat['tipo']) . ')'; ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label>Descripción *</label>
                    <input type="text" name="descripcion" placeholder="Ej: Compra en supermercado" required>
                </div>

                <div class="form-group">
                    <label>Monto (€) *</label>
                    <input type="number" name="monto" step="0.01" placeholder="0.00" required>
                </div>

                <div class="form-group">
                    <label>Fecha *</label>
                    <input type="date" name="fecha" value="<?php echo date('Y-m-d'); ?>" required>
                </div>

                <button type="submit" class="btn-submit">Guardar Transacción</button>
            </form>
        </div>
    </div>

    <script>
        const gastosPorCategoria = <?php echo json_encode($gastosPorCategoria); ?>;
        
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
    </script>
    
    <script src="../assets/js/app.js"></script>
</body>
</html>