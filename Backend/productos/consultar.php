<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "../Conexion.php";

$sql = "SELECT * FROM productos";

$resultado = $conexion->query($sql);

if (!$resultado) {
    echo json_encode([
        "success" => false,
        "message" => "Error en la consulta: " . $conexion->error
    ]);
    exit();
}

$productos = [];

while ($producto = $resultado->fetch_assoc()) {
    $productos[] = $producto;
}

echo json_encode([
    "success" => true,
    "productos" => $productos
]);

$conexion->close();

?>