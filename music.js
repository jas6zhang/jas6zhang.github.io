async function fetchCurrentTrack() {
  try {
    const res = await fetch('http://localhost:3000/current-track');
    const data = await res.json();

    const trackInfo = document.getElementById('trackInfo');
    const albumArt = document.getElementById('albumArt');

    if (data.message) {
      trackInfo.textContent = data.message;
      albumArt.style.display = 'none';
    } else {
      trackInfo.textContent = `${data.track} by ${data.artists}`;
      albumArt.src = data.albumArt;
      albumArt.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching track:', error);
  }
}

// Call the function once initially
fetchCurrentTrack();

// Optional: Refresh every 10 seconds
setInterval(fetchCurrentTrack, 10000);
