<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Prueba de inicio de sesión</title>
</head>
<body>

    <h2>Prueba de inicio de sesión</h2>

    <form action="login.php" method="POST">

        <label>Usuario:</label><br>
        <input type="text" name="usuario" required>
        <br><br>

        <label>Contraseña:</label><br>
        <input type="password" name="contrasenia" required>
        <br><br>

        <button type="submit">Iniciar sesión</button>

    </form>

</body>
</html>