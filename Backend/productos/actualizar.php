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

// Datos del producto
$idProductos = intval($datos["idProductos"] ?? 0);
$nombre = $datos["nombre"] ?? "";
$categoria = $datos["categoria"] ?? "";
$porcentajeVenta = floatval($datos["porcentajeVenta"] ?? 0);
$marca = $datos["marca"] ?? "";
$peso = $datos["peso"] ?? "";

// Validar ID
if ($idProductos <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "ID de producto no válido"
    ]);
    exit();
}

$sql = "UPDATE productos
        SET nombre = ?,
            categoria = ?,
            porcentaje_venta = ?,
            marca = ?,
            peso = ?
        WHERE id_productos = ?";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta: " . $conexion->error
    ]);
    exit();
}

$stmt->bind_param(
    "ssdssi",
    $nombre,
    $categoria,
    $porcentajeVenta,
    $marca,
    $peso,
    $idProductos
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Producto actualizado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Error al actualizar el producto: " . $stmt->error
    ]);
}

$stmt->close();
$conexion->close();

?>