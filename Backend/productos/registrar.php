<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Responder correctamente a la petición OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "../Conexion.php";

// Recibir los datos enviados desde React
$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos) {
    echo json_encode([
        "success" => false,
        "message" => "No se recibieron datos"
    ]);
    exit();
}

// Obtener los datos
$codigoProducto = $datos["codigoProducto"] ?? "";
$nombre = $datos["nombre"] ?? "";
$categoria = $datos["categoria"] ?? "";
$porcentajeVenta = $datos["porcentajeVenta"] ?? 0;
$categoriasIdCategoria = $datos["categoriasIdCategoria"] ?? 0;
$marca = $datos["marca"] ?? "";
$peso = $datos["peso"] ?? "";
$imagen = $datos["imagen"] ?? null;

// Preparar consulta
$sql = "INSERT INTO productos
        (codigo_producto, nombre, categoria, porcentaje_venta,
         categorias_id_categoria, marca, peso, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta: " . $conexion->error
    ]);
    exit();
}

$stmt->bind_param(
    "sssdisss",
    $codigoProducto,
    $nombre,
    $categoria,
    $porcentajeVenta,
    $categoriasIdCategoria,
    $marca,
    $peso,
    $imagen
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Producto registrado correctamente"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar el producto: " . $stmt->error
    ]);
}

$stmt->close();
$conexion->close();

?>