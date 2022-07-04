const mario = document.querySelector(".super-mario");
const pipe = document.querySelector(".pipe-game");
const fireball = document.querySelector(".fire-ball");
const cloud1 = document.querySelector(".cloud-game1");
const cloud2 = document.querySelector(".cloud-game2");
const floor = document.querySelector(".floor");
const jump_snd = new Audio("../sounds/jump.wav");
const fire_snd = new Audio("../sounds/fire.wav");
const rotate_snd = new Audio("../sounds/giro.wav");
const game_over_snd = new Audio("../sounds/game-over.wav");
const track_snd = new Audio("../sounds/medley.mp3");
let marioPosition;
let game_on = true;
let jump_on = false;
let rotate_on = false;
let fire_on = false;


/* Air function */
const jump = () => {
    mario.classList.add("jump-mario");
    jump_snd.play();
    jump_on = true;

    setTimeout(() => {
        mario.classList.remove("jump-mario");
        jump_on = false;

    }, 500);
}

const rotate = () => {
    mario.classList.add("rotate-mario");
    rotate_snd.play();
    rotate_on = true;

    setTimeout(() => {
        mario.classList.remove("rotate-mario");
        rotate_on = false;

    }, 500);
}

const fire = () => {
    fireball.classList.add("shot-fireball");
    fireball.style.bottom = `${marioPosition + 40}px`;
    fireball.style.display = 'block';
    fire_snd.play();
    fire_on = true;

    setTimeout(() => {
        fireball.classList.remove("shot-fireball");
        fireball.style.display = 'none';
        fire_on = false;
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
        mario.style.width = "7%";
        mario.style.marginLeft = "45%";
        mario.style.marginBottom = "25%";

        mario.style.bottom = `${marioPosition}px`;
        pipe.style.left = `${pipePosition}px`;

        stopGame();

        clearInterval(loopGame);
    }

}, 10);

document.addEventListener("keydown", mapKeys)

function mapKeys(event) {
    if (game_on) {
        track_snd.play();
        if (!jump_on && !rotate_on) {
            if (event.keyCode === 32) {
                jump();
            }
            if (event.keyCode === 13) {
                rotate();
            }
        }
        if (event.keyCode === 18 && !fire_on) {
            fire();
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function stopGame() {
    pipe.style.animation = "none";
    mario.style.animation = "none";
    cloud1.style.animation = "none";
    cloud2.style.animation = "none";
    floor.style.animation = "none";
    fireball.style.animation = "none";
    cloud1.style.right = "0px";
    cloud2.style.left = "-100px";


    track_snd.pause();
    track_snd.currentTime = 0;
    game_over_snd.play();
    game_on = false;
}