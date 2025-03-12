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
            <button class="btn--suivant">Suivant</button>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${(questionCount / maxQuestions) * 100}%;"></div>
            </div>
            
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

document.addEventListener("DOMContentLoaded", function () {
    let questionsData = [];
    let currentQuestionIndex = 0; // Index de la question affichée

    fetch("assets/json/questions.json")
        .then(response => response.json())
        .then(data => {
            questionsData = data.questions;
            displayQuestion(questionsData[currentQuestionIndex]);
        })

    function displayQuestion(question) {
        const totalQuestions = questionsData.length;
        if (currentQuestionIndex >= totalQuestions) {
            alert("Fin du questionnaire ! 🎉");
            currentQuestionIndex = 0; // Réinitialiser le quiz
        }

        const card = document.querySelector(".card1");
        if (!card) {
            console.error("Erreur : Élément .card non trouvé dans le HTML.");
            return;
        }

        // Générer le HTML avec la question, les 4 options et la barre de progression
        card.innerHTML = `
            <p class="question">${question.question}</p>
            <div class="options">
                ${Object.entries(question.options).map(([key, option]) => 
                    `<label>
                        <input type="radio" name="response" value="${key}">
                        ${option}
                    </label><br>`
                ).join('')}
            </div>
            <button class="btn--prochain">Suivant</button>
            <div class="progress-container1">
                <div class="progress-bar1" style="width: ${(currentQuestionIndex / totalQuestions) * 100}%;"></div>
            </div>
            
        `;

        // Réattacher l'événement du bouton "prochain"
        document.querySelector(".btn--prochain").addEventListener("click", function () {
            currentQuestionIndex++; // Passer à la question suivante
            if (currentQuestionIndex < totalQuestions) {
                displayQuestion(questionsData[currentQuestionIndex]);
            } else {
                alert("Fin du questionnaire ! 🎉");
                currentQuestionIndex = 0;
                displayQuestion(questionsData[currentQuestionIndex]); // Recommence
            }
        });
    }
});



// Récupérer les données JSON depuis le fichier
fetch('assets/json/data.json')
  .then(response => response.json())
  .then(data => {
    // Ajouter un gestionnaire d'événements pour chaque bouton
    document.querySelector('.btn--conso').addEventListener('click', () => displayEnergyConsumption(data));
    document.querySelector('.btn--utili').addEventListener('click', () => displayUserCount(data));
    document.querySelector('.btn--poll').addEventListener('click', () => displayPollution(data));
  })

// Fonction pour afficher la consommation énergétique
function displayEnergyConsumption(data) {
  let html = '';
  for (let year in data.Consommation_énergétique) {
    html += `<p>Consommation énergétique - ${year}</p>`;
    for (let platform in data.Consommation_énergétique[year]) {
      const platformData = data.Consommation_énergétique[year][platform];
      html += `
        <p>${platform}</p>
        <p>${platformData.Valeur}</p>
        <p>Équivalences:</p>
        <ul>
          <li>Recharger ${platformData.Équivalences.Recharge_smartphone.Nombre_de_charges} fois un smarphones par jour </li> Ou
          <li>Prendre ${platformData.Équivalences.Douches.Nombre_de_douches} douches de ${platformData.Équivalences.Douches.Durée_par_douche}</li>
        </ul>
      `;
    }
  }
  document.getElementById('data--container').innerHTML = html;
}

// Fonction pour afficher le nombre d'utilisateurs
function displayUserCount(data) {
  let html = '';
  for (let year in data.Nombre_utilisateurs) {
    html += `<h2>Nombre d'utilisateurs - ${year}</h2>`;
    for (let platform in data.Nombre_utilisateurs[year]) {
      const platformData = data.Nombre_utilisateurs[year][platform];
      html += `
        <h3>${platform}</h3>
        <p>Nombre d'utilisateurs: ${platformData.valeur}</p>
        <p>Équivalences:</p>
        <p>${platformData.Équivalences.popu_belge} fois la population Belge </p>
      `;
    }
  }
  document.getElementById('data--container').innerHTML = html;
}

// Fonction pour afficher la pollution
function displayPollution(data) {
  let html = '';
  for (let year in data.Pollution_data_center) {
    html += `<p class="p_titre">Pollution des data centers - ${year}</p>`;
    html += `<div class="grid-container">`; // Conteneur en grille
    for (let platform in data.Pollution_data_center[year]) {
      const platformData = data.Pollution_data_center[year][platform];
      html += `
        <div class="grid-item">
          <p class="p_resaux">${platform}</p>
          <p>${platformData.CO2} émis</p>
          <p>Équivalences :</p>
          <ul>
            <li>${platformData.Équivalences.Tours_Terre_voiture} Tours de la Terre en voiture</li>
            <li>${platformData.Équivalences.Steaks_300g} cuisson de steaks de 300g par jour</li>
          </ul>
        </div>
      `;
    }
    html += `</div>`; // Fermeture de la grid-container
  }
  document.getElementById('data--container').innerHTML = html;
}

