<?php
include 'BDadministrator.php'; 

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $usuario = $_POST['usuario']; 
    $email = $_POST['correo']; 
    $password =  $_POST['contraseña'];  

    $encrypted_pass = password_hash($password, PASSWORD_DEFAULT); 

    //CREO MI PLANTILLA 
    $sql = "INSERT INTO usuarios(usuario, password, email)
            VALUES (?,?,?)"; 

    //LE AVISO A MYSQL QUE LE LLEGARA UNA QUERY
    $stmt = mysqli_prepare($connection, $sql); 

    mysqli_stmt_bind_param($stmt, "sss", $usuario, $encrypted_pass, $email); 



    $response = mysqli_stmt_execute($stmt);


    if(!$response) echo "Error al ejecutar la query" .  mysqli_error($conexion); 
    else echo "Datos ingresados correctamente a la BD"; 
}


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