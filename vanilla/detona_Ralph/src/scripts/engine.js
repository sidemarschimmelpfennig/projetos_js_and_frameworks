const state = {
    view :{
        squares: document.querySelectorAll(".square"),
        enemy : document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score : document.querySelector("#score") 
    },
    values : { 
        gameVelocity : 1000,
        hitPosition : 0,
        result : 0,
        currentTime : 60,
        soundDefault : 0.2,
    },
    actions : {
        countDownTimeId : setInterval(countDown, 1000),
        timeId : setInterval(randomSquare, 1000 ),
    }
}

function countDown (){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimeId) 
        clearInterval(state.actions.timeId)
        alert(`Acabou o tempo !! parabéns você eleminou ${state.values.result} Ralphs `)
    }
}

function playSound(audioName){
    let sound = new Audio(`./src/sound/${audioName}.m4a`)
    sound.volume = state.values.soundDefault;
    sound.play()
}

function addListnerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    })
}

function randomSquare (){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    }
   )
   let randomNumber = Math.floor(Math.random() * 9)
   let randomSquare = state.view.squares[randomNumber]
   randomSquare.classList.add("enemy")
   state.values.hitPosition = randomSquare.id
}

const initialize = () =>{
    addListnerHitBox()
}


initialize()