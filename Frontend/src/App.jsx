import { useState } from 'react'
import './App.css'
import logoFarmasoft from './assets/farmasoft.jpeg'

function App() {

  // Estados principales
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarProductos, setMostrarProductos] = useState(false)

  // Productos consultados
  const [productos, setProductos] = useState([])

  // Estados para editar
  const [editando, setEditando] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)

  // Datos del formulario de registro
  const [producto, setProducto] = useState({
    codigoProducto: '',
    nombre: '',
    categoria: '',
    porcentajeVenta: '',
    categoriasIdCategoria: '',
    marca: '',
    peso: '',
    imagen: ''
  })


  // ==========================================
  // MANEJAR CAMBIOS DEL FORMULARIO
  // ==========================================

  const manejarCambio = (e) => {

    const { name, value } = e.target

    setProducto({
      ...producto,
      [name]: value
    })

  }


  // ==========================================
  // CONSULTAR PRODUCTOS
  // ==========================================

  const consultarProductos = async () => {

    try {

      const respuesta = await fetch(
        'http://localhost/Farmasoft_proj/Backend/productos/consultar.php'
      )

      const resultado = await respuesta.json()

      if (resultado.success) {

        setProductos(resultado.productos)

        setMostrarProductos(true)

        setMostrarFormulario(false)

        setEditando(false)

      } else {

        alert('Error: ' + resultado.message)

      }

    } catch (error) {

      console.error('Error:', error)

      alert('No se pudieron consultar los productos')

    }

  }


  // ==========================================
  // REGISTRAR PRODUCTO
  // ==========================================

  const registrarProducto = async (e) => {

    e.preventDefault()

    try {

      const respuesta = await fetch(
        'http://localhost/Farmasoft_proj/Backend/productos/registrar.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            ...producto,

            porcentajeVenta:
              Number(producto.porcentajeVenta),

            categoriasIdCategoria:
              Number(producto.categoriasIdCategoria)

          })
        }
      )

      const resultado = await respuesta.json()

      if (resultado.success) {

        alert('Producto registrado correctamente')

        setProducto({

          codigoProducto: '',
          nombre: '',
          categoria: '',
          porcentajeVenta: '',
          categoriasIdCategoria: '',
          marca: '',
          peso: '',
          imagen: ''

        })

      } else {

        alert('Error: ' + resultado.message)

      }

    } catch (error) {

      console.error('Error:', error)

      alert('No se pudo conectar con el servidor PHP')

    }

  }


  // ==========================================
  // INICIAR EDICIÓN
  // ==========================================

  const iniciarEdicion = (producto) => {

    setProductoEditando({

      idProductos:
        producto.id_productos,

      nombre:
        producto.nombre,

      categoria:
        producto.categoria,

      porcentajeVenta:
        producto.porcentaje_venta,

      marca:
        producto.marca,

      peso:
        producto.peso

    })

    setEditando(true)

  }


  // ==========================================
  // GUARDAR EDICIÓN
  // ==========================================

  const guardarEdicion = async (e) => {

    e.preventDefault()

    try {

      const respuesta = await fetch(
        'http://localhost/Farmasoft_proj/Backend/productos/actualizar.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(
            productoEditando
          )

        }
      )

      const resultado =
        await respuesta.json()

      if (resultado.success) {

        alert(
          'Producto actualizado correctamente'
        )

        setEditando(false)

        setProductoEditando(null)

        consultarProductos()

      } else {

        alert(
          'Error: ' +
          resultado.message
        )

      }

    } catch (error) {

      console.error('Error:', error)

      alert(
        'No se pudo actualizar el producto'
      )

    }

  }


  // ==========================================
  // ELIMINAR PRODUCTO
  // ==========================================

  const eliminarProducto = async (idProductos) => {

    const confirmar = window.confirm(
      '¿Está seguro de eliminar este producto?'
    )

    if (!confirmar) {

      return

    }

    try {

      const respuesta = await fetch(
        'http://localhost/Farmasoft_proj/Backend/productos/eliminar.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idProductos:
              Number(idProductos)

          })

        }
      )

      const resultado =
        await respuesta.json()

      if (resultado.success) {

        alert(
          'Producto eliminado correctamente'
        )

        consultarProductos()

      } else {

        alert(
          'Error: ' +
          resultado.message
        )

      }

    } catch (error) {

      console.error('Error:', error)

      alert(
        'No se pudo eliminar el producto'
      )

    }

  }


  // ==========================================
  // INTERFAZ
  // ==========================================

  return (

    <div className="app">


      {/* =====================================
          ENCABEZADO
      ====================================== */}

      <header className="header">

        <img
          src={logoFarmasoft}
          alt="Logo de Farmasoft"
          className="logo"
        />

        <h1>
          FARMASOFT
        </h1>

        <p>
          Sistema de gestión de productos
        </p>

      </header>



      {/* =====================================
          PANTALLA PRINCIPAL
      ====================================== */}

      {!mostrarFormulario &&
        !mostrarProductos && (

          <main className="main">

            <h2>
              Gestión de productos
            </h2>


            <div className="buttons">

              <button
                onClick={() =>
                  setMostrarFormulario(true)
                }
              >
                Registrar producto
              </button>


              <button
                onClick={consultarProductos}
              >
                Consultar productos
              </button>

            </div>

          </main>

        )}



      {/* =====================================
          FORMULARIO REGISTRAR
      ====================================== */}

      {mostrarFormulario && (

        <main className="main">

          <h2>
            Registrar producto
          </h2>


          <form
            className="formulario"
            onSubmit={registrarProducto}
          >


            <label>

              Código del producto

              <input
                type="text"
                name="codigoProducto"
                value={
                  producto.codigoProducto
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: MED001"
                required
              />

            </label>



            <label>

              Nombre

              <input
                type="text"
                name="nombre"
                value={
                  producto.nombre
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: Acetaminofen"
                required
              />

            </label>



            <label>

              Categoría

              <input
                type="text"
                name="categoria"
                value={
                  producto.categoria
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: Analgésicos"
                required
              />

            </label>



            <label>

              Porcentaje de venta

              <input
                type="number"
                step="0.01"
                name="porcentajeVenta"
                value={
                  producto.porcentajeVenta
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: 10.00"
                required
              />

            </label>



            <label>

              ID de categoría

              <input
                type="number"
                name="categoriasIdCategoria"
                value={
                  producto.categoriasIdCategoria
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: 1"
                required
              />

            </label>



            <label>

              Marca

              <input
                type="text"
                name="marca"
                value={
                  producto.marca
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: Genfar"
                required
              />

            </label>



            <label>

              Peso

              <input
                type="text"
                name="peso"
                value={
                  producto.peso
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ej: 500 mg"
                required
              />

            </label>



            <label>

              Imagen

              <input
                type="text"
                name="imagen"
                value={
                  producto.imagen
                }
                onChange={
                  manejarCambio
                }
                placeholder="Ruta o nombre de imagen"
              />

            </label>



            <div className="form-buttons">

              <button
                type="submit"
              >
                Registrar producto
              </button>


              <button
                type="button"
                onClick={() =>
                  setMostrarFormulario(false)
                }
              >
                Cancelar
              </button>

            </div>


          </form>

        </main>

      )}



      {/* =====================================
          CONSULTAR PRODUCTOS
      ====================================== */}

      {mostrarProductos && (

        editando &&
        productoEditando ? (


          /* =================================
             FORMULARIO EDITAR
          ================================== */

          <main className="main">

            <h2>
              Editar producto
            </h2>


            <form
              className="formulario"
              onSubmit={guardarEdicion}
            >


              <label>

                Nombre

                <input
                  type="text"
                  value={
                    productoEditando.nombre
                  }
                  onChange={(e) =>
                    setProductoEditando({

                      ...productoEditando,

                      nombre:
                        e.target.value

                    })
                  }
                  required
                />

              </label>



              <label>

                Categoría

                <input
                  type="text"
                  value={
                    productoEditando.categoria
                  }
                  onChange={(e) =>
                    setProductoEditando({

                      ...productoEditando,

                      categoria:
                        e.target.value

                    })
                  }
                  required
                />

              </label>



              <label>

                Porcentaje de venta

                <input
                  type="number"
                  step="0.01"
                  value={
                    productoEditando.porcentajeVenta
                  }
                  onChange={(e) =>
                    setProductoEditando({

                      ...productoEditando,

                      porcentajeVenta:
                        e.target.value

                    })
                  }
                  required
                />

              </label>



              <label>

                Marca

                <input
                  type="text"
                  value={
                    productoEditando.marca
                  }
                  onChange={(e) =>
                    setProductoEditando({

                      ...productoEditando,

                      marca:
                        e.target.value

                    })
                  }
                  required
                />

              </label>



              <label>

                Peso

                <input
                  type="text"
                  value={
                    productoEditando.peso
                  }
                  onChange={(e) =>
                    setProductoEditando({

                      ...productoEditando,

                      peso:
                        e.target.value

                    })
                  }
                  required
                />

              </label>



              <div className="form-buttons">

                <button
                  type="submit"
                >
                  Guardar cambios
                </button>


                <button
                  type="button"
                  onClick={() => {

                    setEditando(false)

                    setProductoEditando(null)

                  }}
                >
                  Cancelar
                </button>

              </div>


            </form>

          </main>


        ) : (


          /* =================================
             TABLA DE PRODUCTOS
          ================================== */

          <main className="main">

            <h2>
              Productos registrados
            </h2>


            {productos.length > 0 ? (

              <div className="tabla-contenedor">


                <table className="tabla-productos">


                  <thead>

                    <tr>

                      <th>
                        ID
                      </th>

                      <th>
                        Código
                      </th>

                      <th>
                        Nombre
                      </th>

                      <th>
                        Categoría
                      </th>

                      <th>
                        % Venta
                      </th>

                      <th>
                        ID Categoría
                      </th>

                      <th>
                        Marca
                      </th>

                      <th>
                        Peso
                      </th>

                      <th>
                        Acciones
                      </th>

                    </tr>

                  </thead>



                  <tbody>

                    {productos.map(
                      (producto) => (

                        <tr
                          key={
                            producto.id_productos
                          }
                        >


                          <td>
                            {
                              producto.id_productos
                            }
                          </td>


                          <td>
                            {
                              producto.codigo_producto
                            }
                          </td>


                          <td>
                            {
                              producto.nombre
                            }
                          </td>


                          <td>
                            {
                              producto.categoria
                            }
                          </td>


                          <td>
                            {
                              producto.porcentaje_venta
                            }
                          </td>


                          <td>
                            {
                              producto.categorias_id_categoria
                            }
                          </td>


                          <td>
                            {
                              producto.marca
                            }
                          </td>


                          <td>
                            {
                              producto.peso
                            }
                          </td>


                          {/* =================
                              ACCIONES
                          ================== */}

                          <td>

                            <button
                              onClick={() =>
                                iniciarEdicion(
                                  producto
                                )
                              }
                            >
                              Editar
                            </button>


                            <button
                              onClick={() =>
                                eliminarProducto(
                                  producto.id_productos
                                )
                              }
                            >
                              Eliminar
                            </button>

                          </td>


                        </tr>

                      )
                    )}

                  </tbody>


                </table>

              </div>

            ) : (

              <p>
                No hay productos registrados.
              </p>

            )}


            <button
              className="boton-volver"
              onClick={() =>
                setMostrarProductos(false)
              }
            >
              Volver
            </button>


          </main>

        )

      )}

    </div>

  )

}

export default App