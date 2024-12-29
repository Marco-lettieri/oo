// Funzione per estrarre un numero casuale dalla tombola (da 1 a 90)
let estratti = []; // Array per tenere traccia dei numeri già estratti

// Funzione per creare il tabellone con numeri da 1 a 90
function createTabellone() {
    const tabelloneContainer = document.getElementById("tabellone");
    tabelloneContainer.innerHTML = '';  // Pulisce il tabellone esistente prima di crearne uno nuovo

    for (let i = 1; i <= 90; i++) {
        const div = document.createElement("div");
        div.textContent = i < 10 ? '0' + i : i;
        div.id = "num-" + i;
        tabelloneContainer.appendChild(div);
    }
}

// Funzione per resettare la partita
function resetGame() {
    // Rimuovere la classe "estratto" dal tabellone
    const numeriTabellone = document.querySelectorAll(".tabellone div");
    numeriTabellone.forEach(num => {
        num.classList.remove("estratto");
    });

    // Resettare l'array degli estratti
    estratti = [];

    // Ripristinare il display del numero estratto
    const numberDisplay = document.getElementById("number-display");
    numberDisplay.textContent = "00"; // Reimposta il numero estratto
    numberDisplay.classList.remove("fadeIn"); // Rimuove l'animazione di dissolvenza
    void numberDisplay.offsetWidth; // Forza il reflow per riapplicare l'animazione
    numberDisplay.classList.add("fadeIn");

    // Ripristinare il messaggio
    document.getElementById("message").textContent = "Nuova partita iniziata!";
}

// Funzione per far "parlare" il numero estratto
function leggiNumero(numero) {
    const utterance = new SpeechSynthesisUtterance(numero);
    utterance.lang = 'it-IT';  // Impostiamo la lingua italiana
    speechSynthesis.speak(utterance);
}

document.getElementById("draw-button").addEventListener("click", function() {
    if (estratti.length === 90) {
        document.getElementById("message").textContent = "Tutti i numeri sono stati estratti!";
        return;
    }

    let numero;

    // Genera un numero casuale tra 1 e 90 che non sia già stato estratto
    do {
        numero = Math.floor(Math.random() * 90) + 1;
    } while (estratti.includes(numero));

    estratti.push(numero);

    // Mostra il numero estratto con un'animazione di fade-in
    const numberDisplay = document.getElementById("number-display");
    numberDisplay.classList.remove("fadeIn");
    void numberDisplay.offsetWidth; // Forza il "reflow" per riavviare l'animazione
    numberDisplay.textContent = numero < 10 ? '0' + numero : numero;
    numberDisplay.classList.add("fadeIn");

    // Messaggio di conferma
    document.getElementById("message").textContent = "Numero estratto: " + numero;

    // Legge il numero ad alta voce
    leggiNumero(numero);

    // Evidenzia il numero estratto nel tabellone
    const numDiv = document.getElementById("num-" + numero);
    if (numDiv) {
        numDiv.classList.add("estratto");
    }
});

// Aggiungiamo il listener per il tasto "Nuova Partita"
document.getElementById("new-game-button").addEventListener("click", function() {
    resetGame();  // Resetta il gioco
    createTabellone();  // Ricarica il tabellone
    // Crea un messaggio di nuova partita iniziata
    document.getElementById("message").textContent = "Nuova partita iniziata!";
});

// Inizializza il tabellone quando la pagina è caricata
window.onload = function() {
    createTabellone();
};
