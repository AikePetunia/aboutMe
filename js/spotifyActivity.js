
document.addEventListener('DOMContentLoaded', () => {
  const lanyardStatusElementSpotify = document.getElementById('lanyard-statusSpotify');
  
    const fetchLanyardStatus = async () => {
        try {
            const response = await fetch('https://api.lanyard.rest/v1/users/1083501646807576576');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            const data = await response.json();
            let statusText = 'Im not listening anything';
            
                
                const spotifyListeningTo = data.data.spotify;
  
                if (spotifyListeningTo) {
                    const artist = spotifyListeningTo.artist; 
                    const songName = spotifyListeningTo.song; 
                    const album = spotifyListeningTo.album; 
                    const albumArtUrl = spotifyListeningTo.album_art_url; 
                    const trackId = spotifyListeningTo.track_id; 
                    const songLink = `https://open.spotify.com/track/${trackId}`; 
                    
                    const startTimestamp = spotifyListeningTo.timestamps.start;
                    const endTimestamp = spotifyListeningTo.timestamps.end;
                    const songDuration = endTimestamp - startTimestamp;
  
                    const updateProgress = () => {
                        const currentTime = Date.now(); 
                        const progress = currentTime - startTimestamp; 
  
                        const formatTime = (ms) => {
                            const minutes = Math.floor(ms / 60000);
                            const seconds = ((ms % 60000) / 1000).toFixed(0);
                            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        };
  
                        const formattedDuration = formatTime(songDuration);
                        const formattedProgress = formatTime(progress);
                        const progressPercentage = (progress / songDuration) * 100;
  
                        lanyardStatusElementSpotify.innerHTML = `
                            <div style="display: flex; align-items: center;">
                                <img src="${albumArtUrl}" alt="Album Art" style="width: 100px; height: 100px; margin-right: 15px;" />
                                <div style="flex-grow: 1;">
                                    <a href="${songLink}" style="text-decoration: none; color: black; font-weight: bold; font-size: 18px;">
                                        ${songName}
                                    </a>
                                    <p style="margin: 5px 0; font-size: 12px; color: gray;">${album}</p>
                                    <p style="margin: 5px 0;"> ${artist}</p>
                                    <div style="display: flex; align-items: center;">
                                        <span style="font-size: 12px; margin-right: 5px;">${formattedProgress}</span>
                                        <div style="flex-grow: 1; height: 5px; background-color: #ddd; position: relative;">
                                            <div style="width: ${progressPercentage}%; height: 100%; background-color: #1DB954;"></div>
                                        </div>
                                        <span style="font-size: 12px; margin-left: 5px;">${formattedDuration}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    };
                    updateProgress(); 
                    setInterval(updateProgress, 1000); 
                } else {
                    lanyardStatusElementSpotify.innerHTML = `<p>${statusText}</p>`;
                }
            } 
        catch (error) {
            lanyardStatusElementSpotify.innerHTML = '<p>Error al obtener datos.</p>';
            console.error('Error:', error);
        }

        
    };

    
  
    fetchLanyardStatus();
  });


  
