const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = 'ec788679-c006-4b4a-b978-efd51dc96193';
app.use(cors());

app.get('/matches', async (req, res) => {
    try {
        // Fetch NBA games from balldontlie
        const response = await axios.get('https://api.balldontlie.io/v1/games', {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            params: {
                start_date: '2024-11-13',
                end_date: '2024-11-14',
            }
        });

        // Transform data to a simpler structure
        const matches = response.data.data.map(game => ({
            team1: game.home_team.full_name,
            team2: game.visitor_team.full_name,
            date: game.date,
        }));

        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
