// Before Game Start Elements
var startBtn = document.querySelector('.box .start')
var restartBtn = document.querySelector('.box .restart')
var box = document.querySelector('.box')
var text = document.getElementById('text')
var heading = document.getElementById('heading')

// After Game Start Elements
var scoreElem = document.getElementById('scoreElem')
var score = document.getElementById('score')
var meter = document.querySelector('.meter')
var life = document.querySelector('.life')
var currLife = 100
var currScore = 0

// Canvas
var canvas = document.getElementById('canvas')
var tool = canvas.getContext('2d')
var canvasPosX = 0
var canvasPosY = 0
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Animation
var animationID

// Bullets
var bulletArray = []
var bulletWidth = 10
var bulletHeight = 10 
var bulletSpeed = 6

// Corona
var coronaArray = []
var coronaWidth = 60
var coronaHeight = 60
var coronaSpeed = 4

//Earth
var earthWidth = 100
var earthHeight = 100
const earthCenterX = canvas.width/2
const earthCenterY = canvas.height/2
var earthPosX = earthCenterX - earthWidth/2
var earthPosY = earthCenterY - earthHeight/2

// Explosion Particle
var particleArray = []
var particleMaxRadius = 3
var particleMaxSpeed = 3
var particleMaxNumber = 60
var particleRemovingFactor = 0.02


//Loading Images
var spaceImg = new Image()
spaceImg.src = "space.jpg"

var earthImg = new Image()
earthImg.src = "earth.png"

var coronaImg = new Image()
coronaImg.src = "corona.png"

// Bullet class
class bullet{
    constructor(x,y,velocity){
        this.x = x,
        this.y = y,
        this.width = bulletWidth,
        this.height = bulletHeight,
        this.velocity = velocity
    }
    draw(){
        tool.fillStyle = 'white'
        tool.fillRect(this.x,this.y,this.width,this.height)
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Planet Class
class planet{
    constructor(x,y,width,height,image){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
        this.image = image
    }

    draw(){
        tool.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// Corona class
class corona{
    constructor(x,y,velocity){
        this.x = x,
        this.y = y,
        this.width = coronaWidth,
        this.height = coronaHeight,
        this.velocity = velocity
    }
    draw(){
        tool.drawImage(coronaImg,this.x,this.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

    collide(entity){
        let l1 = this.x
        let r1 = l1 + this.width
        let t1 = this.y
        let b1 = t1 + this.height

        let l2 = entity.x
        let r2 = l2 + entity.width
        let t2 = entity.y
        let b2 = t2 + entity.height

        if(l1<r2 && r1>l2 && b1>t2 && t1<b2){
            return true
        }
        else return false
    }
}

class particle{
    constructor(x,y,radius,velocity){
        this.x = x,
        this.y = y,
        this.radius = radius
        this.velocity = velocity
        this.alpha = 1
    }
    draw(){
        tool.save()
        tool.globalAlpha = this.alpha
        tool.beginPath()
        tool.fillStyle = 'white'
        tool.arc(this.x, this.y, this.radius, 0, 2*Math.PI,false)
        tool.fill()
        tool.restore()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= particleRemovingFactor
    }
}

// Earth object of Planet class
earth = new planet(earthPosX,earthPosY,earthWidth,earthHeight,earthImg)


// Game Start
startBtn.addEventListener('click',(e)=>{
    e.stopImmediatePropagation()

    box.style.display = 'none'
    heading.style.display = 'none'
    scoreElem.style.display = 'block'
    meter.style.display = 'block'

    //Draw the canvas
    tool.fillRect(canvasPosX,canvasPosY,canvas.width,canvas.height)
    // Draw the space on canvas
    tool.drawImage(spaceImg,canvasPosX,canvasPosY,canvas.width,canvas.height)
    // Draw Earth
    earth.draw()
    
    
    // Launching Bullet on mouse click
    window.addEventListener('click',(e)=>{
        // Velocity of bullet

        // Can do in this Way too
        // console.log(earthCenterX, e.clientX)
        // let velocity = {
        //     x : (e.clientX - earthCenterX),
        //     y : (e.clientY - earthCenterY)
        // }
        // console.log(velocity.x)
        let theta = Math.atan2(e.clientY - earthCenterY,e.clientX - earthCenterX)
        let velocity = {
            x: bulletSpeed*Math.cos(theta),
            y: bulletSpeed*Math.sin(theta)
        }
        newBullet = new bullet(earthCenterX,earthCenterY,velocity)
        bulletArray.push(newBullet)
    })

    // Launching corona each second
    setInterval(function drawCorona(){
        let coronaPosX;
        let coronaPosY;
        let direction = Math.random() //To choose between verticle and horizontal

        //Verticle
        if(direction<0.5){                                  
            coronaPosX = Math.random()*canvas.width
            coronaPosY = Math.random()<0.5 ? 0 : canvas.height //Top or bottom
        }
        //Horizontal
        else{                                              
            coronaPosX = Math.random()<0.5 ? 0 : canvas.width
            coronaPosY = Math.random()*canvas.height           //Left or right
        }
        
        let coronaCenterX = coronaPosX + coronaWidth/2
        let coronaCenterY = coronaPosY + coronaHeight/2

        let theta = Math.atan2(earthCenterY - coronaCenterY,earthCenterX - coronaCenterX)
        let velocity = {
            x: coronaSpeed*Math.cos(theta),
            y: coronaSpeed*Math.sin(theta)
        }
        var newCorona = new corona(coronaPosX,coronaPosY,velocity)
        coronaArray.push(newCorona)
    },1000)

    // Animation
    animation()
})

function animation(){
    tool.clearRect(0,0,canvas.width,canvas.height)
    // Draw the space on canvas
    tool.drawImage(spaceImg,0,0,canvas.width,canvas.height)
    // Redraw Earth
    earth.draw()
    // For each bullet do update
    for(let i=0;i<bulletArray.length;i++){
        let bullet = bulletArray[i]
        bullet.update()
        // If bullet out of canvas
        if(bullet.x <0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height){
            bulletArray.splice(i,1)
        }
    }

    // For Each Explosion Particle do update
    particleArray.forEach((particle,particleIndex)=>{
        particle.update()
        if(particle.alpha<0){
            particleArray.splice(particleIndex,1)
        }
    })

    // For each corona do update
    coronaArray.forEach((corona,coronaIndex)=>{
        corona.update()
        //Check Collision with Earth
        if(corona.collide(earth)){
            currLife -= 20
            life.style.width = `${currLife}%`
            coronaArray.splice(coronaIndex,1)
            if(currLife <50){
                life.classList.add('danger')
            }
            if(currLife == 0){
                setTimeout(()=>{
                    cancelAnimationFrame(animationID)
                    alert('Game Over')
                    restart()
               },0)
            }
        }
        // Check Collsion with each Bullet
        bulletArray.forEach((bullet,bulletIndex)=>{
            if(corona.collide(bullet)){
                setTimeout(()=>{
                    // Adding Explosion particle in ParticleArray
                    for(let j=0;j<particleMaxNumber;j++){
                        var velocity = {
                            x: (Math.random()-0.5)*2*particleMaxSpeed,
                            y: (Math.random()-0.5)*2*particleMaxSpeed
                        }
                        particleArray.push(new particle(bullet.x, bullet.y, particleMaxRadius*Math.random(), velocity))
                    }
                    // Deleting corona and bullet
                    coronaArray.splice(coronaIndex,1)
                    bulletArray.splice(bulletIndex,1)
                    currScore += 10
                    score.innerText = currScore
                    console.log(score.innerText)
                },0)
            }
        })
    })
    animationID = requestAnimationFrame(animation)
}

// For reload
// window.addEventListener('resize',()=>{
//     window.location.reload()
// })

// Restart function
function restart(){
    box.style.display = 'flex'
    text.innerText = 'Play again ?'
    canvas.height = 0
    startBtn.style.display = 'none'
    restartBtn.style.display = 'inline-block'
    heading.style.display = 'block'
    scoreElem.style.display = 'none'
    meter.style.display = 'none'
}

// If clicked on Restart
restartBtn.addEventListener('click',()=>{
    window.location.reload()
})


