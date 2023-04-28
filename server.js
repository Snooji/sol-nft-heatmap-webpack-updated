const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const API_URL = 'https://rest-api.hellomoon.io/v0/nft/collection/leaderboard/stats';

app.get('https://rest-api.hellomoon.io/v0/nft/collection/leaderboard/stats', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer 7f5a84f7-990c-41a0-81d1-e62a32a50fe9',
      },
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data from the API.');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
