<?php

$host = "127.0.0.1"; 
$usuario = "root"; 
$password = ""; 
$bd = "sistema_login"; 
$port = 3306; 

$connection = mysqli_connect($host, $usuario, $password, $bd, $port); 

if(!$connection) die("Error de al conectarse a la BD" . mysqli_connect_error()); 

mysqli_set_charset($connection, "utf8mb4");

?>