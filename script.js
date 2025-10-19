// script.js
async function buscarPelicula() {
  const titulo = document.getElementById("texto")?.value.trim();
  if (!titulo) {
    alert("Por favor, escribe el nombre de una película.");
    return;
  }

  const apiKey = "dc9c7974"; 
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.Response === "False") {
      document.getElementById("resultado").textContent = "Película no encontrada ";
      return;
    }

    const info = `🎥 ${datos.Title} — Director: ${datos.Director} | Año: ${datos.Year}`;
    document.getElementById("resultado").textContent = info;
    console.log("Datos OMDb:", datos); // útil para depurar en F12 → Console
  } catch (err) {
    console.error("Error al conectar con OMDb:", err);
    document.getElementById("resultado").textContent = "Error de conexión con la API.";
  }
}

// Conecta el botón a la función (asegúrate de tener <button id="boton">)
document.getElementById("boton").addEventListener("click", buscarPelicula);
