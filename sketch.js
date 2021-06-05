

var population
var bestPath = []
var bestState  = []
var generations = 0
var minSwitches = 0
var fitnessFinal = 0
function populationInfo(){
  text("Minimum switches  = " + population.getBestPath().length, width/2, (height/5)-30);
  text("Best fit paths # = " + population.getBestPath(), width/2, (height/5));
  text("Best fit state # = " + population.getBestPathState(), width/2, (height/5)+30);
  text("Generation # = " + population.getGenerations(), width/2, (height/5)+60);
  text("No of Switches # = " + circleOfBulbs.getNumberOfSwitches(), width/2, (height/5)+90);
}
function setup() {
  createCanvas(2000,800);
  circleOfBulbs = new CircleOfBulbs(NO_OF_BULBS)
  population = new Population(500,circleOfBulbs)
  population.calcFitness()
  textSize(16);
  textAlign(CENTER, CENTER);
}

function draw() {
  background('grey');
  
  i = floor(random(0,NO_OF_BULBS))
  circleOfBulbs.show()
  circleOfBulbs.handleError()
  if(population != null){
    fill("black")
    stroke('black')
  population.naturalSelection();
  population.generate();
  population.calcFitness();
  population.evaluate();
  text("Minimum switches  = " + population.getBestPath().length, width/2, (height/5)-30);
  text("Best fit paths # = " + population.getBestPath(), width/2, (height/5));
  text("Best fit state # = " + population.getBestPathState(), width/2, (height/5)+30);
  text("Generation # = " + population.getGenerations(), width/2, (height/5)+60);
  text("No of Switches # = " + circleOfBulbs.getNumberOfSwitches(), width/2, (height/5)+90);
  bestPath = population.getBestPath()
  bestState = population.getBestPathState()
  generations = population.getGenerations()
  minSwitches = bestPath.length
  fitnessFinal = population.getBest()
if(population.isFinished()) {
    text("WE ARE DONE ! ", width/2, (height/3)+120);
    population = null
  }
}
if(population == null){
  text("min switches = " + minSwitches, 250, (height/5)-30);
  text("Best fit paths # = " + bestPath, 250, (height/5));
  text("Best fit state # = " + bestState, 250, (height/5)+30);
  text("Generation # = " + generations, 250, (height/5)+60);
  text("No of Switches # = " + circleOfBulbs.getNumberOfSwitches(), 250, (height/5)+90);
  text("Best fitness = " + fitnessFinal, 250, (height/5)+120);
}
  
  
}
