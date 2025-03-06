"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let situationsData = [];
    let questionCount = 0; // Nombre de questions affichées
    const maxQuestions = 10; // Total de questions avant reset

    fetch("assets/json/situations.json")
        .then(response => response.json())
        .then(data => {
            situationsData = data.situations;
            displayRandomSituation(situationsData);
        })
        .catch(error => console.error("Erreur lors du chargement du JSON :", error));

    function displayRandomSituation(situations) {
        if (questionCount >= maxQuestions) {
            alert("Fin du quizz ! 🎉"); 
            questionCount = 0; // Réinitialise le compteur
        }

        questionCount++; // Incrémente le compteur de questions
        updateProgressBar(); // Met à jour la barre de progression

        const randomIndex = Math.floor(Math.random() * situations.length);
        const situation = situations[randomIndex];

        const card = document.querySelector(".card");
        if (!card) {
            console.error("Erreur : Élément .card non trouvé dans le HTML.");
            return;
        }

        // Générer le HTML avec les options et la barre de progression
        card.innerHTML = `
            <p class="question">${situation.question}</p>
            <div class="options">
                ${Object.entries(situation.options).map(([key, option]) => 
                    `<label>
                        <input type="radio" name="response" value="${key}">
                        ${option}
                    </label><br>`
                ).join('')}
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${(questionCount / maxQuestions) * 100}%;"></div>
            </div>
            <button class="btn--suivant">Suivant</button>
        `;

        // Réattacher l'événement du bouton "Suivant"
        document.querySelector(".btn--suivant").addEventListener("click", function () {
            displayRandomSituation(situations);
        });
    }

    function updateProgressBar() {
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
            progressBar.style.width = `${(questionCount / maxQuestions) * 100}%`;
        }
    }
});

