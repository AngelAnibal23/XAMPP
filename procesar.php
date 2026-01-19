<?php
include 'BDadministrator.php'; 

$usuario = mysqli_real_escape_string($connection, $_POST['usuario']); 
$email = mysqli_real_escape_string($connection, $_POST['correo']); 
$password =  $_POST['contraseña'];  

$encrypted_pass = password_hash($password, PASSWORD_DEFAULT)


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Document</title>
</head>
<body>
    
</body>
</html>