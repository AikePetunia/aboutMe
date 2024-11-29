document.addEventListener('DOMContentLoaded', () => {
  const lanyardStatusElementCode = document.getElementById('lanyard-statusCode');

  const localTimeElement = document.getElementById('local-time');

  const getMyLocalTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires' });
  };

  const fetchLanyardStatus = async () => {
    try {
      const response = await fetch('https://api.lanyard.rest/v1/users/1083501646807576576'); // Cambia el ID por el correcto
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const activities = data.data.activities || [];
      displayActivity(activities);
      console.log(data.data.activities);
      console.log(data);

    } catch (error) {
      lanyardStatusElementCode.innerHTML = '<p>Error al obtener datos.</p>';
      console.error('Error:', error);
    }
  };

  const getImageUrl = (imageUrl, applicationId) => {
    if (imageUrl.startsWith('mp:external')) {
      return `https://media.discordapp.net/${imageUrl.replace('mp:', '')}`;
    } else {
      return `https://cdn.discordapp.com/app-assets/${applicationId}/${imageUrl}`;
    }
  };

  const displayActivity = (activities) => {
    const codeActivity = activities.find(activity => activity.name === "Code");
    const mathActivity = activities.find(activity => activity.name === "Obsidian");

    if (codeActivity) {
      const assets = codeActivity.assets || {};
      const largeImageUrl = getImageUrl(assets.large_image, codeActivity.application_id);
      const smallImageUrl = getImageUrl(assets.small_image, codeActivity.application_id);
      const largeText = assets.large_text || 'No disponible';
      const startTime = codeActivity.timestamps ? codeActivity.timestamps.start : Date.now();
      const fileName = codeActivity.state ? codeActivity.state.split(':')[0] : 'Unknown';

      const updateElapsedTime = () => {
        const elapsedTime = formatElapsedTime(Date.now() - startTime);
        lanyardStatusElementCode.innerHTML = `
          <div class="profile-statusCode" style="margin-bottom:10px;">
            <div style="display: flex; align-items: center;">
              <div style="flex: 1;">
                <p style="font-size: 16px; font-weight: bold; margin: 0;">${fileName}</p>
                <p style="font-size: 14px; color: #00ff00; margin: 5px 0;">${elapsedTime}</p>
                <p>${codeActivity.details || ''}</p>
              </div>
              <img src="${largeImageUrl}" alt="Lenguaje de programación" style="width: 100px; height: 100px; border-radius: 8px; margin-left: 20px;" />
            </div>
          </div>
        `;
      };
      setInterval(updateElapsedTime, 1000);
      //console.log(codeActivity.details);
      //console.log('Work time:', elapsedTime);
      //console.log('File name:', fileName); 
    } 

    if (mathActivity || codeActivity == false) {
      console.log(mathActivity);

      const assets = mathActivity.assets || {};
      const obsidianLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/2023_Obsidian_logo.svg/512px-2023_Obsidian_logo.svg.png';
      const subject = 'Álgebra & Calculus';
      const startTime = mathActivity.timestamps ? mathActivity.timestamps.start : Date.now();

      const updateElapsedTime = () => {
        const elapsedTime = formatElapsedTime(Date.now() - startTime);
        lanyardStatusElementCode.innerHTML = `
          <div class="profile-statusCode" style="margin-bottom:10px;">
            <div style="display: flex; align-items: center;">
              <div style="flex: 1;">
                <p style="font-size: 16px; font-weight: bold; margin: 0;">${subject}</p>
                <p style="font-size: 14px; color: #00ff00; margin: 5px 0;">${elapsedTime}</p>
                <p>${mathActivity.details || ''}</p>
              </div>
              <img src="${obsidianLogo}" alt="obsidian" style="width: 100px; height: 100px; border-radius: 8px; margin-left: 20px;" />
            </div>
          </div>
        `;
      };

      updateElapsedTime();
      setInterval(updateElapsedTime, 1000);

      console.log(assets);
    }
  };

  const formatElapsedTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  fetchLanyardStatus();
});
