require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());
app.use(express.json());

let accessToken;
let refreshToken;

async function getTokens(code) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://jas6zhang-github-io.vercel.app/',
    })
  });

  const data = await response.json();
  
  return [data.access_token, data.refresh_token];
}

(async () => {
  [accessToken, refreshToken] = await getTokens(process.env.CODE);
})();

async function refreshAccessToken() {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error('Failed to refresh access token');
    }
    accessToken = data.access_token;
    console.log('Access token refreshed');
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

app.get('/current-track', async (req, res) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  if (response.status === 401) {
    console.log("Access token expired, refreshing...");
    await refreshAccessToken();
    response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: 'Bearer ' + accessToken }
    });
  }

  if (response.status === 204) {
    return res.json({ message: 'No track currently playing.' });
  }
  
  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch track' });
  }

  const data = await response.json();

  res.json({
    track: data.item.name,
    artists: data.item.artists.map(a => a.name).join(', '),
    albumArt: data.item.album.images[0].url
  });
});

// first init tokens then start server
(async () => {
  [accessToken, refreshToken] = await getTokens(process.env.CODE);
  app.listen(3000, () => console.log('Server running on port 3000'));
})();
