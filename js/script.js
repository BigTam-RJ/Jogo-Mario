const mario = document.querySelector(".super-mario");
const pipe  = document.querySelector(".pipe-game");
const fireball  = document.querySelector(".fire-ball");

/* const jump = function() {
    mario.classList.add("jump-mario");
} */

/* Air function, mesma função acima */
const jump = () => {
    mario.classList.add("jump-mario");
    //fireball.style.display = 'none';

    setTimeout(() => {
        mario.classList.remove("jump-mario");
        //fireball.style.display = 'block';
    }, 500);
}

const fire = () => { 
    fireball.classList.add("shot-fireball");
    fireball.style.display = 'block';
    setTimeout(() => {
        fireball.classList.remove("shot-fireball");
        fireball.style.display = 'none';
    }, 1500);
}

const loopGame = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px","");

    if (pipePosition <= 170 &&
        pipePosition > 0 &&
        marioPosition < 60) {
        pipe.style.animation = "none"; 
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./Images/bebe3.gif";
        mario.style.width = "100px";
         //  mario.style.marginLeft = "45px";

        clearInterval(loopGame);
    }
 
}, 10);

document.addEventListener("keydown", mapKeys)

function mapKeys(event){
        if (event.keyCode === 32) {
            console.log("Espaço");
            jump();
        }
        if (event.keyCode === 17) {
            console.log("Ctrl");
            fire();
        }
}
