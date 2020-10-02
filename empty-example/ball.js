var xmaxspeed = 7.1;

var ball = 
{
  life : 100,
  hit_jump : false,
  hit_right_arrow : false,
  hit_left_arrow : false,
  hitted_blockX :0,
  hitted_blockY :0,
  xpos_before_collision : 0, //collided block`s  j(x) index
  ypos_before_collision : 0, //collided block`s  i(y) index
  xpos : 100,
  ypos : 700,
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
    if(this.collision()===true)  
    {
      if(this.ypos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth+2&&this.ypos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].ypos-2&&this.xpos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].xpos)//hit from left
      {
        print(3);
          this.xspeed = -this.xspeed/2;  //bound to opposite direction by current speed/2
            if(keyIsDown(LEFT_ARROW))
           {
            print("wall jump");
            this.yspeed = -12;
           this.xspeed = -xmaxspeed*1.5;
             score++;
           }
          this.xpos = this.xpos_before_collision;  //set position to backup position
          this.xpos = this.xpos_before_collision-twidth/4;
          this.hit_right_arrow = false;          //for drop
          this.hit_left_arrow = false;           //for drop
      }
            if(this.ypos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth+2&&this.ypos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].ypos-2&&this.xpos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].xpos)//hit from right
      {
        print(3);
          this.xspeed = -this.xspeed/2;  //bound to opposite direction by current speed/2
            if(keyIsDown(RIGHT_ARROW))
           {
            print("wall jump");
             this.yspeed = -12;
           this.xspeed = xmaxspeed*1.5;
             score++;
           }
          this.xpos = this.xpos_before_collision+twidth/4;  //set position to backup position
          this.hit_right_arrow = false;          //for drop
          this.hit_left_arrow = false;           //for drop
      }
      if(this.ypos_before_collision<terrains[this.hitted_blockY][this.hitted_blockX].ypos)//hit upper
      {
        print(1);
          if(terrains[this.hitted_blockY][this.hitted_blockX].type===2)
          {
            terrains[this.hitted_blockY][this.hitted_blockX].type=0;
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
            this.yspeed=-14;
            this.yspeed_modify = 1;
            this.hit_jump = false;
            score++;
            print("breakable");
          }
          else if(this.hit_right_arrow===true)
          {
            print("hit -> arrow");
            this.yspeed = 0;
            this.xspeed = xmaxspeed;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos+twidth+10;
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth/2;
            score++;
          }
          else if(this.hit_left_arrow===true)
          {
            print("hit <- arrow");
            this.yspeed = 0;
            this.xspeed = -xmaxspeed;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos-10;
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth/2;
            score++;
          }
          else if(terrains[this.hitted_blockY][this.hitted_blockX].type===3)
          {
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
            this.yspeed = -20;
            score++;
            print("hit jump block");
          }
        else if(terrains[this.hitted_blockY][this.hitted_blockX].type===6)
        {
          if(this.life>0)
          {
          this.xpos=100;
          this.ypos=100;
          this.xspeed=0;
          this.yspeed=0;
          this.life--;
          score+=33;
          reset_map();
          }
          else
            gameover = true;
        }
          else
          {    
          this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos-twidth/2;
          this.yspeed=-14;
          this.yspeed_modify = 1;
          this.hit_jump = false;
            score++;
          }
      }
      if(this.ypos_before_collision>terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth) //hit downward
      {
        print(2);
        this.yspeed=14;
        this.yspeed_modify =-1;
        this.ypos+=this.yspeed;
        if(this.collision())
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
    
    if(this.ypos>height)
    {
      if(this.life>0)
      {
      this.xpos=100;
      this.ypos=100;
      this.xspeed=0;
      this.yspeed=0;
      this.life--;
        score+=33;
      reset_map();
      }
      else
        gameover = true;
    }
    else if(this.xpos>width)
    {
      stage++;
      this.xpos=100;
      this.ypos=100;
      this.xspeed=0;
      this.yspeed=0;
    }
    if(this.hit_right_arrow===false&&this.hit_left_arrow===false)
    {
    this.yspeedupdate();
    }
    this.xspeedupdate();
    print("stage",stage);
    //print("yspeed",this.yspeed);
  },
  yspeedupdate : function()
  {
    this.yspeed += this.yspeed_modifiy;
    if(this.hit_jump===false)
    {
      if(this.yspeed>12)
      {
        this.yspeed=12;
      }
      else if(this.yspeed<-12)
      {
        this.yspeed=-12;
      }
    }
  },
  xspeedupdate : function()
  {
    if(keyIsDown(LEFT_ARROW))
    {
      this.hit_right_arrow=false;
            if(this.xspeed>=-xmaxspeed)
            this.xspeed -= 0.3;
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.hit_left_arrow=false;
            if(this.xspeed<=xmaxspeed)
            this.xspeed += 0.3;
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
  }
}