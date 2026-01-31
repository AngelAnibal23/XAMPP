<?php
session_start(); 
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/zzz.png">

    <title>Money Organizer</title>
</head>
<body>
    <header class="hero">
    <h1 class="tittle">GESTOR DE PRESUPUESTO PERSONAL</h1>
    
    
    <div class="tabs">
        <button class="tab <?= (!isset($_SESSION['active_form']) || $_SESSION['active_form'] === 'login') ? 'active' : '' ?>" onclick="showForm('login')">Iniciar Sesión</button>
        <button class="tab <?= (isset($_SESSION['active_form']) && $_SESSION['active_form'] === 'signup') ? 'active' : '' ?>" onclick="showForm('signup')">Registrarse</button>
    </div>
    </header>

    <div class="container">
    <?php if (isset($_SESSION["error"])): ?>
    <div style="
        background: #ffe5e5;
        color: #900;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 15px;
        text-align: center;
    ">
    <?= $_SESSION["error"] ?>
    </div>
    <?php unset($_SESSION["error"]); ?>
    <?php endif; ?>

    <?php if (isset($_SESSION["success"])): ?>
    <div style="
        background: #e6fff0;
        color: #064;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 15px;
        text-align: center;
    ">
    <?= $_SESSION["success"] ?>
    </div>
    <?php unset($_SESSION["success"]); ?>
    <?php endif; ?>
    
    <div id="login" class="form-content <?= (!isset($_SESSION['active_form']) || $_SESSION['active_form'] === 'login') ? 'active' : '' ?>">
        <div class="form-tittle">Iniciar Sesión</div>
        <p class="form-subtittle">Accede a tu cuenta</p>
        <form action="../auth/login.php" method="POST" autocomplete="off">
            <label for="usuario">Usuario: </label>
            <input type="text" name="usuario" id="usuario" autocomplete="off">
            
            <br><br>

            <label for="contraseña">Contraseña</label>
            <input type="password" name="contraseña" id="contraseña" autocomplete="off">

            <br><br>
            <button type="submit">Enviar</button>
        </form>
    </div>

    <div id="signup" class="form-content <?= (isset($_SESSION['active_form']) && $_SESSION['active_form'] === 'signup') ? 'active' : '' ?>">
        <div class="form-tittle">Crear cuenta</div>
        <p class="form-subtittle">Registra tu cuenta para tu gestor personal!</p>
        
        <form action="../auth/register.php" method="POST" autocomplete="off">
            <label for="usuario">Usuario: </label>
            <input type="text" name="usuario" id="usuario" autocomplete="off">
            
            <br><br>

            <label for="correo">Correo: </label>
            <input type="email" name="correo" id="correo" autocomplete="off">
            
            <br><br>

            <label for="contraseña">Contraseña</label>
            <input type="password" name="contraseña" id="contraseña" autocomplete="off">

            <br><br>
            <button type="submit">Enviar</button>
        </form>

    </div>
    
    <?php 

    unset($_SESSION['active_form']); 
    ?>
    </div>
    <script src="../assets/js/main.js"></script>
</body>
</html>