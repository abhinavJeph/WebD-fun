const btn = document.querySelectorAll('.input button');
const box = document.querySelector('.box');
const rocket = document.getElementById('rocket');

const rocketLength = 30;

const boxWidth = 100;
const boxHeight = 100;

var rocLeft = 0;
var rocTop = 0;

btn.forEach(button =>{button.addEventListener('click', (e)=>{
    const move = e.target.id;
    
    switch(move){
        case 'right' : 
            moveRight();
            break;
        case 'left' : 
            moveLeft();
            break;
        case 'up' : 
            moveUp();
            break;
        case 'down' : 
            moveDown();
    }

})})

document.addEventListener('keydown',(e) =>{
    switch(e.key.toLowerCase()){
        case 'd' : 
            moveRight();
            break;
        case 'a' : 
            moveLeft();
            break;
        case 'w' : 
            moveUp();
            break;
        case 's' : 
            moveDown();
    }
})

function moveRight(){
    console.log('right');
    
    console.log(rocLeft, rocketLength, boxWidth)
    if(rocLeft + rocketLength < boxWidth){
        rocket.style.setProperty('transform','rotate(0deg)')
        rocket.style.setProperty('left',`${rocLeft + 10}%`);
        rocLeft = parseInt(rocket.style.left.slice(0,-1));
    }
}

function moveLeft(){
    console.log('left');
    console.log(rocLeft, rocketLength, boxWidth)

    if(rocLeft>0){
        rocket.style.setProperty('transform','rotate(180deg)')
        rocket.style.setProperty('left',`${rocLeft - 10}%`);
        rocLeft = parseInt(rocket.style.left.slice(0,-1));
    }
}

function moveUp(){
    console.log('up');
    console.log(rocTop, rocketLength, boxHeight)

    if(rocTop> 10){
        rocket.style.setProperty('transform','rotate(-90deg)')
        rocket.style.setProperty('top',`${rocTop - 10}%`);
        rocTop = parseInt(rocket.style.top.slice(0,-1));
    }
}

function moveDown(){
    console.log('down');
    console.log(rocTop, rocketLength, boxHeight)
    
    if(rocTop + rocketLength <= boxHeight){
        rocket.style.setProperty('transform','rotate(90deg)')
        rocket.style.setProperty('top',`${rocTop + 10}%`);
        rocTop = parseInt(rocket.style.top.slice(0,-1));
    }
}


