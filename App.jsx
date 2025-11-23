import React, { useState } from "react";
import "./App.css";

const ARTICLES_DATA = [
  {
    id: 1,
    title: "Sovereignty Isn’t Just about Military Strength",
    category: "Politics",
    readingTime: "7 min",
    coreTakeaway:
      "Canada’s sovereignty depends not just on military power but on strong diplomacy, focused foreign policy, and competent intelligence handling.",
    bullets: [
      "Sovereignty means more than having a modern military; it also requires smart diplomacy, clear foreign policy, and strong intelligence services.",
      "Canada faces growing threats such as foreign interference in elections, Russian aggression, China’s interest in the Arctic, and supply chain vulnerabilities.",
      "Historically, Canadian diplomacy punched above its weight, helping shape institutions like the IMF, NATO, and anti-apartheid efforts.",
      "Today, foreign policy is unfocused and sometimes reduced to slogans or virtue signalling rather than hard strategic choices.",
      "Canada needs to concentrate its diplomatic resources on key partners like South Korea, Japan, and select ASEAN countries.",
      "The foreign service is too centralized and bureaucratic, with not enough authority and support given to diplomats abroad.",
      "Canada’s intelligence ecosystem has been exposed as fragmented and poorly coordinated, especially in handling foreign interference information.",
      "Membership in the Five Eyes alliance is valuable, but Canada still mishandled intelligence flows and failed to act with urgency.",
      "Public inquiries found that information on foreign interference often didn’t reach the right decision-makers or wasn’t properly understood.",
      "To protect sovereignty, Canada must invest in better diplomatic talent, clearer priorities, and more serious intelligence processes.",
    ],
  },
  {
    id: 2,
    title: "I Was Raised on Fairy Tales. No Wonder My Love Life Was Chaos",
    category: "Memoir",
    readingTime: "8 min",
    coreTakeaway:
      "Growing up on fairy tales shaped the author’s expectations of romance, leading to unrealistic scripts about love that she only fully questions later in life.",
    bullets: [
      "The essay opens in a small Toronto hair salon, where a casual chat about old boyfriends turns into a reflection on fairy tales and romance.",
      "The author notices how stories like Sleeping Beauty, Cinderella, and Little Red Riding Hood taught girls to be good, stay on the path, and wait to be rescued.",
      "She realizes that many of her own romantic relationships followed these scripts, from being 'kissed awake' to following charming but dangerous 'wolves.'",
      "Conversations with friends highlight how aging changes the body but not the inner sense of self; many women still feel young on the inside.",
      "The author describes her quirky, cluttered home and the sticky notes on her mirrors as she tries to understand the themes of her life.",
      "She revisits an old childhood book, The Blue Fairy Book, and sees how deeply those narratives of princes, peasants, and magical rescues shaped her desires.",
      "Fairy tales, she suggests, may have 'groomed' generations of girls to sacrifice themselves for love and to prioritize romance over their own dreams.",
      "Despite the pain and chaos, she also sees aging as a chance to reinterpret her story and reclaim her identity beyond those early myths.",
      "She reflects that all of us create myths out of our lives, using stories to make sense of regret, chance, and the many plot twists we go through.",
      "The essay ends with the idea that fairy tales are powerful but not true, and that part of growing older is learning to tell more honest stories about ourselves.",
    ],
  },
  {
    id: 3,
    title: "Publishing Can’t Quit Its Obsession with Buzzy Stories",
    category: "Journalism",
    readingTime: "4 min",
    coreTakeaway:
      "Publishing’s obsession with clicky, buzzy stories can undermine experimentation and long-term value, even though analytics are also useful tools.",
    bullets: [
      "The piece starts with an example: a seemingly niche story about cobalt and Canada’s resources unexpectedly draws 150,000 readers in two days.",
      "Editors constantly juggle trends, budgets, and instincts when deciding what stories to assign; every choice is a negotiation between ambition and resources.",
      "Editorial judgment reflects a newsroom’s identity, values, and the assumptions it wants to challenge.",
      "Relying too heavily on traffic numbers can discourage important but less 'buzzy' topics like climate change, policy, or literary criticism.",
      "Analytics dashboards are powerful and can help editors understand what readers respond to, but they can also narrow creative possibilities.",
      "The industry’s focus on short-term performance mirrors book publishing’s obsession with an author’s sales 'track,' which makes it harder to support risky or unconventional work.",
      "Treating low-click stories as failures reduces tolerance for experimentation, emerging writers, and complex investigations.",
      "The author argues that a publication’s job is not only to meet reader expectations but to create them, much like a good conversation that surprises you.",
      "Balancing what performs with what matters is crucial for maintaining both editorial integrity and audience engagement.",
    ],
  },
];

function App() {
  const [streak, setStreak] = useState(5);
  const [articlesReadToday, setArticlesReadToday] = useState(2);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [readArticleIds, setReadArticleIds] = useState(new Set()); // Track specific read articles for today

  const handleReadSummary = (article) => {
    setSelectedArticle(article);
    // On mobile, you might want to scroll to the summary, but standard flow is fine.
    // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleMarkAsRead = () => {
    if (selectedArticle && !readArticleIds.has(selectedArticle.id)) {
      setArticlesReadToday((prev) => prev + 1);
      // Optional: Increment streak if it's the first one today?
      // The prompt says "Optionally increment a fake streak state too."
      // Let's just increment it to give feedback.
      setStreak((prev) => prev + 1);

      setReadArticleIds((prev) => new Set(prev).add(selectedArticle.id));
    }
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="brand">Walrus Summaries Prototype</div>
        <div className="gamification-stats">
          <span className="streak" role="img" aria-label="streak">
            🔥 {streak}-day streak
          </span>
          <span className="xp" role="img" aria-label="articles read">
            ⭐ {articlesReadToday} articles today
          </span>
        </div>
      </header>

      <main className="main-content">
        {/* Article List Section */}
        <section className="article-list">
          <div className="section-title">Today's Picks</div>
          {ARTICLES_DATA.map((article) => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => handleReadSummary(article)}
            >
              <div className="card-header">
                <span className="article-category">{article.category}</span>
                <span className="reading-time">{article.readingTime} read</span>
              </div>
              <h3 className="article-title">{article.title}</h3>
              <button className="read-btn">Read summary</button>
            </div>
          ))}
        </section>

        {/* Summary View Section */}
        {selectedArticle && (
          <section className="summary-panel">
            <div className="summary-header">
              <span className="summary-category">
                {selectedArticle.category}
              </span>
              <h2 className="summary-title">{selectedArticle.title}</h2>
            </div>

            <div className="core-takeaway">
              <strong>Core Takeaway:</strong> {selectedArticle.coreTakeaway}
            </div>

            <ul className="bullet-list">
              {selectedArticle.bullets.map((bullet, index) => (
                <li key={index} className="bullet-item">
                  {bullet}
                </li>
              ))}
            </ul>

            <button
              className="mark-read-btn"
              onClick={handleMarkAsRead}
              disabled={readArticleIds.has(selectedArticle.id)}
            >
              {readArticleIds.has(selectedArticle.id)
                ? "Marked as Read ✓"
                : "Mark as read"}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
