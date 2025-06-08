const apiKey = '41e3a2922e2d45fdb7d8898b62196c6a';
const url = `https://newsapi.org/v2/everything?q=indonesia&language=id&sortBy=publishedAt&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (data.articles.length === 0) {
      newsContainer.innerHTML = '<p>Tidak ada berita ditemukan.</p>';
      return;
    }

    data.articles.forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news';
      newsItem.innerHTML = `
        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="Gambar berita">` : ''}
        <h2>${article.title}</h2>
        <p>${article.description || 'Tidak ada deskripsi.'}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">Baca Selengkapnya</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Gagal mengambil data berita:', error);
    document.getElementById('news-container').innerHTML = '<p>Gagal mengambil data berita.</p>';
  }
}

fetchNews();