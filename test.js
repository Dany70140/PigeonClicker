// Sélectionne les éléments nécessaires
const pigeon = document.getElementById('pigeon');
const compteur = document.getElementById('compteur');
const doubleBtn = document.getElementById('double-btn');

// Initialise le nombre de pigeons et le multiplicateur
let nombreDePigeons = 1;
let pigeonsParClic = 10;
let prochainePuissanceDeDix = 10; // Pour vérifier la prochaine puissance de 10

// Fonction pour générer des positions aléatoires
function positionAleatoire() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    return { x, y };
}

// Fonction pour créer des pigeons
function creerPigeons(nombre) {
    for (let i = 0; i < nombre; i++) {
        const nouvellePosition = positionAleatoire();

        const nouveauPigeon = document.createElement('img');
        nouveauPigeon.src = 'assets/images/pigeon.png';
        nouveauPigeon.style.position = 'absolute';
        nouveauPigeon.style.left = `${nouvellePosition.x}px`;
        nouveauPigeon.style.top = `${nouvellePosition.y}px`;
        nouveauPigeon.style.width = '50px';
        nouveauPigeon.style.cursor = 'pointer';
        nouveauPigeon.classList.add('pigeon');

        document.body.appendChild(nouveauPigeon);

        nouveauPigeon.addEventListener('click', () => creerPigeons(pigeonsParClic));

        nombreDePigeons++;
    }

    compteur.textContent = nombreDePigeons;

    // Affiche le bouton uniquement à chaque puissance de 10
    if (nombreDePigeons >= prochainePuissanceDeDix) {
        doubleBtn.style.display = 'block';
    }
}

// Ajoute l'événement de clic au pigeon initial
pigeon.addEventListener('click', () => creerPigeons(pigeonsParClic));

// Ajoute l'événement de clic au bouton pour doubler les pigeons par clic
doubleBtn.addEventListener('click', () => {
    pigeonsParClic *= 2; // Double le nombre de pigeons par clic
    doubleBtn.style.display = 'none'; // Cache le bouton après le clic
    prochainePuissanceDeDix *= 10; // Met à jour la prochaine puissance de 10
});
