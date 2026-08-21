<?php
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Prueba de registro</title>
</head>
<body>

    <h2>Prueba de registro de usuario</h2>

    <form action="registrar.php" method="POST">

        <label>Nombre:</label><br>
        <input type="text" name="nombre" required>
        <br><br>

        <label>Usuario:</label><br>
        <input type="text" name="usuario" required>
        <br><br>

        <label>Contraseña:</label><br>
        <input type="password" name="contrasenia" required>
        <br><br>

        <label>Correo electrónico:</label><br>
        <input type="email" name="correo_electronico" required>
        <br><br>

        <button type="submit">Registrar usuario</button>

    </form>

</body>
</html>