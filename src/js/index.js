let timeDisplay = document.getElementById('time-display');
let startButton = document.getElementById('start-button');
let resetButton = document.getElementById('reset-button');

let totalTime = 25 * 60;
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;

const bellSound = new Audio('src/js/bell.mp3.mp3');

document.addEventListener('DOMContentLoaded', () => {
    const pomodoroButton = document.getElementById('pomodoro-button');
    const shortPauseButton = document.getElementById('short-pause-button');
    const longPauseButton = document.getElementById('long-pause-button');

    function setTimer(minutes) {
        totalTime = minutes * 60;
        remainingTime = totalTime;
        Display();
    }

    pomodoroButton.addEventListener('click', () => {
        resetTimer();
        setTimer(1);
    });
    shortPauseButton.addEventListener('click', () => {
        resetTimer();
        setTimer(10);
    });
    longPauseButton.addEventListener('click', () => {
        resetTimer();
        setTimer(25);
    });

    Display();
});

function Display() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    updateTitle(minutes, seconds);
}

function updateTitle(minutes, seconds) {
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} | Pomodoro - CodeLab`;
}

function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            remainingTime--;
            Display();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                startButton.textContent = 'Start';
                bellSound.play();
            }
        }, 1000);
        startButton.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        startButton.textContent = 'Start';
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    remainingTime = totalTime;
    startButton.textContent = 'Start';
    Display();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

Display();

const fullscreenButton = document.getElementById('icone_fullscreen');

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar habilitar o modo tela cheia: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
});

function abrirLinksInsta() {
    var urls = [
        'https://www.instagram.com/camzz_psc/',
        'https://www.instagram.com/matheus_learte/'
    ];
    abrirAbas(urls);
}

function abrirLinksLinkedin() {
    var urls = [
        'https://www.linkedin.com/in/camila-piscioneri-magalh%C3%A3es-5486732b1/',
        'https://www.linkedin.com/in/matheus-learte-9615a929b/'
    ];
    abrirAbas(urls);
}

function abrirLinksGithub() {
    var urls = [
        'https://github.com/Dr-Verdin',
        'https://github.com/Matheus-Learte'
    ];
    abrirAbas(urls);
}

function abrirAbas(urls) {
    urls.forEach(function(url) {
        window.open(url, '_blank');
    });
}