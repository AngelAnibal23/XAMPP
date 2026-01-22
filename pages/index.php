<?php
session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <title>Money Organizer</title>
</head>
<body>
    <header class="hero">
    <h1 class="tittle">GESTOR DE PRESUPUESTO PERSONAL</h1>
    
    
    <div class="tabs">
        <button class="tab" onclick="showForm('login')">Iniciar Sesión</button>
        <button class="tab active" onclick="showForm('signup')">Registrarse</button>
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
    
            <div id="login" class="form-content">
            <div class="form-tittle">Iniciar Sesión</div>
            <p class="form-subtittle">Accede a tu cuenta</p>
            <form action="login.php" method="POST">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario">
                
                <br><br>

                <label for="contraseña">Contraseña</label>
                <input type="password" name="contraseña" id="contraseña">

                <br><br>
                <button type="submit">Enviar</button>
            </form>
        </div>

        <div id="signup" class="form-content active">
            <div class="form-tittle">Crear cuenta</div>
            <p class="form-subtittle">Registra tu cuenta para tu gestor personal!</p>
            
            <form action="register.php" method="POST">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario">
                
                <br><br>

                <label for="correo">Correo: </label>
                <input type="email" name="correo" id="correo">
                
                <br><br>

                <label for="contraseña">Contraseña</label>
                <input type="password" name="contraseña" id="contraseña">

                <br><br>
                <button type="submit">Enviar</button>
            </form>

        </div>
    </div>
    <script src="../assets/js/app.js"></script>
</body>
</html>