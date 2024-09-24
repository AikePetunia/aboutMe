document.addEventListener('DOMContentLoaded', () => {
  const lanyardStatusElementCode = document.getElementById('lanyard-statusCode');

  const fetchLanyardStatus = async () => {
    try {
      const response = await fetch('https://api.lanyard.rest/v1/users/1083501646807576576'); // Cambia el ID por el correcto
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const activities = data.data.activities || [];
      displayCodeActivity(activities);
      console.log(data.data.activities);

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

  const displayCodeActivity = (activities) => {
    const codeActivity = activities.find(activity => activity.name === "Code");

    if (codeActivity) {
      const assets = codeActivity.assets || {};
      const largeImageUrl = getImageUrl(assets.large_image, codeActivity.application_id);
      const smallImageUrl = getImageUrl(assets.small_image, codeActivity.application_id);
      const largeText = assets.large_text || 'No disponible';
      const startTime = codeActivity.timestamps ? codeActivity.timestamps.start : Date.now();
      const elapsedTime = formatElapsedTime(Date.now() - startTime);
      const fileName = codeActivity.state ? codeActivity.state.split(':')[0] : 'Desconocido';

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

      console.log(codeActivity.details);
      console.log('Tiempo trabajado:', elapsedTime);
      console.log('Nombre del archivo:', fileName);
    } else {
      lanyardStatusElementCode.innerHTML = `
        <div class="profile-statusCode" style="margin-bottom:10px;">
          <p>Offline.</p>
        </div>
      `;
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
