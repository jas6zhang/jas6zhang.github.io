let formats = {"gen9monotyperandombattle", 

setInterval(() => {
  fetch('https://pokemonshowdown.com/ladder/gen9monotyperandombattle.json')
    .then(response => response.json())
    .then(data => {
      // update the graph with the new data
    })
    .catch(error => {
      // handle the error
    });
}, UPDATE_INTERVAL_IN_MILLISECONDS);
