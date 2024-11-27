// Sélectionne les éléments nécessaires
const pigeon = document.getElementById('pigeon');
const compteur = document.getElementById('compteur');
const doubleBtn = document.getElementById('double-btn');
const objectifText = document.getElementById('objectif-text');

// Initialise le nombre de pigeons et le multiplicateur
let nombreDePigeons = 1;
let pigeonsParClic = 1;
let prochainePuissanceDeDix = 10;
let objectifAtteint = false;

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

        // Ajoute le pigeon à la page
        document.body.appendChild(nouveauPigeon);

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

    // Met à jour l'affichage du compteur de pigeons
    compteur.textContent = nombreDePigeons;

    // Affiche l'objectif
    objectifText.textContent = `Atteindre ${prochainePuissanceDeDix} Pigeons...`;

    // Affiche le bouton si le nombre de pigeons atteint ou dépasse l'objectif
    if (nombreDePigeons >= prochainePuissanceDeDix) {
        // Si l'objectif est atteint, cacher le texte de l'objectif et afficher le bouton
        objectifText.style.display = 'none';
        doubleBtn.style.display = 'block';
    }
}

// Ajoute l'événement de clic au pigeon initial
pigeon.addEventListener('click', () => creerPigeons(pigeonsParClic));

// Ajoute l'événement de clic au bouton pour doubler les pigeons par clic
doubleBtn.addEventListener('click', () => {
    // Double le nombre de pigeons par clic
    pigeonsParClic *= 2;

    // Cache le bouton de doublement
    doubleBtn.style.display = 'none';

    // Met à jour la prochaine puissance de 10
    prochainePuissanceDeDix *= 10;

    // Réinitialiser l'objectif
    objectifAtteint = false;

    // Afficher à nouveau le texte de l'objectif
    objectifText.style.display = 'block';
    objectifText.textContent = `Atteindre ${prochainePuissanceDeDix} Pigeons...`;
});
