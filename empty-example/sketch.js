var x = 0;
var y = 0;
var total_x_block = 20;
var total_y_block = 15;
var terrains = [];
  for(var i = 0;i<total_x_block;i++) // set map
  {
    terrains[i] = [];
    for(var j =0; j<total_y_block;j++)
        {
        	if(i===0||j===0||j===total_y_block-1||i===total_x_block-1)
        	{
            terrains[i][j]={
            twidth:40,
            xpos:i*40,
            ypos:j*40,
            type:1,
            display : function(){
              if(this.type===1)
              {
                rect(this.xpos,this.ypos,this.twidth,this.twidth);
                }
                  }
                };
              }
            else
            {
            terrains[i][j]={
            twidth:40,
            xpos:i*40,
            ypos:j*40,
            type:0,
            display : function(){
              if(this.type===1)
              {
                rect(this.xpos,this.ypos,this.twidth,this.twidth);
                }
                  }
                };
              }
      }
  }

              terrains[10][13].type =1;
              terrains[11][13].type =1;
              terrains[12][13].type =1;
              terrains[13][13].type =1;
              terrains[14][13].type =1;
              terrains[15][13].type =1;
              terrains[16][13].type =1;
              terrains[17][13].type =1;
              terrains[18][13].type =1;
              terrains[19][13].type =1;
              terrains[15][12].type =1;
              terrains[16][12].type =1;
              terrains[17][12].type =1;
              terrains[18][12].type =1;
              terrains[19][12].type =1;




  var bounce = {
  xpos : 100,
  ypos :100,
  yspeed : 0,
  xspeed : 0,
  diameter : 10,
  display : function(){
  ellipse(this.xpos,this.ypos,this.diameter,this.diameter);
  },
  ymove : function(){
    if(this.ycollision()===true) // if true reset yspeed
    {
      this.yspeed = -15;
    }
    this.yspeed += 1; 
    this.ypos +=this.yspeed;
  },
  xmove : function(){ 
    if(keyIsDown(LEFT_ARROW)){ 
            if(this.xspeed>-2.4)
    this.xspeed -= 0.3;
    }
    else if(keyIsDown(RIGHT_ARROW)){
      if(this.xspeed<2.4)
    this.xspeed += 0.3;
    }
        this.xpos +=this.xspeed;
    if(this.xpos<=terrains[0][0].twidth) // when hist the left end wall
    {
    	this.xpos = terrains[0][0].twidth;
      this.xspeed=0.6;
    }
    else if(this.xpos>=(total_x_block-1)*terrains[0][0].twidth) // when hits the right end wall
    {
    	this.xpos = (total_x_block-1)*terrains[0][0].twidth;
      this.xspeed=-0.6; 
    }
  },
  findx : function() // find the chun of the ball
  {
  	for(var i=0;i<total_x_block;i++)
  	{
  		if(i*terrains[0][0].twidth<this.xpos&&i*terrains[0][0].twidth+terrains[0][0].twidth>this.xpos)
  		{
  			x = i;
  			return i;
  		}
  	}
  },
  findy : function() // find the chunk of the ball 
  {
  	for(var i =0;i<total_y_block;i++)
  	{
  		if(i*terrains[0][0].twidth<this.ypos&&i*terrains[0][0].twidth+terrains[0][0].twidth>this.ypos)
  		{
  			y=i;
  			return i;
  		}
  	}
  },
  ycollision : function()	//if block is under the ball return true
  {
  	this.findx();
  	this.findy();
  	if(terrains[x][y+1].type===1)
  	{
  		return true;
  	}
  	return false;
  }
};







function setup() {
  createCanvas(1000, 800);
}








function draw() {
  background(220);
  for(var i = 0;i<total_x_block;i++)
  {
    for(var j =0; j<total_y_block;j++)
        {
          terrains[i][j].display();
        }
  }
  bounce.display();
  bounce.ymove();
  bounce.xmove();
}