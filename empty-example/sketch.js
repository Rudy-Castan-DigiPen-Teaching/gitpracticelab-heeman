var row = 20;      //game has 20 blocks at row
var col = 15;      //game has 15 blocks at col
var twidth = 64;   //block`s width is 64
var maps = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,1,1,1],
[1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
[1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
[1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];//0:blank 1:normal_block 2:breakable block 3:jumpblock 4:->arrowblock 5:<-arrowblock
var terrains = [];
for(var i=0;i<col;i++)
{
  terrains[i] = [];
  for(var j=0;j<row;j++)
  {
    terrains[i][j] = 
    {
      xpos : j*twidth,    //drawing from this.xpos
      ypos : i*twidth,    //drawing from this.ypos
      type : maps[i][j],  //read from maps array
      display : function()
      {
        if(this.type===1)//1:normal_block    
        {
        rect(this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===2)//2:breakable block
        {
        ellipse(this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===3)//3:jumpblock
        {
        rect(this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===4)//4:->arrowblock
        {
        rect(this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===5)//5:<-arrowblock
        {
        rect(this.xpos,this.ypos,twidth,twidth);
        }
      }
    }
  }
}

var ball = 
{
  hit_jump : false,
  hit_right_arrow : false,
  hit_left_arrow : false,
  hitted_blockX :0,
  hitted_blockY :0,
  xpos_before_collision : 0,
  ypos_before_collision : 0,
  xpos : 100,
  ypos : 100,
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
    if(this.collision()===true)  
    {
      if(this.ypos_before_collision<terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth&&this.ypos_before_collision>terrains[this.hitted_blockY][this.hitted_blockX].ypos)
      {
        print(3);
          this.xspeed = -this.xspeed/2;  //bound to opposite direction by current speed/2
          this.xpos = this.xpos_before_collision;  //set position to backup position
          this.hit_right_arrow = false;          //for drop
          this.hit_left_arrow = false;           //for drop
      }
      if(this.ypos_before_collision<=terrains[this.hitted_blockY][this.hitted_blockX].ypos)
      {
        print(1);
          if(this.hit_right_arrow===true)
          {
            print("hit -> arrow");
            this.yspeed = 0;
            this.xspeed = 7.2;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos+twidth+10;
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth/2;
          }
          else if(this.hit_left_arrow===true)
          {
            print("hit <- arrow");
            this.yspeed = 0;
            this.xspeed = -7.2;
            this.xpos = terrains[this.hitted_blockY][this.hitted_blockX].xpos-10;
            this.ypos = terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth/2;
          }
          else if(terrains[this.hitted_blockY][this.hitted_blockX].type===3)
          {
            this.yspeed = -20;
            print("hit jump block");
          }
          else
          {
          this.xpos = this.xpos_before_collision;
          this.yspeed=-14;
          this.yspeed_modify = 1;
          this.hit_jump = false;
          }
      }
      if(this.ypos_before_collision>=terrains[this.hitted_blockY][this.hitted_blockX].ypos+twidth)
      {
        print(2);
        this.yspeed=14;
        this.yspeed_modify =-1;
          this.xpos = this.xpos_before_collision + this.xspeed;
      }
    }
    if(this.hit_right_arrow===false&&this.hit_left_arrow===false)
    {
    this.yspeedupdate();
    }
    this.xspeedupdate();
    //print("xspeed",this.xspeed);
    //print("yspeed",this.yspeed);
  },
  yspeedupdate : function()
  {
    this.yspeed += this.yspeed_modifiy;
    if(this.hit_jump===false)
    {
      if(this.yspeed>14)
      {
        this.yspeed=14;
      }
      else if(this.yspeed<-14)
      {
        this.yspeed=-14;
      }
    }
  },
  xspeedupdate : function()
  {
    if(keyIsDown(LEFT_ARROW))
    {
      this.hit_right_arrow=false;
            if(this.xspeed>=-7.2)
            this.xspeed -= 0.3;
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.hit_left_arrow=false;
            if(this.xspeed<=7.2)
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
            terrains[i][j].type =0;
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
        }
      }
    }
    return false;
  }
}

function setup() {
  createCanvas(row*twidth, col*twidth);
  ellipseMode(CORNER);
}

function draw() {
  background(220);
  display_all_block();
  ball.posupdate();
  ball.display();
}

function display_all_block()
{
    for(var i=0;i<col;i++)
{
  for(var j=0;j<row;j++)
  {
    terrains[i][j].display();
  }
}
}