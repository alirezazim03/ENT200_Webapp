import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import { ARTICLES_DATA } from "./data";

// --- Components ---

const HomePage = ({ articles, streak, articlesReadToday }) => {
  return (
    <div className="app-container page-transition">
      <header className="top-bar">
        <div className="brand">Briefly.</div>
        <Link to="/stats" className="stats-link">
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          {streak}
        </Link>
      </header>

      <main className="main-content">
        <div className="section-title">Today's Picks</div>
        <div className="article-list">
          {articles.map((article) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              style={{ textDecoration: "none" }}
            >
              <div className="article-card">
                <div className="card-meta">
                  <span className="category-tag">{article.category}</span>
                  <span className="read-time">{article.readingTime}</span>
                </div>
                <h3 className="card-title">{article.title}</h3>
                <div className="read-action">
                  Tap to read summary <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

const StatsPage = ({ streak, articlesReadToday }) => {
  return (
    <div className="app-container page-transition">
      <div className="stats-page">
        <h1 className="stats-header">Your Progress</h1>

        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span
            className="stat-value"
            style={{ color: "var(--accent-secondary)" }}
          >
            {streak}
          </span>
          <span className="stat-label">Day Streak</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span
            className="stat-value"
            style={{ color: "var(--accent-tertiary)" }}
          >
            {articlesReadToday}
          </span>
          <span className="stat-label">Articles Read Today</span>
        </div>

        <Link to="/" className="back-home-btn">
          Close
        </Link>
      </div>
    </div>
  );
};

const ArticleStory = ({ articles, onMarkRead, readArticleIds }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id));

  // Slides: 0 = Title, 1...N = Bullets, N+1 = Finish
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!article) return <div>Article not found</div>;

  const totalSlides = 1 + article.bullets.length + 1; // Title + Bullets + End

  const handleTap = (direction) => {
    if (direction === "next") {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        // End of story, go back home
        navigate("/");
      }
    } else {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }
  };

  const handleFinish = (e) => {
    e.stopPropagation();
    onMarkRead(article.id);
    navigate("/");
  };

  // Determine content based on slide index
  let content;
  if (currentSlide === 0) {
    // Title Slide
    content = (
      <div className="story-header-slide page-transition">
        <span className="story-category">{article.category}</span>
        <h1 className="story-main-title">{article.title}</h1>
        <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#888" }}>
          {article.readingTime} read summary
        </p>
      </div>
    );
  } else if (currentSlide <= article.bullets.length) {
    // Bullet Slides
    const bulletIndex = currentSlide - 1;
    content = (
      <div className="page-transition">
        <p className="story-bullet">{article.bullets[bulletIndex]}</p>
      </div>
    );
  } else {
    // Completion Slide
    const isRead = readArticleIds.has(article.id);
    content = (
      <div className="completion-slide">
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Summary Complete!
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#aaa", marginBottom: "2rem" }}>
          {article.coreTakeaway}
        </p>
        <button className="finish-btn" onClick={handleFinish}>
          {isRead ? "Back to Home" : "Mark as Read & Finish"}
        </button>
      </div>
    );
  }

  return (
    <div className="story-container">
      {/* Progress Bars */}
      <div className="story-progress-bar">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className="progress-segment">
            <div
              className={`progress-fill ${i < currentSlide ? "active" : ""} ${
                i === currentSlide ? "active" : "empty"
              }`}
              style={{
                width:
                  i < currentSlide
                    ? "100%"
                    : i === currentSlide
                    ? "100%"
                    : "0%",
              }} // Simplified for now, could animate partial fill
            />
          </div>
        ))}
      </div>

      <button className="close-story-btn" onClick={() => navigate("/")}>
        ×
      </button>

      {/* Tap Zones */}
      <div className="tap-zone tap-left" onClick={() => handleTap("prev")} />
      <div className="tap-zone tap-right" onClick={() => handleTap("next")} />

      {/* Content */}
      <div className="story-content">{content}</div>
    </div>
  );
};

// --- Main App Container ---

function App() {
  const [streak, setStreak] = useState(5);
  const [articlesReadToday, setArticlesReadToday] = useState(2);
  const [readArticleIds, setReadArticleIds] = useState(new Set());

  const handleMarkAsRead = (articleId) => {
    if (!readArticleIds.has(articleId)) {
      setArticlesReadToday((prev) => prev + 1);
      setStreak((prev) => prev + 1); // Simple increment logic
      setReadArticleIds((prev) => new Set(prev).add(articleId));
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              articles={ARTICLES_DATA}
              streak={streak}
              articlesReadToday={articlesReadToday}
            />
          }
        />
        <Route
          path="/article/:id"
          element={
            <ArticleStory
              articles={ARTICLES_DATA}
              onMarkRead={handleMarkAsRead}
              readArticleIds={readArticleIds}
            />
          }
        />
        <Route
          path="/stats"
          element={
            <StatsPage streak={streak} articlesReadToday={articlesReadToday} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
