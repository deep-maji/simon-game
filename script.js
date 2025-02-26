
// setting up the game
let gameseq = [];
let userseq = [];

let btns = ['yellow','red','purple','green'];


let satred = false;
let level = 0;

let h2 = document.querySelector('h2');


// 01 game started
document.addEventListener("keypress",function(){
    if(satred == false){
        console.log("game started");
        satred = true;

        // 02 level up
        levelUp();
    }
})

//for touch screens
document.addEventListener("touchend",function(){
    if(satred == false){
        console.log("game started");
        satred = true;

        // 02 level up
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 200);
}

function userbtnFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    }, 200);
}

// 02 level up
function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level - ${level}`;

    //random button choose
    let ranIdx = Math.floor((Math.random()) * 3);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(ranIdx);
    // console.log(randColor);
    // console.log(randBtn);
    
    gameseq.push(randColor);
    console.log(gameseq);
    btnFlash(randBtn);
}

function gameOver(){
    let body = document.querySelector('body')
    body.classList.add('gameOver');
    setTimeout(function(){
        body.classList.remove('gameOver');
    }, 200);
}

function checker(index){
    if(userseq[index] === gameseq[index]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
    } 
    else{
        gameOver();
        h2.innerHTML = `<h2>Game Over! Your score was <b>${level}</b><br>Press any key to start</h2>`;
        reset();
    }
}

function btnPree(){
    // console.log(this);
    let btn = this;
    userbtnFlash(btn);

    let userBtnColor = btn.getAttribute('id');
    // console.log(userBtnColor);
    userseq.push(userBtnColor);

    checker(userseq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener('click',btnPree);
    btn.addEventListener('touchend',btnPree);
}

function reset(){
    satred = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

