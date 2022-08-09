class Sprite {
    constructor({position, image, frames = {max: 1}, sprites, animate = false, isEnemy = false, name }) {
        this.position = position
        this.image = image 
        //frames are defaulted to one, used to crop the apporpriate amount 
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 

        }
        this.animate = false 
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = this.isEnemy
        this.name = name
    }

    draw() {
        //c.drawImage(this.image, background.position.x,background.position.y)
        //2-5 arguements are cropping, 6-7 is placement, 8-9 is how large we want img 
        //save/restore makes it so only the drwaImg property is affected when we call a global property
        //(opacity) in the attack animation 
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
            )
        c.restore()
            
            if (!this.animate) return

            if (this.frames.max > 1) {
                this.frames.elapsed++ 
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1)
                    this.frames.val++ 
                else this.frames.val = 0
        }
    
    }
    //More attacks can easily be added in the future 
    attack({attack, recpient}) {
        document.querySelector('#words').style.display = 'block'
        document.querySelector('#words').innerHTML = this.name + ' ' + attack.name + ' ' + recpient.name
        recpient.health -= attack.damage
        const tl = gsap.timeline()

        let movementDistance = 20
        if(this.isEnemy) movementDistance = -20

        let healthBar = '#gusHealth'
        if (this.isEnemy) healthBar = '#waltHealth'
        tl.to(this.position, {
            x: this.position.x  - movementDistance
        }).to(this.position, {
            x: this.position.x + movementDistance*2,
            duration: 0.1,
            onComplete: () => {
                //enemy gets hit, use '#' to refer to html id
                gsap.to(healthBar, {
                    width: recpient.health + '%', 
                })
                gsap.to(recpient.position, {
                    x: recpient.position.x + 10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.07
                })
                gsap.to(recpient, {
                    opacity: 0,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.07
                })
                audio.hit.play()
            }
        }).to(this.position, {
            x:this.position.x 
        })

   
    }

}  



class Boundary {
    static width = 45
    static height = 45
    constructor({position}) {
        this.position = position
        this.width = 45
        this.height = 45  
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}