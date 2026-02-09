
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';
import './js/combat.js';
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

    // Vérifier si on est sur la page de sélection de personnages
    if (!confirmBtn || characterCards.length === 0) {
        return; // Sortir si ce n'est pas la bonne page
    }

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


