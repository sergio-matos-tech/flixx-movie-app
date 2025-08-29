# Flixx | Movie & TV Show Discovery App


Flixx is a responsive and dynamic web application for discovering popular and currently playing movies and TV shows. Built with vanilla JavaScript, this project leverages **The Movie Database (TMDb) API** to fetch and display real-time data in a clean, modern interface. It serves as an excellent example of a client-side application that interacts with a third-party RESTful API, manages state, and handles dynamic UI updates without a framework.

**Live Demo:** [https://shenrique08.github.io/flixx-movie-app/]

---

## ✨ Features

-   **Browse Popular Content**: View grids of the most popular movies and TV shows.
-   **"Now Playing" & "On The Air" Sliders**: See currently playing movies and on-the-air TV shows in an interactive, auto-playing slider.
-   **Dedicated Search**: Search for movies on the Movies page and TV shows on the TV Shows page.
-   **Detailed Information**: Click on any movie or show to see more details, including poster, rating, release date, summary, genres, and production companies.
-   **Dynamic Backgrounds**: The details pages feature a beautiful, high-resolution backdrop image from the selected movie or show.
-   **User Feedback**:
    -   A loading spinner is displayed while fetching data from the API.
    -   User-friendly alerts are shown for empty search queries or when no results are found.
-   **Robust Error Handling**: Gracefully handles API errors (e.g., network issues, invalid responses) and informs the user.
-   **Responsive Design**: The UI is fully responsive and works seamlessly on devices of all sizes, from mobile phones to desktop computers.

---

## 🛠️ Technologies & Tools

-   **HTML5**: Semantic markup for structuring the content.
-   **CSS3**: Custom styling using modern features like Flexbox, Grid, and custom properties for a clean and responsive layout.
-   **JavaScript (Vanilla, ES6+)**:
    -   Used for all dynamic functionality, including API requests, DOM manipulation, and state management.
    -   Extensive use of modern features like `async/await` for handling asynchronous operations.
-   **The Movie Database (TMDb) API**: The primary data source for all movie and TV show information.
-   **Swiper.js**: A powerful and modern library for creating the touch-enabled content sliders.
-   **Font Awesome**: For icons used throughout the application.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a web browser and a code editor. To run the project locally, it's recommended to use a live server extension (like the one available for VS Code) to avoid potential CORS issues with local file paths.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/flixx-app.git](https://github.com/your-username/flixx-app.git)
    cd flixx-app
    ```

2.  **Get your TMDb API Key:**
    -   Visit [The Movie Database (TMDb)](https://www.themoviedb.org/signup) and create an account.
    -   Go to your account `Settings > API` and register for an API key.

3.  **Add your API Key to the project:**
    -   Open the `js/script.js` file.
    -   Find the `global` object at the top of the file.
    -   Replace the placeholder value of `apiKey` with your own TMDb API key.
    ```javascript
    const global = {
      // ...
      api: {
        apiKey: 'YOUR_API_KEY_HERE',
        apiUrl: '[https://api.themoviedb.org/3/](https://api.themoviedb.org/3/)',
      },
    };
    ```

4.  **Run the application:**
    -   If you are using VS Code with the "Live Server" extension, simply right-click on `index.html` and select "Open with Live Server".
    -   Otherwise, open the `index.html` file directly in your web browser.

---

## 🔮 Future Improvements

This project has a solid foundation, but there's always room to grow. Here are some potential features for the future:

-   **Genre Filtering**: Allow users to discover movies and shows by genre.
-   **Watchlist/Favorites**: Implement a feature to save content to a personal watchlist using the browser's Local Storage.
-   **Cast & Crew Pages**: Create pages to view details about actors and directors, including their filmography.
-   **Backend Integration**: Develop a backend service (e.g., using Spring Boot, Node.js, or another framework) to manage user accounts, secure the API key, and store watchlists in a database.

