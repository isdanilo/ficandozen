const steps = [
    { text: "Inspire pelo nariz", duration: 4 },
    { text: "Prenda a respiração", duration: 7 },
    { text: "Expire pela boca", duration: 8 }
];

let cycle = 0;
const maxCycles = 4;
let currentStep = 0;
let isRunning = false;
let timer;
let interval;

const cycleCounter = document.getElementById("cycle-counter");
const timerDisplay = document.getElementById("timer-display");
const timerText = document.getElementById("timer-text");
const controlButton = document.getElementById("control-button");

function updateCycleCounter() {
    cycleCounter.textContent = `Ciclo: ${cycle}/${maxCycles}`;
}

function resetTimer() {
    // Limpar qualquer intervalo ou timeout ativo
    clearInterval(interval);
    clearTimeout(timer);

    // Resetar variáveis
    cycle = 0;
    currentStep = 0;
    isRunning = false;

    // Atualizar interface
    controlButton.textContent = "Iniciar";
    controlButton.classList.remove("reset");
    timerText.textContent = "Prepare-se para começar";
    timerDisplay.textContent = "00";
    updateCycleCounter();
}

function startBreathingStep(stepIndex) {
    if (cycle >= maxCycles) {
        timerText.textContent = "Técnica concluída! Relaxe.";
        controlButton.textContent = "Reiniciar";
        controlButton.classList.add("reset");
        isRunning = false;
        return;
    }

    const step = steps[stepIndex];
    timerText.textContent = step.text;
    let remainingTime = step.duration;

    // Exibir o tempo inicial
    timerDisplay.textContent = remainingTime < 10 ? `0${remainingTime}` : remainingTime;

    // Iniciar o intervalo
    interval = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = remainingTime < 10 ? `0${remainingTime}` : remainingTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            if (stepIndex < steps.length - 1) {
                startBreathingStep(stepIndex + 1);
            } else {
                cycle++;
                updateCycleCounter();
                startBreathingStep(0);
            }
        }
    }, 1000);
}

function goBack() {
    // Redireciona para outra página
    window.location.href = "../pages/criseMenu.html"; // Substitua "outra_pagina.html" pelo caminho correto.
}

controlButton.addEventListener("click", () => {
    if (isRunning) {
        resetTimer();
    } else if (controlButton.classList.contains("reset")) {
        resetTimer(); // Reset ao término dos ciclos
    } else {
        isRunning = true;
        controlButton.textContent = "Parar";
        controlButton.classList.add("reset");
        updateCycleCounter();
        startBreathingStep(0);
    }
});
