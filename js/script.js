let marioPosition;
const mario = document.querySelector(".super-mario");
const pipe = document.querySelector(".pipe-game");
const fireball = document.querySelector(".fire-ball");
const clouds = document.querySelector(".cloud-game");
const floor = document.querySelector(".floor");
const jump_snd = new Audio("../sounds/jump.wav");
const fire_snd = new Audio("../sounds/fire.wav");
const rotate_snd = new Audio("../sounds/giro.wav");
const game_over_snd = new Audio("../sounds/game-over.wav");
const track_snd = new Audio("../sounds/medley.mp3");
/* const soundtrack = document.getElementById('audio'); */
/* console.log(soundtrack); */
let game_on = true;
/* const jump = function() {
    mario.classList.add("jump-mario");
} */
/* autosound(); */
/* track_snd.autoplay = true;
track_snd.play();
track_snd.load(); */


/* Air function, mesma função acima */
const jump = () => {
    mario.classList.add("jump-mario");
    //fireball.style.display = 'none';
    jump_snd.play();

    setTimeout(() => {
        mario.classList.remove("jump-mario");
        //fireball.style.display = 'block';
    }, 500);
}

const rotate = () => {
    mario.classList.add("rotate-mario");
    
    //fireball.style.display = 'none';
    rotate_snd.play();

    setTimeout(() => {
        mario.classList.remove("rotate-mario");
        //fireball.style.display = 'block';
    }, 500);
}

const fire = () => {
    fireball.classList.add("shot-fireball");
    fireball.style.bottom = `${marioPosition + 40}px`;
    fireball.style.display = 'block';
    fire_snd.play();

    setTimeout(() => {
        fireball.classList.remove("shot-fireball");
        fireball.style.display = 'none';
    }, 1500);

}

const loopGame = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "");
    /* console.log(marioPosition); */
    const distPipe = pipe.width;
    /* console.log(distPipe); */

    if (pipePosition <= distPipe * 2.5 &&
        pipePosition > distPipe &&
        marioPosition < distPipe) {

        mario.src = "./Images/mario-game-over.png";
        mario.style.width = "9%";
        mario.style.marginLeft = "45%";
        mario.style.marginBottom = "25%";

        mario.style.bottom = `${marioPosition}px`;
        pipe.style.left = `${pipePosition}px`;

        pipe.style.animation = "none";
        mario.style.animation = "none";
        clouds.style.animation = "none";
        floor.style.animation = "none";

        track_snd.pause();
        track_snd.currentTime = 0;
        game_over_snd.play();
        game_on = false;

        clearInterval(loopGame);
    }

}, 10);

document.addEventListener("keydown", mapKeys)

function mapKeys(event) {
    if (event.keyCode === 32 && game_on) {
        /* console.log("Espaço"); */
        jump();
        track_snd.play();
    }
    if (event.keyCode === 13 && game_on) {
        rotate();
        track_snd.play();
    }
    if (event.keyCode === 16 && game_on) {
        /* console.log("Ctrl"); */
        fire();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/* 
function autosound() {
    track_snd.play();
} */