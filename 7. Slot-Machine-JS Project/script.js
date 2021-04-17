var myValue = ['😂','😈','😱','😇','😍','😝','😞']

var length = myValue.length
var value1 = document.getElementById('value1')
var value2 = document.getElementById('value2')
var value3 = document.getElementById('value3')

var output = document.getElementById('output')

var animationID;
var speedInput = document.getElementById('speed')

var btnPlay = document.getElementById('play')

// Return random emoji from Array -> myValue
function randomValue(){
    return myValue[Math.floor(Math.random()*length)]
}

function randomizeEmoji(newSpeed){
    if(animationID) clearInterval(animationID)
    if(newSpeed == 0) return
    animationID = setInterval(()=>{
        value1.innerHTML = randomValue()
        value2.innerHTML = randomValue()
        value3.innerHTML = randomValue()
        
    },1000/newSpeed)

}

speedInput.addEventListener('change',(e)=>{
    document.documentElement.style.setProperty('--speed',e.target.value)
    randomizeEmoji(e.target.value)
})

btnPlay.addEventListener('click',(e)=>{
    var btnclass = btnPlay.classList
    var rootStyle = document.documentElement.style

    btnclass.toggle('stopped')
    btnclass.toggle('played')

    if(btnclass.contains('played')){
        speedInput.value = 1
        rootStyle.setProperty('--speed',1)
        e.target.innerHTML = 'Stop'
    }
    else if(btnclass.contains('stopped')){
        rootStyle.setProperty('--speed',0)
        e.target.innerHTML = 'Start'
    }

    randomizeEmoji(rootStyle.getPropertyValue('--speed'))
    checkWin()
})

function checkWin(){
    if(btnPlay.classList.contains('stopped')){
        var emoji1 = value1.innerHTML
        var emoji2 = value2.innerHTML
        var emoji3 = value3.innerHTML

        if(emoji1 == emoji2 && emoji2 == emoji3){
            output.innerHTML = 'Congratulations !\n You WON'
        }else{
            output.innerHTML = 'Better Luck Next Time.'
        }
    }
}