<?php
include 'BDadministrator.php'; 

session_start(); 


function checker($connection, $usuario, $email){
    $sql_check = "SELECT id FROM usuarios WHERE usuario = ? OR email = ?";
    $stmt_check = mysqli_prepare($connection, $sql_check);
    mysqli_stmt_bind_param($stmt_check, "ss", $usuario, $email);
    mysqli_stmt_execute($stmt_check);
    $result_check = mysqli_stmt_get_result($stmt_check);
        
    $exists = (mysqli_num_rows($result_check) > 0);
    mysqli_stmt_close($stmt_check); 
    
    return $exists;
       
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $usuario = $_POST['usuario']; 
    $email = $_POST['correo']; 
    $password =  $_POST['contraseña'];  

    if(!checker($connection, $usuario, $email)){
        $encrypted_pass = password_hash($password, PASSWORD_DEFAULT); 

        $sql = "INSERT INTO usuarios(usuario, email, password) VALUES (?,?,?)"; 
        $stmt = mysqli_prepare($connection, $sql); 
        mysqli_stmt_bind_param($stmt, "sss", $usuario, $email, $encrypted_pass); 

        if(mysqli_stmt_execute($stmt)){
            mysqli_stmt_close($stmt);
            mysqli_close($connection);

            $_SESSION['succes_msg'] = "Cuenta registrada exitosamente. ";  
            header('Location: index.html'); 
            exit();
        }else{
            $error = "Error al registrar: " . mysqli_error($connection); 
        }
        mysqli_stmt_close($stmt);
    }else{
        $error = "El usuario o correo ya está registrado";

    }


}

mysqli_close($connection);


echo "<br><br>"; 
echo "<a href='index.html'>Volver al formulario</a>";

?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Registro</title>
</head>
<body>
    <?php if(isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>

    
</body>
</html>