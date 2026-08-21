<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "../Conexion.php";

// Recibir datos enviados desde React
$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos) {
    echo json_encode([
        "success" => false,
        "message" => "No se recibieron datos"
    ]);
    exit();
}

// Obtener ID del producto
$idProductos = intval($datos["idProductos"] ?? 0);

// Validar ID
if ($idProductos <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "ID de producto no válido"
    ]);
    exit();
}

// Eliminar producto
$sql = "DELETE FROM productos
        WHERE id_productos = ?";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta: " . $conexion->error
    ]);
    exit();
}

$stmt->bind_param("i", $idProductos);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {

        echo json_encode([
            "success" => true,
            "message" => "Producto eliminado correctamente"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "No se encontró el producto"
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar el producto: " . $stmt->error
    ]);
}

$stmt->close();
$conexion->close();

?>