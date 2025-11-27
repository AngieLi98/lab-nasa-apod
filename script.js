const apiKey = "iUnmyJG6q8UgpBceHLPmjYwKba0kkRseEC0brPJM";

const today = new Date().toISOString().split("T")[0];

document.getElementById("fecha_evento").max = today;

let NasaApod = null;

function cargarAPOD(fecha) {

    const imageUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`;

    fetch(imageUrl)
        .then(res => res.json())
        .then(data => {

            NasaApod = {
                titulo: data.title,
                img: data.url,
                date: data.date,
                descripcion: data.explanation
            };

            console.log("NASA APOD guardado:", NasaApod);

            document.getElementById("imagen-dia").src = NasaApod.img;
            document.getElementById("titulo-dia").textContent = NasaApod.titulo;
            document.getElementById("fecha-dia").textContent = NasaApod.date;
            document.getElementById("explicacion-dia").textContent = NasaApod.descripcion;
        })
        .catch(err => console.error("Error obteniendo NASA APOD:", err));
}

function saveFavorite() {
    if (!NasaApod) return;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some(p => p.date === NasaApod.date);
    if (!existe) favoritos.push(NasaApod);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
}

function updateFavoritesList() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedor = document.getElementById("favoritos");

    contenedor.innerHTML = "";

    favoritos.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${item.titulo}</strong></p>
            <img src="${item.img}" width="200">
            <p>${item.date}</p>
        `;
        contenedor.appendChild(div);
    });
}

document.getElementById("fecha_evento").addEventListener("change", function () {

    if (this.value > today) {
        alert("No puedes elegir fechas futuras.");
        this.value = today; 
        return;
    }

    cargarAPOD(this.value); 
});

cargarAPOD(today);
updateFavoritesList();

