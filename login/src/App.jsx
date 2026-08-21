import React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

// =====================================================
// COMPONENTE LOGO
// =====================================================
function Logo() {
  return (
    <Link
      to="/"
      className="navbar-brand d-flex align-items-center"
    >
      <img
        src="/farmasoft.jpeg"
        alt="Logo FARMASOFT"
        className="farmasoft-logo"
      />
    </Link>
  );
}

// =====================================================
// PÁGINA PRINCIPAL
// =====================================================
function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom">
        <div className="container">

          <Logo />

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="menu"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#inicio"
                >
                  Inicio
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#servicios"
                >
                  Servicios
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#productos"
                >
                  Productos
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-success px-4"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </button>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      {/* Contenido principal */}
      <main>

        {/* INICIO */}
        <section
          id="inicio"
          className="hero-section"
        >
          <div className="container">

            <div className="row align-items-center g-5 py-5">

              <div className="col-lg-7">

                <span className="badge text-bg-success-subtle text-success mb-3 px-3 py-2">
                  TU FARMACIA DE CONFIANZA
                </span>

                <h1 className="display-3 fw-bold mb-4">
                  Salud y bienestar a tu{" "}
                  <span className="brand-green">
                    alcance
                  </span>
                </h1>

                <p className="lead text-secondary mb-4">
                  Bienvenido a FARMASOFT, una farmacia moderna
                  y sencilla para consultar nuestros servicios y
                  acceder al sistema.
                </p>

                <button
                  className="btn btn-success btn-lg px-4"
                  onClick={() => navigate("/login")}
                >
                  Acceder al sistema →
                </button>

              </div>

              <div className="col-lg-5">

                <div className="hero-card text-center shadow-sm">

                  <div className="big-cross mx-auto mb-3">
                    +
                  </div>

                  <h2 className="fw-bold">
                    FARMASOFT
                  </h2>

                  <p className="text-secondary">
                    Soluciones simples para la gestión de tu farmacia.
                  </p>

                  <div className="row mt-4">

                    <div className="col-6">
                      <strong className="d-block fs-4 brand-green">
                        24/7
                      </strong>

                      <small className="text-secondary">
                        Información
                      </small>
                    </div>

                    <div className="col-6">
                      <strong className="d-block fs-4 brand-green">
                        100%
                      </strong>

                      <small className="text-secondary">
                        Confianza
                      </small>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SERVICIOS */}
        <section
          id="servicios"
          className="py-5 bg-white"
        >
          <div className="container py-4">

            <div className="text-center mb-5">

              <p className="section-label">
                NUESTROS SERVICIOS
              </p>

              <h2 className="fw-bold">
                Todo en un solo lugar
              </h2>

            </div>

            <div className="row g-4">

              {[
                [
                  "💊",
                  "Medicamentos",
                  "Consulta categorías y productos disponibles en la farmacia."
                ],
                [
                  "🩺",
                  "Atención",
                  "Información clara y sencilla para nuestros clientes."
                ],
                [
                  "📦",
                  "Inventario",
                  "Control de productos y existencias desde el sistema."
                ]
              ].map(([icon, title, text]) => (

                <div
                  className="col-md-4"
                  key={title}
                >

                  <div className="card service-card h-100 border-0 shadow-sm p-4">

                    <div className="service-icon">
                      {icon}
                    </div>

                    <h4 className="fw-bold">
                      {title}
                    </h4>

                    <p className="text-secondary mb-0">
                      {text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        </section>

        {/* PRODUCTOS */}
        <section
          id="productos"
          className="py-5"
        >
          <div className="container">

            <div className="product-banner rounded-4 p-4 p-md-5">

              <div className="row align-items-center">

                <div className="col-md-8">

                  <p className="section-label">
                    FARMACIA
                  </p>

                  <h2 className="fw-bold">
                    Productos para tu bienestar
                  </h2>

                  <p className="text-secondary mb-md-0">
                    Encuentra medicamentos, cuidado personal
                    y productos de uso diario.
                  </p>

                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">

                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/login")}
                  >
                    Entrar a FARMASOFT
                  </button>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-dark text-white py-4">

        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">

          <strong>
            FARMASOFT
          </strong>

          <span className="text-white-50">
            © 2026 - Sistema de farmacia
          </span>

        </div>

      </footer>
    </>
  );
}

// =====================================================
// PÁGINA DE INICIO DE SESIÓN
// =====================================================
function Login() {

  const navigate = useNavigate();

  // Datos del formulario
  const [form, setForm] = React.useState({
    usuario: "",
    password: ""
  });

  // Mensajes
  const [error, setError] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  // Estado del botón
  const [cargando, setCargando] = React.useState(false);

  // Cambiar datos del formulario
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
    setMensaje("");
  }

  // ===================================================
  // ENVIAR LOGIN A LA API PHP
  // ===================================================
  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.usuario.trim() ||
      !form.password.trim()
    ) {
      setError(
        "Por favor, completa el usuario y la contraseña."
      );

      return;
    }

    setCargando(true);
    setError("");
    setMensaje("");

    try {

      // Datos que recibirá login.php
      const datos = new URLSearchParams();

      datos.append(
        "usuario",
        form.usuario
      );

      datos.append(
        "contrasenia",
        form.password
      );

      // Conexión con la API PHP
      const respuesta = await fetch(
        "http://localhost/Farmasoft_proj/Backend/usuarios/login.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          body: datos.toString()
        }
      );

      const resultado = await respuesta.json();

      // Autenticación correcta
      if (resultado.success) {

        setMensaje(
          resultado.mensaje
        );

        // Guardar información del usuario
        localStorage.setItem(
          "usuarioFarmasoft",
          JSON.stringify(resultado.usuario)
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      } else {

        // Error de autenticación
        setError(
          resultado.mensaje
        );
      }

    } catch (error) {

      console.error(
        "Error al conectar con la API:",
        error
      );

      setError(
        "No fue posible conectar con el servidor."
      );

    } finally {

      setCargando(false);

    }
  }

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100 py-4">

          <div className="col-sm-10 col-md-7 col-lg-5">

            <Link
              to="/"
              className="text-secondary text-decoration-none d-inline-block mb-3"
            >
              ← Volver a la farmacia
            </Link>

            <div className="card border-0 shadow-lg login-card">

              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">

                  <div className="login-logo mx-auto mb-3">
                    +
                  </div>

                  <h2 className="fw-bold mb-1">
                    FARMASOFT
                  </h2>

                  <p className="text-secondary">
                    Inicio de sesión
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  {/* Usuario */}
                  <div className="mb-3">

                    <label
                      htmlFor="usuario"
                      className="form-label fw-semibold"
                    >
                      Usuario
                    </label>

                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Ingresa tu usuario"
                      value={form.usuario}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">

                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Contraseña
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Ingresa tu contraseña"
                      value={form.password}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Error */}
                  {error && (
                    <div className="alert alert-danger py-2">
                      {error}
                    </div>
                  )}

                  {/* Éxito */}
                  {mensaje && (
                    <div className="alert alert-success py-2">
                      {mensaje}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100 mt-2"
                    disabled={cargando}
                  >
                    {cargando
                      ? "Verificando..."
                      : "Iniciar sesión"}
                  </button>

                </form>

                {/* ENLACE PARA REGISTRO */}
                <div className="text-center mt-4">

                  <p className="text-secondary mb-2">
                    ¿No tienes una cuenta?
                  </p>

                  <Link
                    to="/registro"
                    className="btn btn-outline-success"
                  >
                    Crear cuenta
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================================
// PÁGINA DE REGISTRO
// =====================================================
function Registro() {

  const navigate = useNavigate();

  // Datos del formulario
  const [form, setForm] = React.useState({
    nombre: "",
    usuario: "",
    password: "",
    correo: ""
  });

  // Mensajes
  const [error, setError] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  // Estado de carga
  const [cargando, setCargando] = React.useState(false);

  // ===================================================
  // CAMBIAR LOS DATOS DEL FORMULARIO
  // ===================================================
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
    setMensaje("");
  }

  // ===================================================
  // REGISTRAR USUARIO EN LA API
  // ===================================================
  async function handleSubmit(e) {

    e.preventDefault();

    // Validar campos
    if (
      !form.nombre.trim() ||
      !form.usuario.trim() ||
      !form.password.trim() ||
      !form.correo.trim()
    ) {

      setError(
        "Todos los campos son obligatorios."
      );

      return;
    }

    setCargando(true);
    setError("");
    setMensaje("");

    try {

      // Crear datos para registrar.php
      const datos = new URLSearchParams();

      datos.append(
        "nombre",
        form.nombre
      );

      datos.append(
        "usuario",
        form.usuario
      );

      datos.append(
        "contrasenia",
        form.password
      );

      datos.append(
        "correo_electronico",
        form.correo
      );

      // =================================================
      // CONEXIÓN CON registrar.php
      // =================================================
      const respuesta = await fetch(
        "http://localhost/Farmasoft_proj/Backend/usuarios/registrar.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          body: datos.toString()
        }
      );

      // Convertir respuesta a JSON
      const resultado = await respuesta.json();

      // Registro correcto
      if (resultado.success) {

        setMensaje(
          resultado.mensaje
        );

        // Limpiar formulario
        setForm({
          nombre: "",
          usuario: "",
          password: "",
          correo: ""
        });

        // Después de registrarse volver al login
        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } else {

        // Mostrar error enviado por PHP
        setError(
          resultado.mensaje
        );

      }

    } catch (error) {

      console.error(
        "Error al conectar con la API:",
        error
      );

      setError(
        "No fue posible conectar con el servidor."
      );

    } finally {

      setCargando(false);

    }
  }

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100 py-4">

          <div className="col-sm-10 col-md-7 col-lg-5">

            <Link
              to="/login"
              className="text-secondary text-decoration-none d-inline-block mb-3"
            >
              ← Volver al inicio de sesión
            </Link>

            <div className="card border-0 shadow-lg login-card">

              <div className="card-body p-4 p-md-5">

                {/* Encabezado */}
                <div className="text-center mb-4">

                  <div className="login-logo mx-auto mb-3">
                    +
                  </div>

                  <h2 className="fw-bold mb-1">
                    FARMASOFT
                  </h2>

                  <p className="text-secondary">
                    Crear una cuenta
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  {/* Nombre */}
                  <div className="mb-3">

                    <label
                      htmlFor="nombre"
                      className="form-label fw-semibold"
                    >
                      Nombre
                    </label>

                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Ingresa tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Usuario */}
                  <div className="mb-3">

                    <label
                      htmlFor="usuario"
                      className="form-label fw-semibold"
                    >
                      Usuario
                    </label>

                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Crea tu usuario"
                      value={form.usuario}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Correo */}
                  <div className="mb-3">

                    <label
                      htmlFor="correo"
                      className="form-label fw-semibold"
                    >
                      Correo electrónico
                    </label>

                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="correo@ejemplo.com"
                      value={form.correo}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">

                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Contraseña
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Crea una contraseña"
                      value={form.password}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Error */}
                  {error && (
                    <div className="alert alert-danger py-2">
                      {error}
                    </div>
                  )}

                  {/* Éxito */}
                  {mensaje && (
                    <div className="alert alert-success py-2">
                      {mensaje}
                    </div>
                  )}

                  {/* Botón registrar */}
                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100 mt-2"
                    disabled={cargando}
                  >

                    {cargando
                      ? "Registrando..."
                      : "Crear cuenta"}

                  </button>

                </form>

                <div className="text-center mt-4">

                  <Link
                    to="/login"
                    className="text-success text-decoration-none"
                  >
                    Ya tengo una cuenta
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================================
// DASHBOARD
// =====================================================
function Dashboard() {

  const navigate = useNavigate();

  const cards = [
    [
      "💊",
      "Inventario",
      "Gestionar medicamentos y existencias."
    ],
    [
      "🧾",
      "Ventas",
      "Registrar y consultar ventas."
    ],
    [
      "📊",
      "Reportes",
      "Consultar información del negocio."
    ]
  ];

  return (
    <div className="dashboard-page min-vh-100">

      {/* Barra superior */}
      <nav className="navbar bg-white border-bottom">

        <div className="container">

          <Logo />

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Cerrar sesión
          </button>

        </div>

      </nav>

      {/* Contenido */}
      <main className="container py-5">

        <p className="section-label">
          PANEL PRINCIPAL
        </p>

        <h1 className="fw-bold">
          Bienvenido a FARMASOFT 👋
        </h1>

        <p className="text-secondary">
          Has iniciado sesión correctamente.
        </p>

        <div className="row g-4 mt-3">

          {cards.map(
            ([icon, title, text]) => (

              <div
                className="col-md-4"
                key={title}
              >

                <div className="card border-0 shadow-sm dashboard-card h-100 p-4">

                  <span className="fs-1">
                    {icon}
                  </span>

                  <h4 className="fw-bold mt-3">
                    {title}
                  </h4>

                  <p className="text-secondary">
                    {text}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </main>

    </div>
  );
}

// =====================================================
// RUTAS DE LA APLICACIÓN
// =====================================================
export default function App() {

  return (

    <Routes>

      {/* Página principal */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Registro */}
      <Route
        path="/registro"
        element={<Registro />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

    </Routes>

  );
}