const baddoor = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const normaldoor1 = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const normaldoor2 = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let startButton = document.getElementById('start');
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

function soundEffect() {
    var audio = new Audio('./Assets/success-sound-effect.mp3');
    audio.play();
  }

  function soundEffect2() {
    var audio = new Audio('./Assets/game-fail-sound-effect.mp3');
    audio.play();
  }

  let lGit = document.getElementById('get-git-link');
  let gGit = document.getElementById('git-link');
  function getGit(){
    gGit.style.display = 'inline-block';
  }
  
  

  lGit.onclick = () => {
    lGit.addEventListener('click', getGit);
}

const RandomBadDoorGenerator = () => {
    const BDoor = Math.floor(Math.random()*numClosedDoors);
    if (BDoor === 0)
    {
        openDoor1 = baddoor;
        openDoor2 = normaldoor1;
        openDoor3 = normaldoor2;
    }
    else if (BDoor === 1)
    {
        openDoor2 = baddoor;
        openDoor1 = normaldoor1;
        openDoor3 = normaldoor2;
    }
    else
    {
        openDoor3 = baddoor;
        openDoor1 = normaldoor1;
        openDoor2 = normaldoor2;
    }
}

/*function door1ColourChange () {
    doorImage1.src = './Assets/MOverDoor.png';
}
function door1UnColourChange () {
    doorImage1.src = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
} */

let doorImage1 = document.getElementById('door1');
//doorImage1.addEventListener('mouseover', door1ColourChange);
//doorImage1.addEventListener('mouseout', door1UnColourChange);
doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(door1))
    {
        door1.src = openDoor1;
        playDoor(door1);
    }
    
  }

let doorImage2 = document.getElementById('door2');
doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(door2))
    {
        door2.src = openDoor2;
        playDoor(door2);
    }
  }

let doorImage3 = document.getElementById('door3');
doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(door3))
    {
        door3.src = openDoor3;
        playDoor(door3);
    }
  }
  

startButton.onclick = () => {
    if(!currentlyPlaying) {
        startRound();
    }

}

const startRound = () => {
    // Reset all the doors to be closed
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    numClosedDoors = 3;
    currentlyPlaying = true;
    startButton.innerHTML = 'Good luck!';
    RandomBadDoorGenerator();
  }
  
const gameOver = (status) => {
    if (status === 'win') 
    {
        startButton.innerHTML = 'You win! Play again?';
        getYourScore();
    }
    else if (status === 'lose')
    {
        startButton.innerHTML = 'Game over! Play again?';
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const isBad = (door) => {
    if (door.src === baddoor) 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}

const isClicked = (door) => {
    if (door.src === closedDoorPath) 
    {
      return false;
    } 
    else 
    {
      return true;
    }
  }

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) 
    {
        gameOver('win');
        soundEffect();
    } 
    else if (isBad(door)) 
    {
        gameOver('lose');
        soundEffect2();
    }
  }

  const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
      highScore = score;
      bestStreak.innerHTML = highScore;
    }
  }
  
  startRound();