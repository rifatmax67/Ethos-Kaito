const lb = document.getElementById('leaderboard');

fetch('/api/leaderboard')
  .then(res => res.json())
  .then(({ data }) => {
    lb.innerHTML = '';
    data.forEach((kol, i) => {
      const div = document.createElement('div');
      div.className = 'kol';
      div.innerHTML = `
        <span>#${i + 1} – ${kol.author_name}</span>
        <span class="score">${kol.score.toFixed(2)}</span>
      `;
      lb.appendChild(div);
    });
  })
  .catch(err => {
    lb.innerHTML = '<p>Failed to load leaderboard.</p>';
    console.error(err);
  });
