const apiKey = 'iUnmyJG6q8UgpBceHLPmjYwKba0kkRseEC0brPJM'; 
const apodUrl = `api.nasa.gov{apiKey}&date=2025-11-27`;

fetch(apodUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('La red respondió con un error: ' + response.statusText);
    }
    return response.json(); 
  })
  .then(data => {
    console.log(data); 
    const titulo = data.title;
    const imageUrl = data.url;
    const explicacion = data.explanation;
    const fecha = data.fecha

    document.getElementById('titulo-dia').textContent = titulo;
    document.getElementById('fecha-dia').textContent = fecha
    document.getElementById('imagen-dia').src = imageUrl;
    document.getElementById('explicacion-dia').textContent = explicacion;
  })
  .catch(error => {
    console.error('Hubo un problema con la operación fetch:', error);
  });
