<?php
include 'BDadministrator.php'; 

session_start(); 

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $usuario = $_POST['usuario']; 
    $password =  $_POST['contraseña'];  

    //CREO MI PLANTILLA 
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
        
        header('Location: dashboard.php'); 
        exit(); 
    }
    else{
       $error = "Credenciales incorrectas, asegurese de ingresarlas correctamente. "; 
    }

    mysqli_stmt_close($stmt);
}


mysqli_close($connection);


?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <?php if(isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    
    <form method="POST" action="">
        <label>Usuario:</label>
        <input type="text" name="usuario" required>
        
        <label>Contraseña:</label>
        <input type="password" name="contraseña" required>
        
        <button type="submit">Iniciar Sesión</button>
    </form>
</body>
</html>
