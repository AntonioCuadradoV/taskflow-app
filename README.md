# TaskFlow

Aplicación móvil de gestión de tareas desarrollada con **React Native, Expo, Redux Toolkit y Firebase**.

TaskFlow permite a los usuarios crear una cuenta, iniciar sesión y administrar sus tareas personales desde una interfaz sencilla e intuitiva. La información se sincroniza en tiempo real mediante Firebase Firestore.

## Características principales

- **Registro de usuarios:** creación de cuentas con nombre, apellido, correo electrónico y contraseña.
- **Inicio de sesión:** autenticación mediante Firebase Authentication.
- **Sesiones persistentes:** mantiene la sesión del usuario al volver a abrir la aplicación.
- **Gestión de tareas:** permite crear, consultar, completar y eliminar tareas.
- **Filtros:** visualización de todas las tareas, pendientes y completadas.
- **Sincronización en tiempo real:** almacenamiento de tareas en Cloud Firestore.
- **Perfiles personalizados:** muestra el nombre, apellido y correo electrónico del usuario.
- **Privacidad:** cada usuario accede únicamente a sus propias tareas.

## Tecnologías utilizadas

- React Native
- Expo
- JavaScript
- Redux Toolkit
- React Redux
- React Navigation
- Firebase Authentication
- Cloud Firestore
- AsyncStorage

## Estructura del proyecto

```text
taskflow-app/
├── assets/
├── src/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── redux/
│   ├── screens/
│   ├── services/
│   └── theme/
├── App.js
├── index.js
├── firebaseConfig.js
├── app.json
└── package.json
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar a la carpeta

```bash
cd taskflow-app
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar Firebase

Crear un proyecto en [Firebase Console](https://console.firebase.google.com/) y configurar:

- Authentication con el método de correo electrónico y contraseña.
- Cloud Firestore.

Configurar las credenciales del proyecto en `firebaseConfig.js`.

### 5. Ejecutar la aplicación

```bash
npx expo start
```

Luego, utilizar Expo Go o un emulador compatible para ejecutar la aplicación.

## Base de datos y seguridad

TaskFlow utiliza Cloud Firestore para almacenar las tareas.

Cada tarea contiene información como:

- ID del documento.
- Título.
- Descripción.
- Categoría.
- Estado de finalización.
- Fecha de creación.
- ID del usuario propietario (`userId`).

Las reglas de seguridad de Firestore restringen las operaciones de lectura, creación, modificación y eliminación a los usuarios autenticados que sean propietarios de los documentos correspondientes.

## Autor

Proyecto desarrollado como parte del proceso de formación en desarrollo de aplicaciones móviles.

---

**TaskFlow — Organizá tus tareas, administrá tu tiempo y mantené todo bajo control.**
