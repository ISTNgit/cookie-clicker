// server/server.ts
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { config } from 'dotenv';
import axios from 'axios';
config();
const app = express();
const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json());
// Get chat messages
app.get('/api/chat/:coinId', async (req, res) => {
    try {
        const response = await axios.get(`https://frontend-api-v3.pump.fun/replies/${req.params.coinId}`, {
            params: {
                limit: 1000,
                offset: 0,
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});
// Serve React static files in production
if (process.env.VITE_ENV_NAME === 'PROD') {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('/{*splat}', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
}
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
