var myfont;
var row = 20;      //game has 20 blocks at row
var col = 15;      //game has 15 blocks at col
var twidth = 64;   //block`s width is 64
var stage = 12;
var basic_block;
var breaking_block;
var jump_block;
var left_arrow_block;
var right_arrow_block;
var bomb_block;
var cute_cats;

var ball_bounce;
var ball_hitwall;
var ball_fall;
var ball_walljump;

var block_jump;
var block_break;
var block_arrow;
var block_bomb;

var interface_board;
var interface_map;
function preload() {
  basic_block = loadImage('blocks/basic_block.png');
  breaking_block = loadImage('blocks/breaking_block.png');
  jump_block = loadImage('blocks/jump_block.png');
  left_arrow_block = loadImage('blocks/left_arrow_block.png');
  right_arrow_block = loadImage('blocks/right_arrow_block.png');
  bomb_block = loadImage('blocks/bomb_block.png');
  myfont = loadFont('myfonts/dmo.otf');
  cute_cats = loadImage('blocks/cute_cats.PNG');
  
  ball_bounce = loadSound('sounds/ball_bounce.wav');
  ball_fall = loadSound('sounds/ball_fall.wav');
  ball_hitwall = loadSound('sounds/ball_hitwall.wav');
  ball_walljump= loadSound('sounds/ball_walljump.mp3');
  
  block_jump = loadSound('sounds/block_jump.wav');
  block_break = loadSound('sounds/block_break.wav');
  block_arrow = loadSound('sounds/block_arrow.mp3');
  block_bomb = loadSound('sounds/block_bomb.wav');
  
  interface_board= loadSound('sounds/interface_board.wav');
  interface_map = loadSound('sounds/interface_map.wav');
}


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
      type : maps[stage][i][j],  //read from maps array
      display : function()
      {
        if(this.type===1)//1:normal_block    
        {
        image(basic_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===2)//2:breakable block
        {
        image(breaking_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===3)//3:jumpblock
        {
        image(jump_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===4)//4:->arrowblock
        {
        image(right_arrow_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===5)//5:<-arrowblock
        {
        image(left_arrow_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===6)
        {
        image(bomb_block,this.xpos,this.ypos,twidth,twidth);
        }
      }
    }
  }
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

function reset_map()
{
    for(var i=0;i<col;i++)
{
  terrains[i] = [];
  for(var j=0;j<row;j++)
  {
    terrains[i][j] = 
    {
      xpos : j*twidth,    //drawing from this.xpos
      ypos : i*twidth,    //drawing from this.ypos
      type : maps[stage][i][j],  //read from maps array
      display : function()
      {
        if(this.type===1)//1:normal_block    
        {
        image(basic_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===2)//2:breakable block
        {
        image(breaking_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===3)//3:jumpblock
        {
        image(jump_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===4)//4:->arrowblock
        {
        image(right_arrow_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===5)//5:<-arrowblock
        {
        image(left_arrow_block,this.xpos,this.ypos,twidth,twidth);
        }
        else if(this.type===6)
        {
        image(bomb_block,this.xpos,this.ypos,twidth,twidth);
        }
      }
    }
  }
}
  ball.hit_right_arrow = false;
  ball.hit_left_arrow = false;
}