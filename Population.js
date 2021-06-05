  class Population {
    constructor( num,problem) {
      this.circleProblem = problem
      
      this.population;
      this.matingPool;
      this.generations = 0;
      this.finished = false;
      this.target = GOAL_STATE;
      this.mutationRate = MUTATION_RATE; 
      this.perfectScore = 4.1;
      this.best = 0;
      this.bestChromosome = null
      this.population = [];
      for (let i = 0; i < num; i++) {
        this.population[i] = new Chromosome(random(1,GOAL_STATE.length*2)+GOAL_STATE.length+50,this.circleProblem);
      }
      this.matingPool = [];
      this.calcFitness();
    }
    calcFitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness();
      }
    }
    naturalSelection() {
      this.matingPool =[]
      let maxFitness = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > maxFitness) {
          maxFitness = this.population[i].fitness;
        }
      }
      for (let i = 0; i < this.population.length; i++) {
        let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
        let n = floor(fitness * 100);
        for (let j = 0; j < n; j++) {
          this.matingPool.push(this.population[i]);
        }
      }
    }

    generate() {
      for (let i = 0; i < this.population.length; i++) {
        let a = floor(random(this.matingPool.length));
        let b = floor(random(this.matingPool.length));
        let partnerA = this.matingPool[a];
        let partnerB = this.matingPool[b];
        let child = partnerA.crossover(partnerB);
        child.mutate(this.mutationRate);
        child.state = this.circleProblem.pathToState(child.genes)
        this.population[i] = child;
      }
      this.generations++;
    }
  
    getBest() {
      return this.best;
    }
    getBestPath(){
      if(this.bestChromosome != null){
      return this.bestChromosome.genes
      }
      else
        return "Not yet"
    }
    getBestPathState(){
      if(this.bestChromosome != null){
        return this.bestChromosome.state
        }
        else
          return "Not yet"
    }
    evaluate() {
      let worldrecord = 0.0;
      let index = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > worldrecord) {
          index = i;
          worldrecord = this.population[i].fitness;        
        }
      }
      this.best = worldrecord
      this.bestChromosome = this.population[index]
      if ((JSON.stringify(circleOfBulbs.pathToState(this.bestChromosome.genes)) === JSON.stringify(GOAL_STATE)) && (this.bestChromosome.genes.length <= GOAL_STATE.length)) {
        this.finished = true;
      }
    }
    isFinished() {
      return this.finished;
    }
    getGenerations() {
      return this.generations;
    }
    getAverageFitness() {
      let total = 0;
      for (let i = 0; i < this.population.length; i++) {
        total += this.population[i].fitness;
      }
      return total / this.population.length;
    }
  
    allPhrases() {
      let everything = "";
  
      let displayLimit = min(this.population.length, 50);
  
      for (let i = 0; i < displayLimit; i++) {
        everything += this.population[i].getPhrase() + "<br>";
      }
      return everything;
    }
  }
  