// Just fetch from your backend and display matches

fetch('http://localhost:3000/matches')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('matches');


        if (data.length === 0) {
            container.textContent = 'No matches found.';
            return;
        }

        data.forEach(match => {
            const div = document.createElement('div');
            div.className = 'match';
            div.innerHTML = `
        <strong>${match.team1}</strong> vs <strong>${match.team2}</strong><br>
        <em>${new Date(match.date).toLocaleString()}</em>
      `;
            container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Error fetching matches:', error);
        document.getElementById('matches').textContent = 'Error loading matches.';
    });
