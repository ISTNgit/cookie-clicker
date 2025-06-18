// server/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get chat messages
app.get('/api/chat/:coinId', async (req, res) => {
    try {
        const response = await fetch(
            `https://frontend-api-v3.pump.fun/replies/${req.params.coinId}?limit=1000&offset=0`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});