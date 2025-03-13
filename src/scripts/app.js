"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let situationsData = [];
  let questionCount = 0;
  const maxQuestions = 10;
  let score = 0;

  fetch("assets/json/situations.json")
      .then(response => response.json())
      .then(data => {
          situationsData = data.situations;
          displayRandomSituation(situationsData);
      });

  function displayRandomSituation(situations) {
      if (questionCount >= maxQuestions) {
          displayFinalMessage();
          return;
      }

      questionCount++;
      updateProgressBar();

      const randomIndex = Math.floor(Math.random() * situations.length);
      const situation = situations[randomIndex];

      const card = document.querySelector(".card");
      card.innerHTML = `
          <p class="question">${situation.question}</p>
          <div class="options">
              ${Object.entries(situation.options).map(([key, option]) =>
                  `<label>
                      <input type="radio" class="square-radio" name="response" value="${key}">
                      ${option}
                  </label><br>`
              ).join('')}
          </div>
          <button class="btn--suivant">Suivant</button>
          <div class="progress--container">
              <div class="progress--bar" style="width: ${(questionCount / maxQuestions) * 100}%;"></div>
          </div>
      `;

      // Gestion du bouton "Suivant"
      document.querySelector(".btn--suivant").addEventListener("click", function () {
          const selectedOption = document.querySelector('input[name="response"]:checked');
          if (selectedOption) {
              // Ajouter le score basé sur la réponse choisie
              const responseKey = selectedOption.value;
              score += situation.réponses[responseKey] || 0;
              displayRandomSituation(situations);
          } else {
              alert("Merci de sélectionner une réponse !");
          }
      });
  }

  function updateProgressBar() {
      const progressBar = document.querySelector(".progress--bar");
      if (progressBar) {
          progressBar.style.width = `${(questionCount / maxQuestions) * 100}%`;
      }
  }

  function displayFinalMessage() {
      let message = "";
      if (score >= 8) {
          message = "Bravo, tu es sur la bonne voie ! Tu as bien compris les enjeux et tu fais des choix éclairés. Continue ainsi pour un impact encore plus positif !";
      } else if (score >= 5) {
          message = "Tu es sur la bonne voie, un petit effort supplémentaire et ce sera parfait.";
      } else {
          message = "Oups, il semble que tu aies encore quelques notions à revoir ! Mais pas de panique, chaque erreur est une leçon pour avancer. Continue à t'informer !";
      }

      const card = document.querySelector(".card");
      card.innerHTML = `
          <p class="final-message">Quiz terminé ! 🎉</p>
          <p>Ton score : <strong>${score} / ${maxQuestions}</strong></p>
          <p>${message}</p>
          <button class="btn--rejouer">Rejouer</button>
      `;

      document.querySelector(".btn--rejouer").addEventListener("click", () => {
          score = 0;
          questionCount = 0;
          displayRandomSituation(situationsData);
      });
  }
});
document.addEventListener("DOMContentLoaded", function () {
    let questionsData = [];
    let currentQuestionIndex = 0;
    let selectedNetwork = "";

    // Gestion du clic sur les icônes

  document.querySelectorAll('.reseaux').forEach(reseau => {

    reseau.addEventListener('click', function () {

        if (reseau.classList.contains('discord')) {

            selectedNetwork = "discord";

        } else if (reseau.classList.contains('instagram')) {

            selectedNetwork = "instagram";

        } else if (reseau.classList.contains('facebook')) {

            selectedNetwork = "facebook";

        }
        console.log(`Réseau sélectionné : ${selectedNetwork}`);
        // Charger les questions du réseau sélectionné depuis le fichier JSON

        fetch('assets/json/questions.json')

            .then(response => response.json())

            .then(data => {

                questionsData = data[selectedNetwork].questions;

                currentQuestionIndex = 0; // Réinitialiser l'index du quiz

                displayQuestion(questionsData[currentQuestionIndex]);

            });
             // Masquer la sélection après le choix

          document.querySelector('.choix').style.display = 'none';

        });
  
    });
    function displayQuestion(question) {
  
        const totalQuestions = questionsData.length;
  
        if (currentQuestionIndex >= totalQuestions) {
  
            alert("Fin du questionnaire ! 🎉");
  
            currentQuestionIndex = 0;
  
            displayQuestion(questionsData[currentQuestionIndex]);
  
        }
        const card = document.querySelector(".card1");
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
  
            <div class="progress--container1">
  
                <div class="progress--bar1" style="width: ${(currentQuestionIndex / totalQuestions) * 100}%;"></div>
  
            </div>
  
        `;
        // Gestion du bouton "Suivant"
  
        document.querySelector(".btn--prochain").addEventListener("click", function () {
  
          function displayFinalMessage() {
            let message = "";
            if (score >= 16) {
                message = "Bravo, tu es sur la bonne voie ! Tu as bien compris les enjeux et tu fais des choix éclairés. Continue ainsi pour un impact encore plus positif !";
            } else if (score >= 10) {
                message = "Tu es sur la bonne voie, un petit effort supplémentaire et ce sera parfait.";
            } else {
                message = "Oups, il semble que tu aies encore quelques notions à revoir ! Mais pas de panique, chaque erreur est une leçon pour avancer. Continue à t'informer !";
            }
        
            const card = document.querySelector(".card1");
            card.innerHTML = `
                <p class="final-message">Quiz terminé ! 🎉</p>
                <p>Ton score : <strong>${score} / 20</strong></p>
                <p>${message}</p>
                <button class="btn--rejouer">Rejouer</button>
            `;
        
            document.querySelector(".btn--rejouer").addEventListener("click", () => {
                score = 0;
                questionCount = 0;
                displayRandomSituation(situationsData);
            });
        }
        })        
    }
});
// Récupérer les données JSON depuis le fichier
fetch('assets/json/data.json')
  .then(response => response.json())
  .then(data => {
    // Affichage initial des données de consommation énergétique
    displayEnergyConsumption(data);

    // Ajouter un gestionnaire d'événements pour chaque bouton
    document.querySelector('.btn--conso').addEventListener('click', () => {
      displayEnergyConsumption(data);
      setActiveButton('.btn--conso');
    });
    document.querySelector('.btn--utili').addEventListener('click', () => {
      displayUserCount(data);
      setActiveButton('.btn--utili');
    });
    document.querySelector('.btn--poll').addEventListener('click', () => {
      displayPollution(data);
      setActiveButton('.btn--poll');
    });
  });

  // Code ok pour ajouter/supprimer la classe actif des boutons 
  
  // Fonction pour gérer l'ajout et la suppression de la classe 
  function setActiveButton(buttonClass) {
  
  const buttons = document.querySelectorAll('.btn');
  
  
  buttons.forEach(button => {
    button.classList.remove('btn__actif');
  });
  
  // Ajouter la classe "btn__actif" au bouton cliqué
  const activeButton = document.querySelector(buttonClass);
  if (activeButton) {
    activeButton.classList.add('btn__actif');
  }
}

// Fonction pour afficher la consommation énergétique
function displayEnergyConsumption(data) {
  let html = '';
  const container = document.getElementById('data--container');

  container.innerHTML = '';
  for (let year in data.Consommation_énergétique) {
    html += `
        <p class="p_titre">Consommation énergétique - ${year}</p>
        <div class="conso--${year.split(' ')[1]}__content">
    `;
    for (let platform in data.Consommation_énergétique[year]) {
      const platformData = data.Consommation_énergétique[year][platform];
      html += `
        <div class="conso--${year.split(' ')[1]}__${platform}">
        <p class="p_reseaux">${platform}</p>
        <p class="p_gras">${platformData.Valeur}</p>
        <p class="p">Équivalences:</p>
        <ul>
          <li class="p">Recharger ${platformData.Équivalences.Recharge_smartphone.Nombre_de_charges} fois un smartphone par jour</li> 
          <li class="p">Prendre ${platformData.Équivalences.Douches.Nombre_de_douches} douches de ${platformData.Équivalences.Douches.Durée_par_douche}</li>
        </ul>
        </div>
      `;
    }
    html += `</div>`;
  }
  container.insertAdjacentHTML('beforeend', html);
}

// Fonction pour afficher le nombre d'utilisateurs
function displayUserCount(data) {
  let html = '';
  const container = document.getElementById('data--container');

  // Effacer les anciennes données avant d'ajouter les nouvelles
  container.innerHTML = '';

  for (let year in data.Nombre_utilisateurs) {
    html += `
        <p class="p_titre">Nombre d'utilisateurs - ${year}</p>
        <div class="users--${year.split(' ')[1]}__content">
    `;
    for (let platform in data.Nombre_utilisateurs[year]) {
      const platformData = data.Nombre_utilisateurs[year][platform];
      html += `
        <div class="users--${year.split(' ')[1]}__${platform}">
        <p class="p_reseaux">${platform}</p>
        <p class="p_gras">${platformData.valeur}</p>
        <p class="p">Équivalences:</p>
        <p class="p">${platformData.Équivalences.popu_belge} fois la population Belge</p>
        </div>
      `;
    }
    html += `</div>`;
  }
  container.insertAdjacentHTML('beforeend', html);  // Ajoute les nouvelles données sous les boutons existants
}

// Fonction pour afficher la pollution
function displayPollution(data) {
  let html = '';
  const container = document.getElementById('data--container');

  // Effacer les anciennes données avant d'ajouter les nouvelles
  container.innerHTML = '';

  for (let year in data.Pollution_data_center) {
    html += `
        <p class="p_titre">Pollution des data centers - ${year}</p>
        <div class="pollution--${year.split(' ')[1]}__content">
    `;
    for (let platform in data.Pollution_data_center[year]) {
      const platformData = data.Pollution_data_center[year][platform];
      html += `
        <div class="pollution--${year.split(' ')[1]}__${platform}">
        <p class="p_reseaux">${platform}</p>
        <p class="p_gras">${platformData.CO2}</p>
        <p class="p">Équivalences :</p>
        <ul>
          <li class="p">${platformData.Équivalences.Tours_Terre_voiture} Tours de la Terre en voiture</li>
          <li class="p">${platformData.Équivalences.Steaks_300g} cuisson de steaks de 300g par jour</li>
        </ul>
        </div>
      `;
    }
    html += `</div>`;
  }
  container.insertAdjacentHTML('beforeend', html);  // Ajoute les nouvelles données sous les boutons existants
}