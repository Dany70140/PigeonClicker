// Variables principales
let nombreDePigeons = 1; // Compteur total de pigeons
let pigeonsParClic = 1;  // Nombre de pigeons produits par clic

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
    for (let i = 0; i < nombre; i++) {
        const nouvellePosition = positionAleatoire();

        // Crée une nouvelle image de pigeon
        const nouveauPigeon = document.createElement('img');
        nouveauPigeon.src = 'assets/images/pigeon.png';
        nouveauPigeon.style.position = 'absolute';
        nouveauPigeon.style.left = `${nouvellePosition.x}px`;
        nouveauPigeon.style.top = `${nouvellePosition.y}px`;
        nouveauPigeon.style.width = '50px';
        nouveauPigeon.style.cursor = 'pointer';
        nouveauPigeon.classList.add('pigeon'); // Ajout de la classe pour l'animation

        // Ajoute le pigeon à la page pour ouvoir commit
        document.body.appendChild(nouveauPigeon);
        updateUI()

        // Ajoute l'événement au pigeon pour qu'il crée de nouveaux pigeons lors du clic
        nouveauPigeon.addEventListener('click', () => creerPigeons(pigeonsParClic));

        // Incrémente le compteur de pigeons
        nombreDePigeons++;

        // Lance la disparition du pigeon après 3 secondes
        setTimeout(() => {
            nouveauPigeon.classList.add('disparition');
            // Retire l'élément du DOM après l'animation (1 seconde d'animation)
            setTimeout(() => {
                nouveauPigeon.remove();
            }, 500);
        }, 0);
    }

// Fonction pour acheter une amélioration
function buyUpgrade(upgradeId) {
    if (nombreDePigeons >= upgrades[upgradeId].cost) {
        nombreDePigeons -= upgrades[upgradeId].cost;

        if (upgradeId === 1) {
            pigeonsParClic *= upgrades[upgradeId].multiplier; // Multiplie la production par clic
        } else if (upgradeId === 2) {
            startAutoProduction(upgrades[upgradeId].multiplier); // Lancement de la production automatique
        }

        upgrades[upgradeId].cost *= 2; // Augmente le coût de l'amélioration
        updateUI();
    }
}

// Fonction pour démarrer la production automatique
function startAutoProduction(multiplier) {
    setInterval(() => {
        nombreDePigeons += multiplier;
        updateUI();
    }, 1000); // Production chaque seconde
}

// Fonction pour mettre à jour l'interface
function updateUI() {
    // Mise à jour du compteur
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

// Gestion des clics sur le pigeon
document.getElementById('pigeon').addEventListener('click', () => {
    nombreDePigeons += pigeonsParClic;
    updateUI();
});

// Initialisation de l'interface
updateUI();
