document.addEventListener("DOMContentLoaded", () => {
    const portraits = document.querySelectorAll(".team-portrait");
    const selectedList = document.querySelector(".selected-list");
    const launchBtn = document.querySelector(".btn-launch");
    let selectedHeroes = [];

    portraits.forEach(portrait => {
        portrait.addEventListener("click", () => {
            const name = portrait.dataset.name;

            if (selectedHeroes.includes(name)) {
                selectedHeroes = selectedHeroes.filter(n => n !== name);
            } else if (selectedHeroes.length < 3) {
                selectedHeroes.push(name);
            }

            // Mettre à jour la liste
            selectedList.innerHTML = selectedHeroes.map(n => `<span>${n}</span>`).join(" | ");

            // Activer le bouton si 3 persos sélectionnés
            launchBtn.disabled = selectedHeroes.length !== 3;
        });
    });

    // ===== LANCER LA RECHERCHE DE MATCH =====
    launchBtn.addEventListener("click", () => {
        if (selectedHeroes.length !== 3) return;

        launchBtn.disabled = true;
        launchBtn.textContent = "Recherche...";

        fetch("/matchmaking/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ characters: selectedHeroes }) // envoi des noms
        })
        .then(res => res.json())
        .then(data => {
            console.log("Recherche lancée :", data);

            // Polling toutes les 3 secondes
            const interval = setInterval(() => {
                fetch("/matchmaking/status")
                    .then(res => res.json())
                    .then(status => {
                        console.log("Statut du match :", status);

                        if (status.status === "match_found") {
                            clearInterval(interval);
                            // Redirige vers la page arena avec l'ID de la bataille
                            window.location.href = `/arena/${status.battle_id}`;
                        }
                    })
                    .catch(err => console.error("Erreur status :", err));
            }, 3000);
        })
        .catch(err => {
            console.error("Erreur search :", err);
            launchBtn.disabled = false;
            launchBtn.textContent = "Lancer la partie";
        });
    });
});