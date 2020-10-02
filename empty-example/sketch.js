
var score = 0;
var previous_stage=0;
var gameover = false;


function setup() {
  frameRate(30);
  createCanvas(row*twidth, col*twidth);
  ellipseMode(CORNER);
}

function draw() {
  background(0);
  if(gameover===false)
  {
  if(previous_stage!=stage)
  {
    previous_stage = stage;
    reset_map();
  }
  ball.posupdate();
  ball.display();
  display_all_block();
  }
  else
  {
    text("Game OVER",width/2,height/2);
  }
  print(score);
}

