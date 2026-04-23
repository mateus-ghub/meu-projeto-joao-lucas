async function buscarMusicas() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");

    if (!query) {
        resultsDiv.innerHTML = "<p>Digite algo para buscar.</p>";
        return;
    }

    resultsDiv.innerHTML = "<p>Buscando...</p>";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
        const data = await response.json();

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p>Nenhuma música encontrada.</p>";
            return;
        }

        resultsDiv.innerHTML = "";

        data.results.forEach(musica => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${musica.artworkUrl100}" alt="capa">
                <h3>${musica.trackName}</h3>
                <p>${musica.artistName}</p>
                <audio controls src="${musica.previewUrl}"></audio>
            `;

            resultsDiv.appendChild(card);
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p>Erro ao buscar músicas.</p>";
        console.error(error);
    }
}