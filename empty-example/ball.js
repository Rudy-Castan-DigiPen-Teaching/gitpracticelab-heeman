var xmaxspeed = 7.4;
var ymaxspeed = 13;
var arrow_speed = xmaxspeed*1.7;
var walljumpY = 10.5;
var jump_speed = ymaxspeed*1.65;
var respawnX = [twidth*2.5,twidth*2.5,twidth*2.5,twidth*2.5,twidth*2.5,
                twidth*15,twidth*2.5,twidth*2.5,twidth*5.5,twidth*17.5,
                twidth*2.1,twidth*2.1,twidth*6.5,twidth*18.1,twidth*2.1,
                twidth*2.1,twidth*15.8,twidth*1.8,twidth*2.1,twidth*2.1,twidth*2.5
               ];
var respawnY = [twidth*11.5,twidth*8.5,twidth*2,twidth*10.5,twidth*2,
                twidth*2,twidth*13.5,twidth*2,twidth*13.5,twidth*7.5,
                twidth*11.9,twidth*12.9,twidth*1.5,twidth*1.9,twidth*5.9,
                twidth*3.1,twidth*11.8,twidth*2.1,twidth*1.9,twidth*9.5,twidth*10
               ];

var ball = 
{
  dead : false,
  life : 10,
  hit_jump : false,
  hit_right_arrow : false,
  hit_left_arrow : false,
  hit_bomb : false,
  hitted_blockX :0,
  hitted_blockY :0,
  xpos_before_collision : 0, //collided block`s  j(x) index
  ypos_before_collision : 0, //collided block`s  i(y) index
  xpos : respawnX[stage],
  ypos : respawnY[stage],
  bwidth : 10,
  xspeed : 0,
  yspeed : 0,
  yspeed_modifiy : 1,
  display : function()  //display
  {
    ellipse(this.xpos,this.ypos,this.bwidth);
  },
  posupdate : function() //update ball`s position
  { 
    this.ypos_before_collision = this.ypos;  //position variable for returning 
    this.xpos_before_collision = this.xpos;  //position variable for returning 
    this.ypos += this.yspeed;                //update yposition with yspeed
    this.xpos += this.xspeed;                //update xposition with yspeed
    //collision detection
    if(this.collision()===true)  //check collision
    {
      if(this.ypos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth&&this.ypos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].ypos&&this.xpos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].xpos)//hit from left
      {
        ball_hitwall.play();
          this.xspeed = -this.xspeed/2;  //bound to opposite direction by current speed/2
            if(keyIsDown(LEFT_ARROW))//using wall jump
           {
             ball_walljump.play();
            this.yspeed = -walljumpY;    //change speed
           this.xspeed = -xmaxspeed*1.5;
             score++;
           }
          this.xpos = this.xpos_before_collision-twidth/4;
          if(this.collision())
            {
              this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth+twidth/4;
              this.yspeed_modifiy = 1;
            }
          this.hit_right_arrow = false;          //for drop
          this.hit_left_arrow = false;           //for drop
      }
            if(this.ypos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth&&this.ypos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].ypos&&this.xpos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].xpos)//hit from right
      {
        ball_hitwall.play();
          this.xspeed = -this.xspeed/2;  //bound to opposite direction by current speed/2
            if(keyIsDown(RIGHT_ARROW))  //using wall jump
           {
             ball_walljump.play();
             this.yspeed = -walljumpY;    //change speed
           this.xspeed = xmaxspeed*1.5;
             score++;
           }
          this.xpos = this.xpos_before_collision+twidth/4;  //set position to backup position
            if(this.collision())
            {
              this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth+twidth/4;
              this.yspeed_modifiy = 1;
            }
          this.hit_right_arrow = false;          //for drop
          this.hit_left_arrow = false;           //for drop
      }
      if(this.ypos_before_collision<terrains[this.hitted_blockY][this.hitted_blockX].ypos)//hit upper
      {
          if(terrains[this.hitted_blockY][this.hitted_blockX].type===2)  //breakable block
          {
            block_break.play();
            terrains[this.hitted_blockY][this.hitted_blockX].type=0;  //change block to blank
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
            this.yspeed=-ymaxspeed;      //reset speed to upper
            this.yspeed_modify = 1;  //change gravity direction
            this.hit_jump = false;  //change to normal jump if hitted jump block right before
            score++;
          }
          else if(this.hit_right_arrow===true)//->block (4)
          {
            block_arrow.play();
            this.yspeed = 0;
            this.xspeed = arrow_speed;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos+twidth+10;//starts at
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+5;
            score++;
          }
          else if(this.hit_left_arrow===true)//<- block (5)
          {
            block_arrow.play();
            this.yspeed = 0;
            this.xspeed = -arrow_speed;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos-10;//starts at
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+5;
            score++;
          }
          else if(terrains[this.hitted_blockY][this.hitted_blockX].type===3)//jump block
          {
            block_jump.play();
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
            this.yspeed = -jump_speed;
            score++;
          }
        else if(terrains[this.hitted_blockY][this.hitted_blockX].type===6)//bomb block
        {
          block_bomb.play();
          this.life--;
          score+=33;
          reset_map();//recreate used block such as breakable blocks
          this.dead = true;
          this.hit_bomb = true;
          if(this.life<0)
          {
            gameover = true;
          }
        }
          else if(terrains[this.hitted_blockY][this.hitted_blockX].type===1&&terrains[this.hitted_blockY-1][this.hitted_blockX].type===0)//normal blocks
          {    
          if(stage<20)
          {
          ball_bounce.play();
          }
          this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
          this.yspeed=-ymaxspeed;
          this.yspeed_modify = 1;
          this.hit_jump = false;
            if(this.xspeed >xmaxspeed)
              {
                this.xspeed = xmaxspeed;
              }
            else if(this.xspeed <-xmaxspeed)
              {
                this.xspeed = -xmaxspeed;
              }
            score++;
          }
      }
      if(this.ypos_before_collision>terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth) //hit downward
      {
        this.yspeed=ymaxspeed;
        this.yspeed_modify =-1;
        this.ypos+=this.yspeed;
        if(this.collision())//collision check for preventing the ball diging the wall
        {
          if(this.xpos>terrains[this.hitted_blockY][this.hitted_blockX].xpos+(twidth/2))
          {
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos+twidth+twidth/4;
            this.ypos -=this.yspeed;
            this.yspeed = 0;
          }
          else if(this.xpos<terrains[this.hitted_blockY][this.hitted_blockX].xpos)
          {
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos-twidth/4;
            this.ypos -=this.yspeed;
            this.yspeed = 0;
          }
        }
    }
    }//collision detection
    
    if(this.ypos>height)//falling down
    {
      
        this.reset_state();
        this.life--;
        score+=33;
        reset_map();
        this.dead = true;
        ball_fall.play();
      if(this.life<0)
        gameover = true;
    }
    else if(this.xpos>width)//stage clear
    {
      if(stage<20)
      {
      stage++;
      this.reset_state();
      }
      else
        {
          this.xpos = width+100;
          this.ypos = twidth*col/4;
        }
    }
    if(this.hit_right_arrow===false&&this.hit_left_arrow===false)
    {
    this.yspeedupdate();
    }
    this.xspeedupdate();
  },
  yspeedupdate : function()
  {
    this.yspeed += this.yspeed_modifiy;
    if(this.hit_jump===false)
    {
      if(this.yspeed>ymaxspeed)
      {
        this.yspeed=ymaxspeed;
      }
      else if(this.yspeed<-ymaxspeed)
      {
        this.yspeed=-ymaxspeed;
      }
    }
  },
  xspeedupdate : function()
  {
    if(stage<20)
      {
    if(keyIsDown(LEFT_ARROW))
    {
      this.hit_right_arrow=false;
            if(this.xspeed>=-xmaxspeed)
            this.xspeed -= 0.6;
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.hit_left_arrow=false;
            if(this.xspeed<=xmaxspeed)
            this.xspeed += 0.6;
    }
      }
  },
  collision : function()
  {
    for(var i=0;i<col;i++)
    {
      for(var j=0;j<row;j++)
      {
        if(this.xpos<terrains[i][j].xpos+twidth && this.xpos+this.bwidth>terrains[i][j].xpos && this.ypos<terrains[i][j].ypos+twidth && this.ypos+this.bwidth>terrains[i][j].ypos)
        {
          if(terrains[i][j].type===1)
          {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
            return true;
          }
          else if(terrains[i][j].type===2)
          {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
            return true;
          }
          else if(terrains[i][j].type===3)
          {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
            this.hit_jump=true;
            return true;
          }
          else if(terrains[i][j].type===4)// ->block
          {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
            this.hit_right_arrow=true;
            return true;
          }
          else if(terrains[i][j].type===5)// <- block
          {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
            this.hit_left_arrow=true;
            return true;
          }
          else if(terrains[i][j].type===6)
            {
            this.hitted_blockX=j;
            this.hitted_blockY=i;
              return true;
            }
        }
      }
    }
    return false;
  },
  
  reset_state : function()
  {
      this.xpos=respawnX[stage];
      this.ypos=respawnY[stage];
      this.xspeed=0;
      this.yspeed=0;
  }
}