// Variables principales
let nombreDePigeons = 1; // Compteur total de pigeons
let pigeonsParClic = 1;  // Nombre de pigeons produits par clic
const maxPigeonsActifs = 50; // Limite de pigeons actifs sur la page

// Améliorations disponibles
let upgrades = {
    1: { cost: 10, multiplier: 2, description: "Double les pigeons par clic." },
    2: { cost: 50, multiplier: 1, description: "Augmente passivement la production par seconde." },
    // Nouvelle amélioration : Nids stratégiques
    3: { cost: 200, multiplier: 5, description: "Ajoute une production passive de 5 pigeons/seconde." },
    // Nouvelle amélioration : Drone Pigeon
    4: { cost: 500, multiplier: 10, description: "Drone Pigeon : Augmente massivement la production par clic." }
};

// Fonction pour générer des positions aléatoires
function positionAleatoire() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    return { x, y };
}

// Fonction pour créer un certain nombre de pigeons
function creerPigeons(nombre) {
    const pigeonsActuels = document.querySelectorAll('.pigeon').length;

    // Vérifie si le nombre actuel de pigeons est inférieur à la limite
    if (pigeonsActuels >= maxPigeonsActifs) return;

    const pigeonsAAjouter = Math.min(nombre, maxPigeonsActifs - pigeonsActuels);

    for (let i = 0; i < pigeonsAAjouter; i++) {
        const nouvellePosition = positionAleatoire();

        // Crée une nouvelle image de pigeon
        const nouveauPigeon = document.createElement('img');
        nouveauPigeon.src = 'assets/images/pigeon.png';
        nouveauPigeon.style.position = 'absolute';
        nouveauPigeon.style.left = `${nouvellePosition.x}px`;
        nouveauPigeon.style.top = `${nouvellePosition.y}px`;
        nouveauPigeon.style.width = '50px';
        nouveauPigeon.style.cursor = 'pointer';
        nouveauPigeon.classList.add('pigeon'); // Classe pour l'animation

        // Ajoute le pigeon à la page
        document.body.appendChild(nouveauPigeon);

        // Ajoute l'événement de clic au nouveau pigeon
        nouveauPigeon.addEventListener('click', () => creerPigeons(pigeonsParClic));

        // Lance la disparition après 3 secondes
        setTimeout(() => {
            nouveauPigeon.classList.add('disparition');
            setTimeout(() => {
                nouveauPigeon.remove();
            }, 500); // Temps de l'animation de disparition
        }, 0); // Le pigeon reste visible 3 secondes
    }

    // Met à jour le compteur
    nombreDePigeons += pigeonsAAjouter;
    updateUI();
}


// Fonction mise à jour pour les nids stratégiques
function startStrategicNests() {
    setInterval(() => {
        nombreDePigeons += upgrades[3].multiplier;
        updateUI();
    }, 1000);
}

// Appeler dans buyUpgrade si l'amélioration "Nids stratégiques" est achetée
function buyUpgrade(upgradeId) {
    if (nombreDePigeons >= upgrades[upgradeId].cost) {
        nombreDePigeons -= upgrades[upgradeId].cost;

        if (upgradeId === 1) {
            pigeonsParClic *= upgrades[upgradeId].multiplier;
        } else if (upgradeId === 2) {
            startAutoProduction(upgrades[upgradeId].multiplier);
        } else if (upgradeId === 3) {
            startStrategicNests();
        }if (upgradeId === 4) {
            pigeonsParClic += upgrades[upgradeId].multiplier; // Boost énorme pour les clics
        }
        upgrades[upgradeId].cost *= 2; // Le coût double à chaque achat
        updateUI();
    }
}

// Fonction pour démarrer la production automatique
function startAutoProduction(multiplier) {
    setInterval(() => {
        nombreDePigeons += multiplier;
        updateUI();
    }, 1000); // Ajoute des pigeons chaque seconde
}

// Fonction pour mettre à jour l'interface
function updateUI() {
    document.getElementById('compteur').textContent = nombreDePigeons;

    for (let id in upgrades) {
        document.getElementById(`cost${id}`).textContent = upgrades[id].cost;
        document.getElementById(`upgrade${id}`).disabled = nombreDePigeons < upgrades[id].cost;
    }

    updateProgressBar(); // Mise à jour de la barre de progression
    updateObjectif();    // Mise à jour des objectifs dynamiques
    updateObjectif2();    // Mise à jour des objectifs2 dynamiques
}


// Gestion du clic sur le pigeon initial
document.getElementById('pigeon').addEventListener('click', () => {
    creerPigeons(pigeonsParClic);
});

// Liste des objectifs
let objectifs = [
    { seuil: 10, message: "Conquête de la Rue : Atteignez 10 pigeons pour progresser." },
    { seuil: 100, message: "Conquête du Quartier : Atteignez 100 pigeons pour prendre le contrôle du quartier." },
    { seuil: 1000, message: "Conquête de la Ville : Atteignez 1 000 pigeons pour régner sur une ville entière." },
    { seuil: 10000, message: "Domination Mondiale : Atteignez 10 000 pigeons pour conquérir le monde." },
    { seuil: 100000, message: "Conquête de l'Espace : Atteignez 100 000 pigeons pour voyager dans l'espace." }
];

let objectifIndex = 0; // Index du premier objectif

// Gestion des barres de progression
function updateProgressBar() {
    const prochainePuissanceDeDix = Math.pow(10, Math.ceil(Math.log10(nombreDePigeons + 1)));
    const barre = document.getElementById('progress-bar');
    const progression = (nombreDePigeons / objectifs[objectifIndex].seuil) * 100;
    barre.style.width = `${progression}%`;
    barre.textContent = `${Math.floor(progression)}%`;
}

// Fonction pour mettre à jour les objectifs dynamiquement
function updateObjectif() {
    if (objectifIndex < objectifs.length && nombreDePigeons >= objectifs[objectifIndex].seuil) {
        objectifIndex++;
        const objectifElement = document.getElementById('objectif-text');
        objectifElement.classList.add('highlight');
        setTimeout(() => objectifElement.classList.remove('highlight'), 500); // Retire l'effet après 500ms
    }

    if (objectifIndex < objectifs.length) {
        document.getElementById('objectif-text').textContent = objectifs[objectifIndex].message;
    } else {
        document.getElementById('objectif-text').textContent = "Félicitations, vous avez atteint tous les objectifs !";
    }
}

function updateObjectif2() {
    if (objectifIndex < objectifs.length && nombreDePigeons >= objectifs[objectifIndex].seuil) {
        objectifIndex++;
        const objectifElement = document.getElementById('goal');
        objectifElement.classList.add('highlight');
        setTimeout(() => objectifElement.classList.remove('highlight'), 500); // Retire l'effet après 500ms
    }

    if (objectifIndex < objectifs.length) {
        document.getElementById('goal').textContent = objectifs[objectifIndex].message;
    } else {
        document.getElementById('goal').textContent = "Félicitations, vous avez atteint tous les objectifs !";
    }
}

//Bonus aléatoire
function spawnBonus() {
    const bonus = document.createElement('img');
    bonus.src = 'assets/images/bonus.png'; // Ajoutez une icône bonus
    bonus.style.position = 'absolute';
    const { x, y } = positionAleatoire();
    bonus.style.left = `${x}px`;
    bonus.style.top = `${y}px`;
    bonus.style.width = '40px';
    bonus.style.cursor = 'pointer';
    bonus.classList.add('bonus');
    document.body.appendChild(bonus);

    // Quand le joueur clique sur le bonus
    bonus.addEventListener('click', () => {
        nombreDePigeons += 100; // Donne un bonus de 100 pigeons
        bonus.remove();
        updateUI();
    });

    // Le bonus disparaît après 5 secondes
    setTimeout(() => {
        bonus.remove();
    }, 5000);
}

// Générer des bonus toutes les 15-30 secondes
setInterval(spawnBonus, Math.random() * 15000 + 15000);


// Initialisation de l'interface
updateUI();
