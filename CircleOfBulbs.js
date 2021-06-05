
function circularArrayIndex(i , length){
    if(i == -1){
      return length-1
    }
    else if(i >= length){
      return 0
    }
    return i
  }
class CircleOfBulbs{
    constructor(n) {
        var x = BULB_RADIUS
        var y = height/2
        this.bulbRadius = BULB_RADIUS
        this.bulbs = []
        this.goalState = []
        for(var i = 0 ; i < n ; i++){
            this.bulbs[i] = new Bulb(x,y,this.bulbRadius)
            x+= 100
        }
      }
    show(){
        for(var i = 0 ; i < this.bulbs.length ; i++){
            this.bulbs[i].show()
        }
    }
  
    handleError(){
        
        for(var i = 0 ; i < this.bulbs.length ; i++){
            if(this.bulbs[i].error){
                var after = circularArrayIndex(i+1, this.bulbs.length)
                var before = circularArrayIndex(i-1,this.bulbs.length)
                this.bulbs[after].clickSwitch(false)
                this.bulbs[before].clickSwitch(false)
                this.bulbs[i].error = false
            }
        }
    }
    getState(){
        var nowstate = []
        for(var i = 0 ; i < this.bulbs.length ; i++){
            if(this.bulbs[i].state == true){
                nowstate[i] = 1
            }
            else if(this.bulbs[i].state == false){
                nowstate[i] = 0 
            }
        }
        return nowstate
    }
    resetStates(){
    for(var i = 0 ; i < this.bulbs.length ; i++){
        this.bulbs[i].state = false
    }
   }
    pathToState(path){
        
        this.resetStates()
        for(var i = 0 ; i < path.length ; i++){
            this.bulbs[path[i]].clickSwitch(true)
        }
        return this.getState()


    }
    getNumberOfSwitches(){
        var sum = 0
        for(var i = 0 ; i < this.bulbs.length ; i++){
            sum += this.bulbs[i].no_of_switches
        }
        return sum
    }

}