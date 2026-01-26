<?php
session_start();
require_once '../config/BDadministrator.php';
require_once '../includes/transacciones.php';


// Verificar que el usuario esté logueado
if (!isset($_SESSION['id_user'])) {
    header('Location: ../pages/dashboard.php');

}

$usuario_id = $_SESSION['id_user'];
$accion = $_POST['accion'] ?? '';


switch ($accion) {
    case 'agregar':
        $categoria_id = $_POST['categoria_id'];
        $descripcion = $_POST['descripcion'];
        $monto = $_POST['monto'];
        $fecha = $_POST['fecha'];
        
        agregarTransaccion($usuario_id, $categoria_id, $descripcion, $monto, $fecha);
        header('Location: ../pages/dashboard.php?msg=agregado');
        break;
        
    case 'eliminar':
        $id = $_POST['id'];
        eliminarTransaccion($id, $usuario_id);
        header('Location: ../pages/dashboard.php?msg=eliminado');
        break;
        
    default:
        header('Location: ../pages/dashboard.php?msg=error');
}
?>