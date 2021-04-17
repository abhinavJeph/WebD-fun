let paintBox = document.getElementById('paintBox')
let context = paintBox.getContext('2d')
let gameOn = true

class box{
    constructor(size,pic){
        this.size = size
        this.img = pic
        this.x = 0
        this.y =225
    }
}

let playerSpeed = 0
class Player extends box{
    constructor(){
        var WolvImg = new Image()
        WolvImg.src = "Wolverine.png"
        super(70,WolvImg)
        this.speed = playerSpeed
    }
    move(){
        this.x+= Math.abs(playerSpeed)
        this.y+= playerSpeed/2
        if(this.y<150 || this.y+this.size>410)
            playerSpeed *= -1
    }
}

class Enemy extends box{
    constructor(speed){
        var CoronaImg = new Image()
        CoronaImg.src = "corona.png"
        super(70,CoronaImg)
        this.speed = speed
    }
    move(){
        this.y+= this.speed
        if(this.y<0 || this.y+this.size>paintBox.height) // if out of canvas frame
            this.speed *= -1// change direction
    }
}

let player = new Player()
let enemy1 = new Enemy(5 + Math.random()*5)
enemy1.x = 180
let enemy2 = new Enemy(8 + Math.random()*3)
enemy2.x = 360
let enemy3 = new Enemy(6 + Math.random()*3)
enemy3.x = 540
let enemy4 = new Enemy(7 + Math.random()*3)
enemy4.x = 720

function drawBox(box){
    context.drawImage(box.img,box.x,box.y,box.size,box.size)
}
function drawFinish(){
    context.fillStyle ="rgba(255, 128, 128, 0.781)"
    context.fillRect(paintBox.width-50,0,50,paintBox.height)
}

drawBox(player)
drawBox(enemy1)
drawBox(enemy2)
drawBox(enemy3)
drawBox(enemy4)

// setInterval(()=>{
//     context.clearRect(0,0,500,500)
//     enemy1.y +=20
//     enemy2.y+=10
//     drawBox(enemy1)
//     drawBox(enemy2)
// },100)

// function updateGame(){
//     console.log("updating game")
//     window.requestAnimationFrame(()=>{
//         context.clearRect(0,0,500,500)
//         enemy1.move()
//         enemy2.move()
//         drawBox(enemy1)
//         drawBox(enemy2)
//         drawBox(player)
//         updateGame()
//     })
// }
// updateGame()

paintBox.addEventListener('mousedown',()=>{
    playerSpeed = 5
})
paintBox.addEventListener('mouseup',()=>{
    playerSpeed = 0
})

function isCollide(Player,Enemy){
    let l1 = Player.x
        let r1 = l1 + Player.size - 15
        let t1 = Player.y
        let b1 = t1 + Player.size - 15

        let l2 = Enemy.x
        let r2 = l2 + Enemy.size - 15
        let t2 = Enemy.y
        let b2 = t2 + Enemy.size - 15

        if(l1<r2 && r1>l2 && b1>t2 && t1<b2){
            return true
        }
        else return false
    // if(Player.x+50>=Enemy.x && Player.x<=Enemy.x+50 && Player.y+50>=Enemy.y && Player.y<=Enemy.y+50) 
    //     return true
    // return false
}

function isLoser(){
    return isCollide(player,enemy1) || isCollide(player,enemy2) || isCollide(player,enemy3) || isCollide(player,enemy4)
}

function isWinner(){
    if (player.x>950) return true
    return false
}

function gameloop(){
    if(!gameOn) return
    if(isLoser()) {
        window.alert("GAME OVER !")
        gameOn = false
    }
    if(isWinner()){
        window.alert("Congratulations ! \nYou Won")
        gameOn = false
    }
    if(gameOn){
    context.clearRect(0,0,paintBox.width,paintBox.height)
    enemy1.move()
    enemy2.move()
    enemy3.move()
    enemy4.move()
    player.move()
    drawFinish()
   
    drawBox(enemy1)
    drawBox(enemy2)
    drawBox(enemy3)
    drawBox(enemy4)
    drawBox(player)
    }
   
    window.requestAnimationFrame(gameloop)
}
gameloop()
