document.addEventListener('DOMContentLoaded', () => {

    const profileStatusElement = document.querySelector('.lanyard-discordStatus');
    
      const fetchLanyardStatus = async () => {
          try {
              const response = await fetch('https://api.lanyard.rest/v1/users/1083501646807576576'); // Cambia el ID por el correcto
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              let statusText = 'No disponible';
              if (data.success && data.data) {
                  const statusDiscord = data.data.discord_status; 
                  if (statusDiscord === 'online') {
                      profileStatusElement.style.backgroundColor = "#00ff00"; 
                      statusText = 'Online';
                  } else if (statusDiscord === 'idle') {
                      profileStatusElement.style.backgroundColor = "#ffff00"; 
                      statusText = 'Idle';
                  } else if (statusDiscord === 'dnd') {
                      profileStatusElement.style.backgroundColor = "rgb(153, 24, 26)"; 
                      statusText = 'Do Not Disturb';
                  } else if (statusDiscord === 'offline') {
                      profileStatusElement.style.backgroundColor = "#808080";
                      statusText = 'Offline';
                  } else {
                      profileStatusElement.style.backgroundColor = "#cccccc"; 
                      statusText = 'Unknown';
                  }  
              } else {
                lanyardStatusElementCode.innerHTML = `
                  <div class="profile-statusCode" style="margin-bottom:10px;">
                    <p>Offline.</p>
                  </div>
                `;
              }
          } catch (error) {
              console.error('Error:', error);
          }
      };
    fetchLanyardStatus();
    });
  
  
    
  