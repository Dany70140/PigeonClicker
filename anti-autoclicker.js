let clicsRecents = 0;
const limiteClicsParSeconde = 20;
const intervalleDeTemps = 1000;

function verifierClicsParSeconde() {
    clicsRecents++;

    if (clicsRecents > limiteClicsParSeconde) {
        alert("Autoclicker détecté : Vous avez cliqué trop vite !");
        location.reload();
        clicsRecents = 0;
    }
}

setInterval(() => {
    clicsRecents = 0;
}, intervalleDeTemps);

pigeon.addEventListener('click', () => {
    verifierClicsParSeconde();
});
