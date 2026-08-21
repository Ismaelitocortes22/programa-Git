<?php

// Permitir solicitudes desde el frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Incluir la conexión con la base de datos
require_once "../Conexion.php";

// Verificar que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "mensaje" => "Método no permitido. Utilice POST."
    ]);
    exit;
}

// Recibir los datos enviados
$usuario = $_POST["usuario"] ?? "";
$contrasenia = $_POST["contrasenia"] ?? "";

// Verificar que los campos no estén vacíos
if (empty($usuario) || empty($contrasenia)) {
    echo json_encode([
        "success" => false,
        "mensaje" => "El usuario y la contraseña son obligatorios."
    ]);
    exit;
}

// Buscar el usuario en la base de datos
$sql = "SELECT id_usuarios, nombre, usuario, contrasenia, estado, roles_id_rol
        FROM usuarios
        WHERE usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();

$resultado = $stmt->get_result();

// Verificar si el usuario existe
if ($resultado->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error en la autenticación."
    ]);

    exit;
}

// Obtener los datos del usuario
$datos_usuario = $resultado->fetch_assoc();

// Verificar si el usuario está activo
if ($datos_usuario["estado"] != 1) {

    echo json_encode([
        "success" => false,
        "mensaje" => "El usuario se encuentra inactivo."
    ]);

    exit;
}

// Verificar la contraseña encriptada
if (password_verify($contrasenia, $datos_usuario["contrasenia"])) {

    // Actualizar la fecha del último acceso
    $id_usuario = $datos_usuario["id_usuarios"];

    $sql_actualizar = "UPDATE usuarios
                       SET ultimo_acceso = CURDATE()
                       WHERE id_usuarios = ?";

    $stmt_actualizar = $conexion->prepare($sql_actualizar);
    $stmt_actualizar->bind_param("i", $id_usuario);
    $stmt_actualizar->execute();
    $stmt_actualizar->close();

    // Autenticación correcta
    echo json_encode([
        "success" => true,
        "mensaje" => "Autenticación satisfactoria.",
        "usuario" => [
            "id" => $datos_usuario["id_usuarios"],
            "nombre" => $datos_usuario["nombre"],
            "usuario" => $datos_usuario["usuario"],
            "rol" => $datos_usuario["roles_id_rol"]
        ]
    ]);

} else {

    // Contraseña incorrecta
    echo json_encode([
        "success" => false,
        "mensaje" => "Error en la autenticación."
    ]);
}

// Cerrar recursos
$stmt->close();
$conexion->close();

?>