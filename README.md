# FARMASOFT

## Descripción del proyecto

FARMASOFT es un sistema web desarrollado para apoyar la gestión de una farmacia. El proyecto cuenta con un frontend desarrollado en React y un backend desarrollado en PHP, conectado a una base de datos MySQL.

El sistema permite realizar el registro de usuarios y el inicio de sesión mediante un servicio web.

## Objetivo

Desarrollar y consumir un servicio web que permita registrar usuarios y realizar la autenticación mediante usuario y contraseña, utilizando una API desarrollada en PHP y una base de datos MySQL.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- PHP
- MySQL
- XAMPP
- Git
- GitHub (opcional)

## Arquitectura del proyecto

El sistema utiliza una arquitectura de tres componentes principales:

React → API PHP → MySQL

### Frontend

El frontend fue desarrollado utilizando React y Vite.

Se encarga de:

- Mostrar la interfaz de FARMASOFT.
- Presentar el formulario de registro.
- Presentar el formulario de inicio de sesión.
- Enviar los datos a la API PHP.
- Mostrar los mensajes de autenticación.
- Mostrar el panel principal después del inicio de sesión.

### Backend

El backend fue desarrollado utilizando PHP.

Los principales servicios relacionados con usuarios son:

- `registrar.php`: registra nuevos usuarios.
- `login.php`: verifica las credenciales de acceso.
- `Conexion.php`: establece la conexión con MySQL.

### Base de datos

El proyecto utiliza MySQL mediante XAMPP.

La base de datos utilizada es:

`mydb`

La tabla utilizada para la autenticación es:

`usuarios`

Entre sus campos principales se encuentran:

- `id_usuarios`
- `nombre`
- `usuario`
- `contrasenia`
- `correo_electronico`
- `estado`
- `ultimo_acceso`
- `roles_id_rol`

## Servicio de registro

El servicio `registrar.php` recibe los datos enviados desde React mediante una solicitud HTTP POST.

Los datos recibidos son:

- Nombre
- Usuario
- Contraseña
- Correo electrónico

Antes de almacenar la contraseña, el sistema utiliza `password_hash()` para protegerla.

Si el registro es correcto, la API devuelve:

`Usuario registrado correctamente.`

Si el usuario ya existe, devuelve un mensaje indicando que el usuario ya está registrado.

## Servicio de autenticación

El servicio `login.php` recibe:

- Usuario
- Contraseña

El servicio consulta la información almacenada en la base de datos y verifica las credenciales.

Cuando la autenticación es correcta, devuelve un mensaje de:

`Autenticación satisfactoria.`

Cuando las credenciales no son correctas, devuelve:

`Error en la autenticación.`

## Flujo del sistema

```text
Usuario
   ↓
Frontend React
   ↓
Solicitud HTTP POST
   ↓
API PHP
   ↓
MySQL
   ↓
Tabla usuarios
   ↓
Verificación de credenciales
   ↓
┌─────────────────────────────┐
│                             │
▼                             ▼
Autenticación correcta     Autenticación incorrecta
│                             │
▼                             ▼
Dashboard                  Error