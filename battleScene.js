const battleBackgroundImg = new Image()
battleBackgroundImg.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImg
})



let gus
let walt
let q
let battleAnimationId






function initBattle() {
    document.querySelector('#ui').style.display = 'block'
    document.querySelector('#words').style.display = 'none'
    document.querySelector('#gusHealth').style.width = '100%'
    document.querySelector('#waltHealth').style.width = '100%'





    const gusImg = new Image()
    gusImg.src = './img/enemyGus.png'

    const waltImg = new Image()
    waltImg.src = './img/playerWalt.png'

    gus = new Sprite({
        position: {
            x: 800,
            y: 100
        },
        image: gusImg,
        frames: {
            max: 4
        }
    })

    walt = new Sprite({
        position: {
            x: 280,
            y: 325
        },
        image: waltImg,
        frames: {
            max: 4
        }
    })

    //if multiple attacks use queue for enemy attacks 
    q = []

    //addeventListneer defaults to window.addeventlistener so make it button
    //loops thru buttons
    document.querySelectorAll('button').forEach(button => {
        //arrow function is how we respond to the click
        button.addEventListener('click', () => {
            walt.attack({
                attack: { name: 'punched', damage: 20, type: 'Normal' },
                recpient: gus
            })
            q.push(() => {
                gus.attack({
                    attack: { name: 'punched', damage: 24, type: 'Normal' },
                    recpient: walt
                })
            })
        })

        button.addEventListener('mouseenter', (e) => {
            document.querySelector('#attackType').innerHTML = 'Normal'
            document.querySelector('#attackType').style.color = 'green'


        })
    })
}


function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    gus.draw()
    walt.draw()
    walt.animate = true
    gus.animate = true
    gus.isEnemy = true
    walt.name = 'Walt'
    gus.name = 'Gus'

}

function transition() {
    gsap.to('#overlapDiv', {
        opacity: 1,
        onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            animate()
            battle.init = false
            audio.battle.stop()
            audio.Map.play()
            document.querySelector('#ui').style.display = 'none'
            gsap.to('#overlapDiv', {
                opacity: 0
            })
        }
    })
    return

}

function gusFaint() {
    document.querySelector('#words').style.display = 'block'
    document.querySelector('#words').innerHTML = "Gus died!"
    gsap.to(gus.position, {
        y: gus.position.y + 20
    })
    gsap.to(gus, {
        opacity: 0
    })



    transition()

}

function waltFaint() {
    document.querySelector('#words').style.display = 'block'
    document.querySelector('#words').innerHTML = "Walt died!"
    gsap.to(walt.position, {
        y: walt.position.y + 20
    })
    gsap.to(walt, {
        opacity: 0
    })
    transition()
}

document.querySelector('#words').addEventListener('click', (e) => {
    if (q.length > 0) {
        //causes the enemy to attack also check health
        if (gus.health <= 0) {
            gusFaint()
            return
        }
        q[0]()
        q.shift()
        if (walt.health <= 0) {
            waltFaint()
            return
        }
    } else {
        e.currentTarget.style.display = 'none'
    }
})