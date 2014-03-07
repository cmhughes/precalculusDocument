/*

GRAPHING.js
===================
	Copyright (C) <2008>  <Dr Chris Hughes>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Please feel free to contact me at:

		christopher.michael.hughes@gmail.com

Description
===================
	
	This file contains the graphing engine, which is a function called, 'drawstuff'
	It takes 2 arguments:

		- CONSTRUCTIONVARS: different for each function- see the numerous examples for more explanations
		- ID: this is the id of the element that the graph will be drawn onto

*/

function drawBullet(xCoord,yCoord,plotOptions,id,radius)
{

		if(radius == undefined)
		{
			radius = 0.25;
		}
		var canvas = document.getElementById(id);
		if (canvas.getContext) 
		{
			var ctx = canvas.getContext("2d");
			var width = canvas.width;
			var height = canvas.height;

            // leave enough space for ticks
		    width -= 40;
		    height-= 40;
			
			var xmin = plotOptions.xmin || -8;
			var xmax = plotOptions.xmax || 11;
			var xres = plotOptions.xres || 1;

			var ymin = plotOptions.ymin || -9;
			var yMax = plotOptions.ymax || 15;
			var yres = plotOptions.yres || 1;
			
			tmin = 0;
			tmax = 2*Math.PI;
			tstep = 0.001;
			numberOfPoints = Math.ceil((tmax-tmin)/tstep);		
					
			ctx.strokeStyle = "rgb(1,1,0)";
			ctx.beginPath();
			
			for(i=0; i<=(numberOfPoints+1); i++)
			{
				t = tmin + i*tstep;
				
				x = xCoord + radius*Math.cos(t);
				y = yCoord + radius*Math.sin(t)
				
				// scale x and y
				y *= -height/(yMax-ymin);
		
				x *= width/(xmax-xmin);

				ctx.lineTo(x,y);
			}
	
			ctx.fill();

		}
}

function writeToGraph(xCoord,yCoord,text,plotOptions,id)
{

		var canvas = document.getElementById(id);
		if (canvas.getContext) 
		{
			var ctx = canvas.getContext("2d");
			var width = canvas.width;
			var height = canvas.height;

            // leave enough space for ticks
		    width -= 40;
		    height-= 40;
			
			var xmin = plotOptions.xmin || -8;
			var xmax = plotOptions.xmax || 11;
			var xres = plotOptions.xres || 1;

			var ymin = plotOptions.ymin || -9;
			var yMax = plotOptions.ymax || 15;
			var yres = plotOptions.yres || 1;
			
			// scale x and y
			yCoord *= -height/(yMax-ymin);
			xCoord *= width/(xmax-xmin);

            // text style
		    ctx.mozTextStyle = "9pt Arial";
			ctx.mozDrawText(text);	

		}
}



function animateGraph(myinputID, plotOptions, graphingFn, constructionVars)
{
	canvas = document.getElementById(myinputID);
	if (canvas.getContext) 
	{
	
		// set up the function that we will be plotting	
		graphingFunction = string2Object(graphingFn);
		graphingFunction.plotOptions = plotOptions;
		
		// get the canvas
		var ctx = canvas.getContext("2d");
		
		// set the line colour
		ctx.strokeStyle = graphingFunction.plotOptions.lineColours[graphingFunction.plotOptions.lineCount-1];
		
		// width and height
		var width = canvas.width;
		var height = canvas.height;
		
		// properties of the viewing window
		var xmin = plotOptions.xmin;
		var xmax = plotOptions.xmax;

		var ymin = plotOptions.ymin;
		var yMax = plotOptions.ymax;

		var a = plotOptions.a;
		var b = plotOptions.b;
		
		// previous point
		x1 = a+(b-a)/100*(animateGraph.counter-1);
		y1 = graphingFunction("","", constructionVars, x1); 
		
		// scale it
		y1 *= -height/(yMax-ymin);
		x1 *= width/(xmax-xmin);
		
		// new point
		x2 = a+(b-a)/100*(animateGraph.counter);
		y2 = graphingFunction("","", constructionVars, x2); 
		
		// scale it
		y2 *= -height/(yMax-ymin);
		x2 *= width/(xmax-xmin);
		
		// draw a tiny part of the line, when enough of these are put together it looks animated!
		if(Math.abs(y1)!=Infinity && Math.abs(y1)!=NaN && Math.abs(y2)!=Infinity && Math.abs(y2)!=NaN)
		{
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2)
			ctx.stroke();
		}
		
	}
	
	// this bit is really important!
	animateGraph.counter++;
	
	// when we have reached the end x value
	if(animateGraph.counter==100)
	{
		if(graphingFunction.plotOptions.lineCount==graphingFunction.plotOptions.numberOfLines)
		{
			// end the animation
			clearInterval ( animateTimer );
		}
		else
		{
			// continue the animation with the next line
			animateGraph.counter=0;
			graphingFunction.plotOptions.lineCount++;
		}
	}
	
}


function drawStuff(constructionVars, id)
{

	plotOptions = this.plotOptions;


	var canvas = document.getElementById(id);
	if (canvas.getContext) {
        	var ctx = canvas.getContext("2d");
		var width = canvas.width;
		height = canvas.height;

		// Draw a box round the canvas
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(width,0);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,0);
		ctx.strokeStyle = "rgb(0,0,200)";
		//ctx.stroke();
		
		
		ctx.strokeStyle = "rgb(0,0,0)";
		
        // leave enough space to put ticks on
		width -= 40;
		height -=40;
		
		// Leave enough space for the y-axis tick marks
		ctx.translate(20,20);
		
		// Draw boundary
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(width,0);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,0);
		ctx.stroke();

		// Grid lines variables
		var yIncrement, y;
		var xIncrement, x;
	
		var xmin = plotOptions.xmin;
		var xmax = plotOptions.xmax;
		var xres = plotOptions.xres || 1;

		var ymin = plotOptions.ymin;
		var yMax = plotOptions.ymax;
		var yres = plotOptions.yres || 1;

		var a = plotOptions.a || 0.0001;
		var b = plotOptions.b || 10;

		// Grid lines y direction
		yIncrement = height/(yMax-ymin)*yres;

		var thick = 0;
		if(Math.round(yMax/2)==yMax/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			y = (yres * i)*height/(yMax-ymin);	
		
			if(y<=(height))
			{
				ctx.beginPath();

				if(thick)
				{
					ctx.lineWidth = 1/4;
					thick = 0;		
				}
				else
				{
					ctx.lineWidth = 1/8;
					thick = 1;		
				}
		
				//ctx.lineWidth = 1/2;
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);	
				ctx.stroke();
			}
		}

		// Grid lines x direction
		xIncrement = width/(xmax-xmin)*xres;

		var thick = 0;
		if(Math.round(xmin/2)==xmin/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(width/xIncrement); i++)
		{	
			ctx.beginPath();
	
			if(thick)
			{
				ctx.lineWidth = 1/4;
				thick = 0;		
			}
			else
			{
				ctx.lineWidth = 1/8;
				thick = 1;		
			}

			//ctx.lineWidth = 1/2;
			x = (xres * i)*width/(xmax-xmin);	
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);	
			ctx.stroke();
		}


		// Find the origin
		var originY, originX;
		originY = height/(yMax-ymin)*yMax;
		originX = width/(xmax-xmin)*Math.abs(xmin);

		// Draw the y - axis
		ctx.beginPath();
		ctx.moveTo(originX,0);
		ctx.lineTo(originX,height);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Draw the x - axis
		ctx.beginPath();
		ctx.moveTo(0,originY);
		ctx.lineTo(width,originY);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Set the origin as the reference point
		ctx.translate(originX,originY);

		// Draw the curve
		var x, y, deltax, numberOfPoints, gridpointX;

		if(plotOptions.numberOfPoints==undefined)
		{
		        numberOfPoints = 1000;
		}
		else
		{
				numberOfPoints = plotOptions.numberOfPoints;
		}

		deltax = (b-a)/numberOfPoints;

		// switch off vertical asymptotes by default
		vertAsymp = 0;
		
		//ctx.strokeStyle = "rgb(0,0,200)";

		for(j=0; j<this.plotOptions.numberOfLines; j++)
		{
			
			ctx.strokeStyle = this.plotOptions.lineColours[j];
	
	
			if(plotOptions.parametric==1)
			{
				tmin = plotOptions.tmin;
				tmax = plotOptions.tmax;
				tstep = plotOptions.tstep;
				numberOfPoints = Math.ceil((tmax-tmin)/tstep);		

				ctx.beginPath();
				for(i=0; i<=(numberOfPoints+1); i++)
				{
					t = tmin + i*tstep;
					[x,y] = this.graphingFunction("","",constructionVars, t); 

					// get the unscaled x and y which we need to determine if (x,y) are outside of the viewing window
					xUnscaled = x;
					yUnscaled = y;
					
					// scale x and y
					y *= -height/(yMax-ymin);
					x *= width/(xmax-xmin);

					// check that the current point is in the viewing window
					if(yUnscaled<=yMax && yUnscaled>=ymin && xUnscaled>=xmin && xUnscaled <=xmax)		
					{
						ctx.lineTo(x,y);
					}
					
				}
				ctx.stroke();
			}
			else
			{

				ctx.beginPath();
				for(i=0; i<numberOfPoints; i++)
				{

					x = a + deltax*i;	
					y = this.graphingFunction("","",constructionVars, x); 

					// discontinuities
					if(Math.abs(y)==Infinity || Math.abs(y)==NaN)
					{
						if(i>0)
						{

							// store the old value of y
							yOld = y;
	
							// we determine the behaviour of y surrounding
							// the vertical asymptote by examining yPrevious
							if(yPrevious<0)
							{
								y = ymin;
							}		
							else if(yPrevious>0)
							{
								y = yMax;
							}		
	
							// need the unscaled version of y to make sure it doesn't go above the gridlines
							yUnscaled = y;

							// scale x and y
							y *= -height/(yMax-ymin);
							x *= width/(xmax-xmin);
					
							// end the current path before we cross the discontinuity
							if(alreadyReachedExtremePoint!=1)
							{
								ctx.lineTo(x,y);											
							}
							ctx.stroke();

							
							// begin a new path
							ctx.beginPath();
										
							if(yOld<0)
							{
								y = ymin;
							}
							else if(yOld>0)
							{
								y = yMax;
							}
							y *= -height/(yMax-ymin);
							
							//ctx.lineTo(x,y);			
							
							vertAsymp = 1;
							yAsymptote = y;				
						}
					}
					else
					{
			
						yPrevious = y;
						
						// need the unscaled version of y to make sure it doesn't go above the gridlines
						yUnscaled = y;
						
						// scale x and y
						y *= -height/(yMax-ymin);
						x *= width/(xmax-xmin);
					
						if(yUnscaled<=yMax && yUnscaled>=ymin)
						{			
							// if we've got
							//		ymin <= y <= ymax
							ctx.lineTo(x,y);	
							alreadyReachedExtremePoint = 0;							
							
							if(vertAsymp == 1)
							{
								// draw a line to either ymin or yMax (determined above)
								ctx.lineTo(x,yAsymptote);
								
								// switch off vertical asymptotes
								vertAsymp = 0;
								
								// move back to beginning of the curve
								ctx.moveTo(x,y);
							}
							
						}
						else
						{
							// if the graph starts off outside of the viewing window, then i=0 (first point on the graph)
							if(i==0)
							{
								alreadyReachedExtremePoint = 1;
							}
						
							// otherwise we are at the first occurence when the function goes out of the viewing window
							if(alreadyReachedExtremePoint !=1)
							{
								// determine if we're closer to ymin or yMax
								if(Math.abs(yUnscaled-ymin)<Math.abs(yUnscaled-yMax))
								{
									ctx.lineTo(x,ymin*(-height/(yMax-ymin)));
								}
								else
								{
									ctx.lineTo(x,yMax*(-height/(yMax-ymin)));
								}
							}
							alreadyReachedExtremePoint = 1;
						}
						
					}
				}
				ctx.stroke();
			}

			this.plotOptions.lineCount++;
		}

		//return;


		// x and y tick marks
		ctx.translate(-originX-15,-originY);
		ctx.mozTextStyle = "9pt Arial";

        
		// keep track of the origin
		originalX = originX + 15;
		originalY = originY;
	
		// y ticks
		var axislabel = yMax;
		for(i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			ctx.fillStyle = "blue";
			ctx.mozDrawText(axislabel);	
			ctx.translate(0, (yres)*height/(yMax-ymin));
			axislabel -= yres;
            
			// keep track of the origin
			originalY -= (yres)*height/(yMax-ymin);
		}
	
		ctx.translate(0, -(yres)*height/(yMax-ymin));
        
		// keep track of the origin
		originalY += (yres)*height/(yMax-ymin);
		
		// x ticks
		axislabel = xmin;
		ctx.translate(10,15);
        
		// keep track of the origin
		originalX -= 10;
		originalY -= 15;
	
		for(i=0; i<=Math.ceil(width/xIncrement); i++)
		{
			ctx.fillStyle = "blue";
			ctx.mozDrawText(axislabel);	
			ctx.translate((xres)*width/(xmax-xmin),0);
			axislabel += xres;
            
			// keep track of the origin
			originalX -= (xres)*width/(xmax-xmin);
		}
        
		// put the 'cursor' back at the origin
		ctx.translate(originalX,originalY);

	}

}


// contains ANIMATION code
function drawStuffOLD(constructionVars, id)
{

	plotOptions = this.plotOptions;


	var canvas = document.getElementById(id);
	if (canvas.getContext) {
       	var ctx = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height;

		// Leave enough space for the y-axis tick marks
		ctx.translate(20,0);

		// Draw boundary
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(width-20,0);
		ctx.lineTo(width-20,height-20);
		ctx.lineTo(0,height-20);
		ctx.lineTo(0,0);
		ctx.stroke();

		// Grid lines variables
		var yIncrement, y;
		var xIncrement, x;
	
		var xmin = plotOptions.xmin || -8;
		var xmax = plotOptions.xmax || 11;
		var xres = plotOptions.xres || 1;

		if(plotOptions.ymin==0)
		{
			ymin = 0;
		}
		else
		{
			var ymin = plotOptions.ymin || -9;
		}
		var yMax = plotOptions.ymax || 15;
		var yres = plotOptions.yres || 1;

		var a = plotOptions.a || 0.0001;
		var b = plotOptions.b || 10;

		// Grid lines y direction
		yIncrement = height/(yMax-ymin)*yres;

		var thick = 0;
		if(Math.round(yMax/2)==yMax/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			y = (yres * i)*height/(yMax-ymin);	
		
			if(y<=(height-20))
			{
				ctx.beginPath();

				if(thick)
				{
					ctx.lineWidth = 1/4;
					thick = 0;		
				}
				else
				{
					ctx.lineWidth = 1/8;
					thick = 1;		
				}
		
				//ctx.lineWidth = 1/2;
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);	
				ctx.stroke();
			}
		}

		// Grid lines x direction
		xIncrement = width/(xmax-xmin)*xres;

		var thick = 0;
		if(Math.round(xmin/2)==xmin/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(width/xIncrement); i++)
		{	
			ctx.beginPath();
	
			if(thick)
			{
				ctx.lineWidth = 1/4;
				thick = 0;		
			}
			else
			{
				ctx.lineWidth = 1/8;
				thick = 1;		
			}

			//ctx.lineWidth = 1/2;
			x = (xres * i)*width/(xmax-xmin);	
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height-20);	
			ctx.stroke();
		}


		// Find the origin
		var originY, originX;
		originY = height/(yMax-ymin)*yMax;
		originX = width/(xmax-xmin)*Math.abs(xmin);

		// Draw the y - axis
		ctx.beginPath();
		ctx.moveTo(originX,0);
		ctx.lineTo(originX,height-20);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Draw the x - axis
		ctx.beginPath();
		ctx.moveTo(0,originY);
		ctx.lineTo(width,originY);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Set the origin as the reference point
		ctx.translate(originX,originY);

		// Draw the curve
		var x, y, deltax, numberOfPoints, gridpointX;

		if(plotOptions.numberOfPoints==undefined)
		{
				numberOfPoints = 500;
		}
		else
		{
				numberOfPoints = plotOptions.numberOfPoints;
		}
		deltax = (b-a)/numberOfPoints;



		// animate the graph or not
		if(plotOptions.animate == 1)
		{
						
			animateGraph.counter = 0;
		
			canvasId = id;
			graphingFn = this.graphingFunction.name;
			cnVars = constructionVars;
			plotOptions = this.plotOptions;
		
			animateTimer = setInterval('animateGraph(canvasId, plotOptions, graphingFn, cnVars)', 1 );

		}
		else
		{
			// otherwise we just draw the picture so that it appears static (not animated)
			
			// loop over the number of lines
			for(j=0; j<this.plotOptions.numberOfLines; j++)
			{
				// set the line colour
				ctx.strokeStyle = this.plotOptions.lineColours[j];
		
				// parametric
				if(plotOptions.parametric==1)
				{
					tmin = plotOptions.tmin;
					tmax = plotOptions.tmax;
					tstep = plotOptions.tstep;
					numberOfPoints = Math.ceil((tmax-tmin)/tstep);		

					ctx.beginPath();
					for(i=0; i<=(numberOfPoints+1); i++)
					{
						t = tmin + i*tstep;
						[x,y] = this.graphingFunction("","",constructionVars, t); 

						// scale x and y
						y *= -height/(yMax-ymin);
				
						x *= width/(xmax-xmin);

						ctx.lineTo(x,y);
					}
					ctx.stroke();
				}
				else
				{
					// not parametric
					ctx.beginPath();
					for(i=0; i<numberOfPoints; i++)
					{

						x = a + deltax*i;	
						y = this.graphingFunction("","", constructionVars, x); 

						// discontinuities
						if(Math.abs(y)==Infinity || Math.abs(y)==NaN)
						{
							if(i>0)
							{

								// store the old value of y
								yOld = y;
		
								// we determine the behaviour of y surrounding
								// the vertical asymptote by examining yPrevious
								if(yPrevious<0)
								{
									y = ymin;
								}		
								else if(yPrevious>0)
								{
									y = yMax;
								}		
		

								// scale x and y
								y *= -height/(yMax-ymin);
								x *= width/(xmax-xmin);
						
								// end the current path before we cross the discontinuity
								ctx.lineTo(x,y);											
								ctx.stroke();

								// begin a new path
								ctx.beginPath();
								if(yOld<0)
								{
									y = ymin;
								}
								else if(yOld>0)
								{
									y = yMax;
								}
								y *= -height/(yMax-ymin);
								ctx.lineTo(x,y);						
								
							}
						}
						else
						{
				
							yPrevious = y;
		
							// scale x and y
							y *= -height/(yMax-ymin);
							x *= width/(xmax-xmin);
						
							ctx.lineTo(x,y);					
						}
		
					}
					ctx.stroke();
				}
				
				this.plotOptions.lineCount++;
			}
		}
		//return;

		// x and y tick marks
		ctx.translate(-originX-15,-originY);
		ctx.mozTextStyle = "9pt Arial";
	
		// keep track of the origin
		originalX = originX + 15;
		originalY = originY;
	
		// y ticks
		var axislabel = yMax;
		for(i=0; i<Math.ceil(height/yIncrement); i++)
		{
			ctx.fillStyle = "blue";
			ctx.mozDrawText(axislabel);	
			ctx.translate(0, (yres)*height/(yMax-ymin));
			axislabel -= yres;
			
			// keep track of the origin
			originalY += -(yres)*height/(yMax-ymin);
		}

		// x ticks
		axislabel = xmin;
		ctx.translate(10,0);
		
		// this makes sure that the x ticks are shown (and not cut off from the bottom of the graph)
		if(i*Math.abs((yres)*height/(yMax-ymin))>height)
		{
			//ctx.translate(0,-Math.abs(i*Math.abs((yres)*height/(yMax-ymin))-height));
			ctx.translate(0,-(i*Math.abs((yres)*height/(yMax-ymin))-height));
			
			// keep track of the origin
			//originalY += Math.abs(i*Math.abs((yres)*height/(yMax-ymin))-height);
			originalY += (i*Math.abs((yres)*height/(yMax-ymin))-height);
		}
		
		// keep track of the origin
		originalX -= 10;
	
		for(i=0; i<Math.ceil(width/xIncrement); i++)
		{
			ctx.fillStyle = "blue";
			ctx.mozDrawText(axislabel);	
			ctx.translate((xres)*width/(xmax-xmin),0);
			axislabel += xres;
			
			// keep track of the origin
			originalX -= (xres)*width/(xmax-xmin);
		}
		
		// put the 'cursor' back at the origin
		ctx.translate(originalX,originalY);

	}

}
