const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576 

//c.fillStyle = 'white'
//c.fillRect(0, 0, canvas.width, canvas.height)
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push( collisions.slice(i,i+70) )
}


const boundaries = []
const offset = {
    x: -928,
    y: -1055
}

collisionsMap.forEach((row,i) => {
    row.forEach((symbol,j) => {
        if (symbol === 1025) { 
        boundaries.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    }
    })
})

const image = new Image()       
image.src = './img/Final Map.png'

const foregroundImg = new Image()       
foregroundImg.src = './img/foregroundObjects.png'

const foregroundImg2 = new Image()       
foregroundImg2.src = './img/foregroundObjects2.png'

const playerUpImg = new Image()
playerUpImg.src = './img/playerUp.png'

const playerDownImg = new Image()
playerDownImg.src = './img/playerDown.png'

const playerLeftImg = new Image()
playerLeftImg.src = './img/playerLeft.png'

const playerRightImg = new Image()
playerRightImg.src = './img/playerRIght.png'





const player = new Sprite ( {
    position: {
        x:canvas.width/2 - 192/4/2,
        y:canvas.height/2 - 68/2,
    }
    ,image: playerDownImg
    ,frames: {
        max: 4
    },
    sprites: { 
        up: playerUpImg,
        left: playerLeftImg,
        right: playerRightImg,
        down: playerDownImg
    }
})



const background = new Sprite({
    position: {x: offset.x, y: offset.y},
    image: image
})

const foreground = new Sprite({
    position: {x: offset.x, y: offset.y},
    image: foregroundImg
})

const foreground2 = new Sprite({
    position: {x: offset.x, y: offset.y},
    image: foregroundImg2
})

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
}


// ... = spread operator places all items from boundaries (array) into the moveable array
const moveable = [background, ...boundaries, foreground, foreground2]

function rectCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
}

function animate() {
    //makes infinite loop for animation
    window.requestAnimationFrame(animate)
    background.draw()

    boundaries.forEach(boundary => {
        boundary.draw()


    })
    player.draw()
    //foreground after player !
    foreground.draw()
    foreground2.draw()


    

    


    let moving  = true
    player.moving = false
    if (keys.w.pressed && lastKey == 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rectangle1: player,
                    //clone of boundary object
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                console.log("WODNAOHj")
                moving = false
                break
            }
        }
        if (moving)
            moveable.forEach(moveable => {moveable.position.y += 3}) 
    }
    else if (keys.s.pressed && lastKey == 's') { 
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rectangle1: player,
                    //clone of boundary object
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                console.log("WODNAOHj")
                moving = false
                break
            }
        }
        if (moving)
            moveable.forEach(moveable => {moveable.position.y -= 3}) 
    }
    else if (keys.a.pressed && lastKey == 'a') { 
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rectangle1: player,
                    //clone of boundary object
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y 
                    }}
                })
            ) {
                console.log("WODNAOHj")
                moving = false
                break
            }
        }
        if (moving)
            moveable.forEach(moveable => {moveable.position.x += 3}) 
    }
    else if (keys.d.pressed && lastKey == 'd') { 
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rectangle1: player,
                    //clone of boundary object
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y 
                    }}
                })
            ) {
                console.log("WODNAOHj")
                moving = false
                break
            }
        }
        if (moving)
            moveable.forEach(moveable => {moveable.position.x -= 3}) 
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})





//image.onload = () => {
//}