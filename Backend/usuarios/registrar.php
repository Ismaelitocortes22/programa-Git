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
$nombre = $_POST["nombre"] ?? "";
$usuario = $_POST["usuario"] ?? "";
$contrasenia = $_POST["contrasenia"] ?? "";
$correo = $_POST["correo_electronico"] ?? "";

// Validar que los campos obligatorios estén completos
if (empty($usuario) || empty($contrasenia) || empty($correo)) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Usuario, contraseña y correo son obligatorios."
    ]);
    exit;
}

// Verificar si el usuario ya existe
$sql = "SELECT id_usuarios FROM usuarios WHERE usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "mensaje" => "El usuario ya existe."
    ]);
    exit;
}

// Encriptar la contraseña antes de guardarla
$contrasenia_hash = password_hash($contrasenia, PASSWORD_DEFAULT);

// Valores iniciales del usuario
$estado = 1;
$roles_id_rol = 1;

// Insertar el nuevo usuario en la base de datos
$sql = "INSERT INTO usuarios 
        (nombre, usuario, contrasenia, correo_electronico, estado, roles_id_rol)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "ssssii",
    $nombre,
    $usuario,
    $contrasenia_hash,
    $correo,
    $estado,
    $roles_id_rol
);

// Ejecutar el registro
if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "mensaje" => "Usuario registrado correctamente."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al registrar el usuario: " . $stmt->error
    ]);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();

?>