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
