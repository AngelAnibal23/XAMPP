<?php
require_once '../config/BDadministrator.php';

// OBTENER categorías (default + personalizadas del usuario)
function obtenerCategorias($usuario_id, $tipo = null) {
    global $connection;
    $sql = "SELECT * FROM categorias 
            WHERE (usuario_id IS NULL OR usuario_id = ?)";
    
    if ($tipo) {
        $sql .= " AND tipo = ?";
    }
    
    $sql .= " ORDER BY nombre ASC";
    
    $stmt = mysqli_prepare($connection, $sql);
    if ($tipo) {
        mysqli_stmt_bind_param($stmt, "is", $usuario_id, $tipo);
    } else {
        mysqli_stmt_bind_param($stmt, "i", $usuario_id);
    }
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

// AGREGAR categoría personalizada
function agregarCategoria($usuario_id, $nombre, $tipo, $icono = '📝') {
    global $connection;
    $sql = "INSERT INTO categorias (nombre, tipo, icono, usuario_id) 
            VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "sssi", $nombre, $tipo, $icono, $usuario_id);
    return mysqli_stmt_execute($stmt);
}

// ELIMINAR categoría
function eliminarCategoria($id, $usuario_id) {
    global $connection;
    $sql = "DELETE FROM categorias 
            WHERE id = ? AND (usuario_id = ? OR usuario_id IS NULL)";
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $id, $usuario_id);
    return mysqli_stmt_execute($stmt);
}
?>