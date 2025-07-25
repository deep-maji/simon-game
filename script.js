// Default Settings
let gameSque = [];
let userSque = [];
let level = 0;
let simonHighSc = 0;
let startFlag = false;
let color = ['purple', 'yellow', 'green', 'red'];
let h2 = document.querySelector("h2");

function setHighSc(score) {
    localStorage.setItem("simonHighSc",score);
    document.querySelector(".high-score h2").innerHTML = `High Score : ${score}`
}

function getHighSc() {
    let sc = localStorage.getItem("simonHighSc");
    if (sc != null) {
        return sc;
    }
    return 0;
}

simonHighSc = getHighSc();
setHighSc(simonHighSc);

// Start the Game
document.addEventListener("keypress", () => {
    if (!startFlag) {
        startFlag = true;
        levelUp();
    }
});

document.addEventListener("touchend",()=>{
    if (!startFlag) {
        startFlag = true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp() {
    userSque = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randColor = color[Math.floor(Math.random() * 4)];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSque.push(randColor);
    console.log(gameSque);
    gameFlash(randBtn);
}

// User

function checkSque(idx) {
    if (userSque[idx] == gameSque[idx]) {
        if (userSque.length == gameSque.length) {
            setTimeout(levelUp,1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! <b>Your Score ${level}</b><br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    if (startFlag) {
        let btn = this;
        let btnId = btn.getAttribute("id");
        userSque.push(btnId);
        userFlash(btn);
        checkSque(userSque.length - 1);
    }
}

let btns = document.querySelectorAll(".btn");

btns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});


function reset() {
    userSque = [];
    gameSque = [];
    startFlag = false;
    if (simonHighSc < level) {
        setHighSc(level);
        console.log("hello");
        
    }
    level = 0;
}