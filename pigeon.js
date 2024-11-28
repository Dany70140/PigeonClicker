// Variables principales
let nombreDePigeons = 1; // Compteur total de pigeons
let pigeonsParClic = 1;  // Nombre de pigeons produits par clic
const maxPigeonsActifs = 50; // Limite de pigeons actifs sur la page

// Améliorations disponibles
let upgrades = {
    1: { cost: 10, multiplier: 2, description: "Double les pigeons par clic." },
    2: { cost: 50, multiplier: 1, description: "Augmente passivement la production par seconde." }
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

// Fonction pour acheter une amélioration
function buyUpgrade(upgradeId) {
    if (nombreDePigeons >= upgrades[upgradeId].cost) {
        nombreDePigeons -= upgrades[upgradeId].cost;
        if (upgradeId === 1) {
            pigeonsParClic *= upgrades[upgradeId].multiplier;
        } else if (upgradeId === 2) {
            startAutoProduction(upgrades[upgradeId].multiplier);
        }
        upgrades[upgradeId].cost *= 2;
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

    // Mise à jour des coûts des améliorations
    for (let id in upgrades) {
        document.getElementById(`cost${id}`).textContent = upgrades[id].cost;
        document.getElementById(`upgrade${id}`).disabled = nombreDePigeons < upgrades[id].cost;
    }

    // Mise à jour des objectifs
    const prochainePuissanceDeDix = Math.pow(10, Math.ceil(Math.log10(nombreDePigeons + 1)));
    document.getElementById('objectif-text').textContent = `Atteindre ${prochainePuissanceDeDix} Pigeons...`;
}

// Gestion du clic sur le pigeon initial
document.getElementById('pigeon').addEventListener('click', () => {
    creerPigeons(pigeonsParClic);
});

// Initialisation de l'interface
updateUI();
