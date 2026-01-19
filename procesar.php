<?php
include 'BDadministrator.php'; 

$usuario = mysqli_real_escape_string($connection, $_POST['usuario']); 
$email = mysqli_real_escape_string($connection, $_POST['correo']); 
$password =  $_POST['contraseña'];  

$encrypted_pass = password_hash($password, PASSWORD_DEFAULT); 

$sql = "INSERT INTO usuarios(usuario, password, email)
        VALUES('$usuario', '$email', '$encrypted_pass')"; 

$response = mysqli_query($connection, $sql);

if(!$response) echo "Error al ejecutar la query" .  mysqli_error($conexion); 
else echo "Datos ingresados correctamente a la BD"; 


mysqli_close($connection);

echo "<br><br>"; 
echo "<a href='index.html'>Volver al formulario</a>";

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>TRY</title>
</head>
<body>
    
</body>
</html>