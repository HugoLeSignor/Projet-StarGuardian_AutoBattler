
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';
// menu burger
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".main-navigation");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.querySelectorAll('.character-card');
    const confirmBtn = document.querySelector('.btn-confirm');
    let selectedCharacter = null;

    characterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            // Retirer sélection précédente
            if (selectedCharacter && selectedCharacter !== card) {
                selectedCharacter.classList.remove('selected');
            }

            // Toggle sélection
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedCharacter = null;
                confirmBtn.disabled = true;
            } else {
                card.classList.add('selected');
                selectedCharacter = card;
                confirmBtn.disabled = false;
            }
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (!selectedCharacter) return;

        const heroClass = selectedCharacter.dataset.class;
        const heroName = selectedCharacter.querySelector('.character-name').textContent;

        console.log(`Héros sélectionné : ${heroName} (${heroClass})`);

        // Animation feedback
        selectedCharacter.style.animation = 'pulse 0.4s ease';

        setTimeout(() => {
            alert(`Vous avez choisi : ${heroName}`);
            // window.location.href = `/game/start/${heroClass}`;
        }, 300);
    });
});

// Animation CSS injectée
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);

console.log('assets/app.js chargé ✔');


// // Gestion du menu burger (si nécessaire sur cette page aussi)
// const burger = document.querySelector('.burger');
// const nav = document.querySelector('.main-navigation');

// if (burger) {
//     burger.addEventListener('click', () => {
//         nav.classList.toggle('active');
//     });

//     // Fermer le menu en cliquant sur l'overlay
//     nav.addEventListener('click', (e) => {
//         if (e.target === nav && nav.classList.contains('active')) {
//             nav.classList.remove('active');
//         }
//     });
// }





/*********************************
 * PAGE TEAMS
 *********************************/
document.addEventListener('DOMContentLoaded', () => {

    const portraits = document.querySelectorAll('.team-portrait');
    const details = document.getElementById('teamDetails');
    const selectedList = document.querySelector('.selected-list');
    const launchBtn = document.querySelector('.btn-launch');

    const maxSelection = 3;
    let selectedHeroes = [];

    portraits.forEach(portrait => {

        // Clic sur portrait → affiche détails
        portrait.addEventListener('click', () => {
            portraits.forEach(p => p.classList.remove('active'));
            portrait.classList.add('active');

            // Injecter le panneau de détails + bouton sélectionner
            details.innerHTML = `
                <div class="team-details-content">
                    <h2>${portrait.dataset.name}</h2>
                    <p class="role">${portrait.dataset.role}</p>
                    <div class="gif-container">
                        <img src="${portrait.dataset.gif}" alt="${portrait.dataset.name}">
                    </div>
                    <p class="description">${portrait.dataset.desc}</p>
                    <div class="stats">
                        <div class="stat"><span>ATQ</span>
                            <div class="stat-bar"><div class="stat-fill" style="width:${portrait.dataset.atq}%"></div></div>
                        </div>
                        <div class="stat"><span>DEF</span>
                            <div class="stat-bar"><div class="stat-fill" style="width:${portrait.dataset.def}%"></div></div>
                        </div>
                        <div class="stat"><span>VIT</span>
                            <div class="stat-bar"><div class="stat-fill" style="width:${portrait.dataset.vit}%"></div></div>
                        </div>
                    </div>

                    <button class="btn-select-right">
                        ${selectedHeroes.includes(portrait.dataset.name) ? 'Désélectionner' : 'Sélectionner'}
                    </button>
                </div>
            `;

            // Gestion bouton Sélectionner à droite
            const btnRight = details.querySelector('.btn-select-right');
            btnRight.addEventListener('click', () => {
                const heroName = portrait.dataset.name;

                if (selectedHeroes.includes(heroName)) {
                    // Désélection
                    selectedHeroes = selectedHeroes.filter(h => h !== heroName);
                    portrait.classList.remove('active');
                } else {
                    if (selectedHeroes.length < maxSelection) {
                        selectedHeroes.push(heroName);
                        portrait.classList.add('active');
                    } else {
                        alert("Vous pouvez sélectionner maximum 3 personnages !");
                        return;
                    }
                }

                updateSelectedTeam();
                // Mettre à jour le texte du bouton
                btnRight.textContent = selectedHeroes.includes(heroName) ? 'Désélectionner' : 'Sélectionner';
            });
        });
    });

    // Met à jour la zone équipe sélectionnée
    function updateSelectedTeam() {
        selectedList.innerHTML = '';
        selectedHeroes.forEach(name => {
            const hero = Array.from(portraits).find(p => p.dataset.name === name);
            const clone = hero.cloneNode(true);
            selectedList.appendChild(clone);
        });

        launchBtn.disabled = selectedHeroes.length === 0;
    }

    // Bouton Lancer
    launchBtn.addEventListener('click', () => {
        alert("Partie lancée avec : " + selectedHeroes.join(", "));
        // ici tu peux rediriger vers la page jeu
    });
});




