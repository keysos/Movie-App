# 🎬 Movie App

A movie search application built with **React** that allows users to search for movies and view information using the **OMDb API**. The app dynamically fetches movie data and displays details such as posters, titles, release years, and more.

## 🚀 Features

- 🔎 Search for movies by title
- 🎞️ Display movie posters and basic information
- 📄 View detailed movie information
- ⚡ Fetch movie data from the OMDb API
- ⌨️ Search dynamically as the user types
- 📱 Responsive design
- ⚛️ Built with React hooks

## 🛠️ Technologies

- **React**
- **JavaScript (ES6+)**
- **CSS**
- **Vite**
- **OMDb API**

## 📸 Screenshots

_Add screenshots of your application here._

## 📂 Project Structure

```
src
├── components
│   ├── SearchBar.jsx
│   └── MovieList.jsx
│
├── pages
│   └── Home.jsx
│
├── services
│   └── movieApi.js
│
├── App.jsx
└── main.jsx
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/movie-app.git
```

Navigate to the project folder:

```bash
cd movie-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## 🔑 API Setup

This project uses the OMDb API.

1. Create an API key at:

https://www.omdbapi.com/apikey.aspx

2. Create a `.env` file in the root directory:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

3. Use the environment variable in your API service:

```javascript
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
```

## 📡 API Usage

The application uses the OMDb API to search for movies:

```
GET https://www.omdbapi.com/?apikey=API_KEY&s=movie_title
```

Example response:

```json
{
  "Title": "Batman Begins",
  "Year": "2005",
  "Poster": "poster_url",
  "imdbID": "tt0372784"
}
```

## 🧠 React Concepts Used

- Components
- Props
- State management with `useState`
- Side effects with `useEffect`
- API requests with `fetch`
- Conditional rendering
- Component composition

## 🔮 Future Improvements

- Add movie details page
- Add favorites/watchlist functionality
- Add pagination for search results
- Add loading animations
- Add error handling messages
- Improve UI design

## 📄 License

This project is for educational purposes.