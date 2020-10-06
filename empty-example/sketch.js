var myfont;
var pause=false;
var game_speed=50;
var game_speed_max =70;
var game_speed_min =30;
var score = 0;
var previous_stage=-1;
var gameover = false;
let topcanvas;



function setup() {
  textFont(myfont);
  topcanvas = createGraphics(row*twidth, col*twidth);
  topcanvas.noStroke();
  topcanvas.clear();
  createCanvas(row*twidth, col*twidth);
  ellipseMode(CORNER);
  interval_stage_dead=twidth*row+250;
  canmove = false;
  fill(255);
}

function draw() {
  textSize(30);
  if(pause===false)
    {
  frameRate(game_speed);
  background(0);
  if(CFM===true)
    {
      fill(255,0,0);
      image(cute_cats,width/2-100,height/2-100,200,200);
      interval_scroll+=50;
      if(interval_scroll>3000)
        {
          interval_scroll=0;
          CFM=false;
        }
    }
  if(stage===20)
    {
      ending_credit();
    }
  else if(gameover===false&&CFM===false)
  {
  check_bomb_occur();//draw bomb effect
  is_dead();  //scroll down purple rect
  is_stageclear();//scroll side purple rect
  state();//show stage bound score
  scroll_map();//scroll up current map
  reset_states();//reset state for triggering is_dead(),is_stageclear(),state(),scroll_map()
  if(canmove===true)
    {
  ball.posupdate();
  ball.display();
  display_all_block();
    }
  topcanvas.fill(125,25);//trail
  topcanvas.ellipse(ball.xpos,ball.ypos,ball.bwidth);//trail
  image(topcanvas,0,0);
  }
  else if(gameover===true)
  {
    is_dead();
    fill(0);
    rect(0,0,deadtime,twidth*col);
    rect(width-deadtime,0,twidth*row,twidth*col);
    fill(255);
    if(deadtime>twidth*row/2-100)
      {
    text("Game OVER\n press any key to restart",width/2,height/2);
    restart();
      }
    if(deadtime<twidth*row)
      {
        deadtime+=10;
      }
  }
}
}

function keyReleased()//pause and speed modify
{
    if(pause===true)
    {
    fill(255,0,0);
    rect(width/2-100,height/2-100,400,200);
    fill(255);
    text("Game speed : "+(((game_speed)-50)/2),width/2,height/2);
    if(keyCode===LEFT_ARROW)
    {
      normal_jump.play();
      game_speed-=2;
      if(game_speed <=game_speed_min)
        {
          game_speed = game_speed_min;
        }
    }
    if(keyCode===RIGHT_ARROW)
    {
      normal_jump.play();
      game_speed+=2;
       if(game_speed >=game_speed_max)
        {
          game_speed = game_speed_max;
        }
    }
    }
}
