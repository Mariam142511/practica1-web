console.log("script.js cargó");

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("texto");
  const btn   = document.getElementById("boton");
  const out   = document.getElementById("resultado");

  const apiKey = "dc9c7974"; 

  async function buscarPelicula() {
    const titulo = input.value.trim();
    if (!titulo) {
      out.textContent = "Por favor, escribe el nombre de una película.";
      return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;
    console.log("Consultando:", url);

    try {
      out.textContent = "Buscando…";
      const resp = await fetch(url);
      const datos = await resp.json();
      console.log("Respuesta OMDb:", datos);

      if (datos.Response === "False") {
        out.textContent = "Película no encontrada ";
        return;
      }

      // Muestra director y año
      out.textContent = ` ${datos.Title} — Director: ${datos.Director} | Año: ${datos.Year}`;

      // Si quieres también el póster, cambia por:
      // out.innerHTML = ` ${datos.Title} — Director: ${datos.Director} | Año: ${datos.Year}<br><img src="${datos.Poster}" alt="Póster de ${datos.Title}">`;
    } catch (e) {
      console.error("Error OMDb:", e);
      out.textContent = "Error de conexión con la API.";
    }
  }

  // Click y Enter
  btn.addEventListener("click", buscarPelicula);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") buscarPelicula(); });
});

