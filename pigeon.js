// Variables principales
let nombreDePigeons = 1; // Compteur total de pigeons
let pigeonsParClic = 1;  // Nombre de pigeons produits par clic

// Améliorations disponibles
let upgrades = {
    1: { cost: 10, multiplier: 2, description: "Double les pigeons par clic." },
    2: { cost: 50, multiplier: 1, description: "Augmente passivement la production par seconde." }
};

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
