import { useEffect, useState } from "react";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost/FARMASOFT/Backend/productos/consultar.php")
            .then((respuesta) => {

                if (!respuesta.ok) {
                    throw new Error("Error al consultar los productos");
                }

                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error(error);
                setError("No se pudieron cargar los productos");
                setCargando(false);
            });

    }, []);

    return (
        <div className="container mt-4">

            <h2 className="mb-4">
                Gestión de Productos - FARMASOFT
            </h2>

            {cargando && (
                <div className="alert alert-info">
                    Cargando productos...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!cargando && !error && (
                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>% Venta</th>
                                <th>Marca</th>
                                <th>Peso</th>
                            </tr>
                        </thead>

                        <tbody>

                            {productos.map((producto) => (

                                <tr key={producto.id}>

                                    <td>{producto.id}</td>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.porcentaje}</td>
                                    <td>{producto.marca}</td>
                                    <td>{producto.peso}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}

export default Productos;