# Rick and Morty Explorer 🔬🛸

## Project Overview

This is a React-based web application that allows users to explore characters from the Rick and Morty universe. The main goal of this project is to practice state management using the `useReducer` hook instead of `useState`.

## Goals

-   Practice advanced React hooks (`useReducer`)
-   Manage complex state transitions (loading, success, error)
-   Fetch and display data from the [Rick and Morty API](https://rickandmortyapi.com/)
-   Filter characters by name and status
-   Handle pagination

## Features

-   🧠 Uses `useReducer` to manage API states (loading, success, error)
-   🔍 Search characters by name
-   🚦 Filter characters by status (Alive, Dead, Unknown)
-   📃 Paginate through results
-   🧼 Clear filters and reset state

## Tech Stack

-   React (with Vite or CRA)
-   JavaScript (or optionally TypeScript)
-   CSS Modules or TailwindCSS
-   Axios or Fetch API

## Reducer State Example

```js
const initialState = {
    loading: false,
    error: "",
    data: [],
    filters: {
        name: "",
        status: "",
    },
    currentPage: 1,
};
```

## Folder structure

```
src/
├── components/
│   ├── CharacterList.jsx
│   ├── Filters.jsx
│   └── Pagination.jsx
├── reducers/
│   └── characterReducer.js
├── App.jsx
└── index.js
```

### Segunda parte de ideas

// poder filtrar por estatus
// añadir span de número máx de páginas
// arreglar pagina de error
// Añadir boton de reset filters
// pasar todo a css modules
// seguir la estructura de archivos del readme

// 1. Modo oscuro global
// Dificultad: Fácil
// Por qué: Solo requiere crear un contexto para el tema y alternar entre claro/oscuro desde cualquier parte de la app.
// React Router: No requiere rutas complejas, solo mantener el tema al navegar.

// 2. Detalle de personaje en ruta dinámica
// Dificultad: Fácil-Media
// Por qué: Añadir rutas dinámicas (/character/:id) y mostrar detalles al hacer clic en un personaje.
// React Router: Uso básico de rutas dinámicas.
// Context API: Opcional, para compartir datos si lo deseas.

// 3. Favoritos globales
// Dificultad: Media
// Por qué: Requiere crear un contexto para favoritos y una ruta /favorites para listarlos.
// React Router: Añadir una nueva ruta.
// Context API: Uso real para compartir estado entre componentes.

// para filtrar por estado hay que hacer una petición a la url para que quede tal que así:
// https://rickandmortyapi.com/api/character/?name=rick&status=alive
// o así
// https://rickandmortyapi.com/api/character/?status=alive

// modularizar en componentes
// añadir en la esquina de cada personaje un boton radiobutton
// añadir el id o personaje entero a un array de favoritos
// añadir una ruta de favoritos
// añadir el boton para navegar a esa ruta
// mostrar todos los personajes favoritos en la ruta. La forma de acceder a ese array guardado en un estado tiene que ser con el useContext, en un custom Hook como los del curso. Un useFav.jsx que tenga FavContext y useFav
