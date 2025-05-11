const API_KEY = 'e431c93af0784bf490afb5760daffd9e'; // Replace with your real key
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${API_KEY}`;

async function loadNews() {
  try {
    const res = await fetch(NEWS_URL);
    const data = await res.json();
    const container = document.getElementById('newsContainer');

    // Set breaking news headline
    const breaking = document.getElementById('breakingNews');
    if (data.articles.length > 0) {
      breaking.textContent = 'Breaking: ' + data.articles[0].title;
    }

    // Add news articles to page
    data.articles.forEach(article => {
      const news = document.createElement('article');
      news.className = 'headline';

      news.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/850x300'}" alt="News Image" />
        <h2>${article.title}</h2>
        <p class="date">${new Date(article.publishedAt).toLocaleDateString()}</p>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more →</a>
      `;

      container.appendChild(news);
    });
  } catch (error) {
    document.getElementById('breakingNews').textContent = 'Unable to load news at the moment.';
    console.error('News load error:', error);
  }
}

loadNews();
