function randButtonClick() {
    return floor(random(0,NO_OF_BULBS)); 
  }
  
  // Constructor (makes a random Chromosome)
  class Chromosome {
    constructor(num,problem) {
      this.circleProblem = problem
      this.genes = [];
      this.fitness = 0;
      this.state=[];
      for (let i = 0; i < num; i++) {
        this.genes[i] = randButtonClick(); // Pick from range of chars
      }
      this.state = circleOfBulbs.pathToState(this.genes,this.circleProblem);
    }
    // Fitness function (returns floating point % of "correct" characters)
    calcFitness(target) {
      let sum = 0;
      var lightUpScore = 0
      var lengthScore = 0
      var stateScore = 0 
      var duplicateScore = 0
      var nextScore = 0
      for(var i = 0 ; i < this.state.length ; i++){
        sum += this.state[i]
      }
      for(var i = 0 ; i < this.genes.length-2 ; i++){
        if(this.genes[i] == this.genes[i+1] || this.genes[i+1] == this.genes[i+2]){
          duplicateScore++
        }
        else if( this.genes.length < GOAL_STATE.length && (this.genes[i]-this.genes[i+1] == Math.abs(3) )){
          nextScore++
        }
      }
      lightUpScore = Math.pow(Math.pow(10,sum)/Math.pow(10,GOAL_STATE.length),20)
      
      /* if((this.state[NO_OF_BULBS-1] == false ) &&(this.state[NO_OF_BULBS-2] == false )&& (sum == NO_OF_BULBS-2 )){
        lightUpScore = 0.000000000000000000001
      }
        
       if((this.state[NO_OF_BULBS-1] == false ) && sum == NO_OF_BULBS-1  && (GOAL_STATE.length%3 != 0)){
        lightUpScore = 0.000000000000000000001
      }

      
      else{
      
      } */
      if(this.genes.length < NO_OF_BULBS/3.5){
        lengthScore = 0.000000000000000000001
      }
      else{
        lengthScore = Math.pow((1/this.genes.length),3)
      }
      if(JSON.stringify(this.state) == JSON.stringify(GOAL_STATE)){
        if(this.genes.length == GOAL_STATE.length/3){
          stateScore = 3
        }
        else{
        stateScore = 2
        }
      }
      if(duplicateScore != 0){
      duplicateScore = Math.pow((1/duplicateScore),20)
      }
      if(nextScore != 0){
        nextScore = Math.pow((1/nextScore),20)
      }
      this.fitness = lengthScore+stateScore+lightUpScore+duplicateScore + nextScore
    }
  

    crossover(partner) {
 
      let child = new Chromosome(this.genes.length,this.circleProblem);
      let midpoint = floor(random(this.genes.length))
      for (let i = 0; i < this.genes.length; i++) {
        if ((i > midpoint) && (this.genes != null)) child.genes[i] = this.genes[i];
        else if((i <= midpoint) && (partner.genes != null)) child.genes[i] = partner.genes[i];
      }
      return child;
    }
    mutate(mutationRate) {
    var divisor = Math.pow(10,(GOAL_STATE/2))
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < mutationRate) {
          this.genes[i] = randButtonClick();
        }
        if(this.genes.length > GOAL_STATE.length &&  GOAL_STATE.length % 3 != 0)
          if(random(1)< mutationRate/10){
          
           this.genes.pop()
            
         }
        if ((GOAL_STATE.length % 3 === 0)&& (this.genes.length != GOAL_STATE.length/3)){
           if(random(1)<mutationRate/100)
           this.genes.pop()

         }
      }
      this.genes = removeNullFromArray(this.genes)
    }
    getState(){
      return this.state
    }
  }
  function removeNullFromArray(listawy){
    x = []
    for(var i = 0 ; i < listawy.length ; i++){
      if(listawy[i] != null){
        x.push(listawy[i])
      }
    }
    return x ;

    
  }