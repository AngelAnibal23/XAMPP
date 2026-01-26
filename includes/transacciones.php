<?php
require_once '../config/database.php';

// INSERTAR transacción
function agregarTransaccion($usuario_id, $categoria_id, $descripcion, $monto, $fecha) {
    global $connection;
    $sql = "INSERT INTO transacciones (usuario_id, categoria_id, descripcion, monto, fecha) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "iisds", $usuario_id, $categoria_id, $descripcion, $monto, $fecha);
    return mysqli_stmt_execute($stmt);
}

// OBTENER transacciones del usuario
function obtenerTransacciones($usuario_id, $limite = null) {
    global $connection;
    $sql = "SELECT t.*, c.nombre as categoria_nombre, c.tipo, c.icono 
            FROM transacciones t 
            INNER JOIN categorias c ON t.categoria_id = c.id 
            WHERE t.usuario_id = ? 
            ORDER BY t.fecha DESC, t.fecha_creacion DESC";
    
    if ($limite) {
        $sql .= " LIMIT ?";
    }
    
    $stmt = mysqli_prepare($connection, $sql);
    if ($limite) {
        mysqli_stmt_bind_param($stmt, "ii", $usuario_id, $limite);
    } else {
        mysqli_stmt_bind_param($stmt, "i", $usuario_id);
    }
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

// ELIMINAR transacción
function eliminarTransaccion($id, $usuario_id) {
    global $connection;
    $sql = "DELETE FROM transacciones WHERE id = ? AND usuario_id = ?";
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $id, $usuario_id);
    return mysqli_stmt_execute($stmt);
}

// OBTENER estadísticas del mes
function obtenerEstadisticasMes($usuario_id, $mes = null, $año = null) {
    global $connection;
    
    if (!$mes) $mes = date('m');
    if (!$año) $año = date('Y');
    
    $sql = "SELECT 
                SUM(CASE WHEN c.tipo = 'ingreso' THEN t.monto ELSE 0 END) as total_ingresos,
                SUM(CASE WHEN c.tipo = 'gasto' THEN t.monto ELSE 0 END) as total_gastos
            FROM transacciones t
            INNER JOIN categorias c ON t.categoria_id = c.id
            WHERE t.usuario_id = ? 
            AND MONTH(t.fecha) = ? 
            AND YEAR(t.fecha) = ?";
    
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "iii", $usuario_id, $mes, $año);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultado = mysqli_fetch_assoc($result);
    
    return [
        'ingresos' => $resultado['total_ingresos'] ?? 0,
        'gastos' => $resultado['total_gastos'] ?? 0,
        'balance' => ($resultado['total_ingresos'] ?? 0) - ($resultado['total_gastos'] ?? 0)
    ];
}

// OBTENER gastos por categoría
function obtenerGastosPorCategoria($usuario_id, $mes = null, $año = null) {
    global $connection;
    
    if (!$mes) $mes = date('m');
    if (!$año) $año = date('Y');
    
    $sql = "SELECT c.nombre, c.icono, SUM(t.monto) as total
            FROM transacciones t
            INNER JOIN categorias c ON t.categoria_id = c.id
            WHERE t.usuario_id = ? 
            AND c.tipo = 'gasto'
            AND MONTH(t.fecha) = ? 
            AND YEAR(t.fecha) = ?
            GROUP BY c.id
            ORDER BY total DESC";
    
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "iii", $usuario_id, $mes, $año);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}
?>