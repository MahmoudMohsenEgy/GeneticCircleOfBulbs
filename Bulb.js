class Bulb{
    constructor(posX,posY,radius) {
        this.posX = posX
        this.posY = posY
        this.button = createButton("Switch")
        this.radius = radius // bulb radius
        this.diameter = this.radius * 2 // bulb diameter
        this.state = false // bulb state turned on or off
        this.error = false // when clicked on button ->  error flag will be raised so it will call function to toggle adjacent bulbs
        this.no_of_switches = 0 // number of switches clicked intially = 0
        this.button.position(this.posX-BULB_RADIUS/1.2, this.posY+BULB_RADIUS*1.5)
        this.button.mousePressed(()=>{this.clickSwitch()})
      }
    show() { 
        stroke('white')
        if(this.state==true){
          fill('yellow')
        }
        else if (this.state == false) {
            fill(192,192,192)
        }
        circle(this.posX,this.posY,this.diameter)
    }
    clickSwitch(toggleFlag=true){
        if(this.state ===true){  
            this.setState(false)
        }
        else if(this.state === false){
            this.setState(true)
        }
           if(toggleFlag){
           this.error = true
           this.no_of_switches += 1
        }
        return
    }
    setState(bool){
        this.state = bool
    }
}