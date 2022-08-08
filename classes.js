class Sprite {
    constructor({position, image, frames = {max: 1}, sprites, animate = false }) {
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
    }

    draw() {
        c.drawImage(this.image, background.position.x,background.position.y)
        //2-5 arguements are cropping, 6-7 is placement, 8-9 is how large we want img 
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
        c.fillStyle = 'rgba(255,0,0,0.3)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}