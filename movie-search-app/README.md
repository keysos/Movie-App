# 🎬 Movie App

A movie search application built with **React** that allows users to search for movies and explore detailed information using the **TMDb API**. The application fetches movie data dynamically and displays information such as posters, titles, release dates, ratings, overviews, and more.

## 🚀 Features

* 🔎 Search for movies by title
* 🎞️ Display movie posters and essential information
* 📄 View detailed movie information
* ⭐ Display movie ratings and descriptions
* ⚡ Fetch movie data from the TMDb API
* ⌨️ Search dynamically as the user types
* ❤️ Add movies to favorites
* 📌 Create and manage a watchlist
* 🌙 Dark/light theme support
* 📱 Responsive design
* ⚛️ Built with React hooks and Context API

## 🛠️ Technologies

* **React**
* **JavaScript (ES6+)**
* **CSS**
* **Vite**
* **TMDb API**
* **React Router**
* **React Context API**

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

This project uses the **TMDb API**.

1. Create an API key at:

```
https://www.themoviedb.org/settings/api
```

2. Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

3. Use the environment variable in your API service:

```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

## 📡 API Usage

The application uses the TMDb API to search for movies:

```
GET https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=movie_title
```

Example response:

```json
{
  "id": 27205,
  "title": "Inception",
  "release_date": "2010-07-16",
  "poster_path": "/poster_path.jpg",
  "vote_average": 8.4,
  "overview": "A thief who steals corporate secrets..."
}
```

## 🧠 React Concepts Used

* Components
* Props
* State management with `useState`
* Side effects with `useEffect`
* API requests with `fetch`
* Conditional rendering
* Component composition
* Context API for global state management
* Custom hooks
* React Router navigation

## 🔮 Future Improvements

* Add advanced movie filtering
* Add user authentication
* Improve animations and UI interactions
* Add movie trailers
* Improve accessibility

## 📄 License

This project is for educational purposes.
