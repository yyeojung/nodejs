const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors({
    origin: '*',
    methods: 'GET',
    allowedHeaders: ['Content-Type'],
  }));

// 프록시 엔드포인트
app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
    console.log(PORT, url)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
