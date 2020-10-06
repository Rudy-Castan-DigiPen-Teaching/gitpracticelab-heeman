var interval_stage_dead =0;
var interval_scroll = 0;
var interval_announce = 0;
var index=0;
var interval_index=50;
var interval_bomb = 0;
var interval_alphabet = 0;
var nextline = 0;
var deadtime = 0;
var CFM = true;
var canmove = true;
var start = true;
var strings = "Congratulations!@You are great bound player.@Thank you for your playing!@Produced by Makoto.@...osimai...@";




function print_state()
{
  fill(255);
  text("Stage : "+(stage+1),width/2-75,height/2-height/4);
  text("Bound : "+(ball.life),width/2-75,height/2-height/4+40);
  text("Score : "+(score),width/2-75,height/2-height/4+80);
}


function keyPressed() {
  if (keyCode === ENTER&&canmove===true&&gameover===false) {
    if(pause===false)
      pause=true;
    else if(pause===true)
      pause=false;
  }
  // uncomment to prevent any default behavior
  // return false;
}

function is_dead()//scroll rect from top to down
{
    if(ball.dead ===true&&ball.hit_bomb===false)//when dead by falling to cliff
    {
            if(interval_stage_dead===interval_index)//for play one time
        {
      interface_board.play();
        }
      topcanvas.clear();//remove trails
      display_all_block();
      fill(120,120,255);//purple color
      rect(0,0,twidth*row,interval_stage_dead);
      interval_stage_dead+=interval_index;//increase variable to trigger state()
      canmove = false;//make to false to limit the ball`s movement
    }
}
function is_stageclear()//scroll left to right
{
    if(previous_stage!=stage)
    {
      if(interval_stage_dead===interval_index)//for play one time
        {
      interface_board.play();
        }
      topcanvas.clear();//remove trails
      canmove = false;//make to false to limit the ball`s movement
      display_all_block();
      fill(120,120,255);
      rect(0,0,interval_stage_dead,twidth*col);
      interval_stage_dead+=interval_index;//increase variable to trigger state()
    }
}

function state()
{
      if(canmove===false&&(interval_stage_dead>twidth*row+300))
      {
        interval_announce=interval_announce+interval_index;//interval_announce will reach 3000 after few second to trigger scroll_map()
        print_state();
      }
}

function scroll_map()
{
  //when bomb occurs hit_bomb will be reset to false and when bomb effect is big enough[scroll_map]ends right after one processed one time, is_dead() will be occured since ball.dead is true and hit_bomb is false. And other scrollings will happen sequently bomb->is_dead()->state()->scroll_map()
  if((interval_announce>3000)||(interval_bomb>128&&ball.hit_bomb===true))
  {
    if(interval_scroll===interval_index)//for play one time
      {
    interface_map.play();
      }
      ball.hit_bomb = false;
        background(0);
        previous_stage = stage;
        reset_map();
   for(var i=0;i<col;i++)
    {
      for(var j=0;j<row;j++)
      {
        if(terrains[i][j].type===1)//1:normal_block    
        {
        image(basic_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
        else if(terrains[i][j].type===2)//2:breakable block
        {
        image(breaking_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
        else if(terrains[i][j].type===3)//3:jumpblock
        {
        image(jump_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
        else if(terrains[i][j].type===4)//4:->arrowblock
        {
        image(right_arrow_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
        else if(terrains[i][j].type===5)//5:<-arrowblock
        {
        image(left_arrow_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
        else if(terrains[i][j].type===6)
        {
        image(bomb_block,terrains[i][j].xpos,terrains[i][j].ypos+twidth*col-interval_scroll,twidth,twidth);
        }
      }
    }
    interval_scroll+=interval_index;//increase variable to trigger reset_states();
    start =false;
  }
}

function reset_states()
{

    if(start ===false&&interval_scroll>twidth*col)
    {
    ball.reset_state();
    topcanvas.clear();
    canmove = true;
    interval_stage_dead=0;
    interval_bomb=0;
    interval_scroll=0;
    interval_announce=0;
    ball.dead=false;
    ball.hit_bomb= false;
    fill(255);
    start = true;
    }
}

function restart()
{
      if (keyIsPressed === true)
      {
        ball.life = 10;
        gameover=false;
        stage = 0;
        previous_stage =-1;
        score = 0;
        interval_stage_dead=twidth*row+250;
  canmove = false;
        ball.xpos =respawnX[0];
        ball.ypos =respawnY[0];
        ball.xspeed = 0;
        ball.yspeed = 0;
        deadtime = 0;
      }
      frameRate(60);
}

function ending_credit()
{
  noStroke();
      reset_map();
      interval_announce+=interval_index;
      fill(153,255,153);
      rect(width/2,twidth*col-twidth*col/4,interval_announce,twidth*col);
      rect(width/2-interval_announce,twidth*col-twidth*col/4,interval_announce,twidth*col-twidth*col/4);
      fill(153,255,255);
     rect(width/2-interval_announce,0,interval_announce,twidth*col-twidth*col/4);
      rect(width/2,0,interval_announce,twidth*col-twidth*col/4);
      frameRate(30);
      if(interval_announce>3000)
        {
          ball.xspeed = 5;
          fill(255);
          textSize(20);
          ball.posupdate();
          ball.display();
          fill(0);
          if(ball.xpos>width)
            {
              frameRate(30);
              index++;
              interval_alphabet = 0;
              for(var i =0;i<index;i++)
                {
                  if(strings[i]==='@')
                    {
                      nextline++;
                      interval_alphabet=0;
                      if(nextline>=5)
                        {
                          break;
                        }
                    }
                    else
                    {
                      text(strings[i],100+interval_alphabet*20,100+nextline*60);
                      interval_alphabet++;
                    }
                }
              if(nextline>=5)
                {
                text("Score : "+score+"   Press any key to restart",(20)*20,100+(nextline-1)*60);
                  restart();
                }
              nextline = 0;
          }
        }
}

function check_bomb_occur()
{
      if(ball.hit_bomb===true)
    {
      canmove = false;
      display_all_block();
      interval_bomb +=2;
      rectMode(CENTER);
      topcanvas.clear();
      fill(255,153,153)
      rect(ball.xpos,ball.ypos,interval_bomb*3,interval_bomb*3);//draw bombEffect
      fill(255,177,130);
      rect(ball.xpos,ball.ypos,interval_bomb*2,interval_bomb*2);
      fill(255,246,194)
      rect(ball.xpos,ball.ypos,interval_bomb*1,interval_bomb*1);
      rectMode(CORNER);
    }
}