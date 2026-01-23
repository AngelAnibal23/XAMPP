<?php
include '../config/BDadministrator.php'; 

session_start(); 


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: ../pages/index.php');
  exit;
}

$usuario = trim($_POST['usuario']); 
$password =  $_POST['contraseña'];  


$sql = "SELECT id, usuario, password, email FROM usuarios WHERE usuario = ?"; 
$stmt = mysqli_prepare($connection, $sql); 
mysqli_stmt_bind_param($stmt, "s", $usuario); 
mysqli_stmt_execute($stmt);

$response = mysqli_stmt_get_result($stmt); 
$user = mysqli_fetch_assoc($response); 

if($user && password_verify($password, $user['password'])){
    $_SESSION['id_user'] = $user['id']; 
    $_SESSION['name_user'] = $user['usuario'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['logueado'] = true; 
        
    header('Location: ../pages/dashboard.php'); 
    exit(); 
}

$_SESSION['error'] = "Credenciales incorrectas";
$_SESSION['active_form'] = 'login';
header('Location: ../pages/index.php');

exit(); 


?>
