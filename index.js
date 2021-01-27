var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time =  document.querySelector('#time')
var $result =  document.querySelector('#result')
var $lives = document.querySelector('#lives')
var $miss = document.querySelector('#miss')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var $livesHeader = document.querySelector('#lives-header')
var $missHeader = document.querySelector('#miss-header')
var $livesEnd = document.querySelector('#lives-end')

var colors = ['red', 'blue', 'yellow', 'green', 'pink']
var score = 0
var lives = 3
var miss = 0
isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show ($el) {
    $el.classList.remove('hide')
}

function hide ($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    lives = 3
    miss = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $livesHeader.classList.remove('hide')
    $livesEnd.classList.add('hide')
    $missHeader.classList.add('hide')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    var interval = setInterval(function(){
        console.log('interval', $time.textContent)
    var time = parseFloat($time.textContent)

    if(time <= 0 || lives <=0) {
        clearInterval(interval)
        endGame()
    } else {
        $time.textContent = (time - 0.1).toFixed(1)
        setLives ()
    }

    }, 100)

    renderBox()
}

function endLives() {
    endGame()
    
    $resultHeader.classList.add('hide')
}

function setMiss() {
    $miss.textContent = miss.toString()
}

function setLives() {
    $lives.textContent = lives.toString()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
}

function endGame() {
 isGameStarted = false
 setGameScore ()
 setMiss()
 setLives()
 $gameTime.removeAttribute('disabled')
 $start.classList.remove('hide')
 $game.innerHTML = ''
 $game.style.backgroundColor = '#ccc'
 $timeHeader.classList.add('hide')
 if (lives <=0) {
    $livesEnd.classList.remove('hide')
    $livesHeader.classList.add('hide')
 } else {
 $resultHeader.classList.remove('hide')
 $livesHeader.classList.add('hide')
 $missHeader.classList.remove('hide')
 }
}

function handleBoxClick (event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    } else {
        lives--
        miss++
        console.log('-1')
    }
}

function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.borderRadius = '5%'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}