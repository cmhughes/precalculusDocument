function graphExponentials(myelementID, mybuttonID)
{
	//	Graph an exponential function
    //	    f(x) = ab^x
    //	where 
    //	    a goes between [-3,3]
    //	    b goes between [2,5]

	outnode = document.getElementById(myelementID);	
	mybutton = document.getElementById(mybuttonID);	

	if(mybutton.value=="New example")
	{
		clearElement(myelementID);
		mybutton.value = "Start example";
		graphExponentials.currentStep = 0;
		return;
						
	}
	
	if(mybutton.value=="Start example")
	{


	    graphExponentials.maxSteps = 2;

        // generate a and b
		a = randomInt(-3,3,[0,-1,1]);
		b = randomInt(2,5);

        // store the construction variables
		graphExponentials.constructionVars = a+","+b;

			
		if(document.getElementById('graphExponentialstable')==null)
		{
			// create a table
			mytable = document.createElement('table');
			mytable.setAttribute("id","graphExponentialstable");
				
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1graphExponentialstable");
		}
		else
		{
			// get the table
			mytable = document.getElementById("graphExponentialstable");	
			
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1graphExponentialstable");

		}

		// insert an element
		td = tr.insertCell(tr.cells.length);
	
		// put something in it	
		td.appendChild(document.createTextNode("A function `f` is shown in the following graph.")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("`f(x) = a*b^x`")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode('\\begin{graph}'));
		td.appendChild(document.createElement('br'));
 		td.appendChild(document.createTextNode('width=300; height=300; xmin=-10; xmax=10; ymin=-10; ymax=10; xscl=1; plot(e^x);'));
		td.appendChild(document.createElement('br'));
 		td.appendChild(document.createTextNode('\\end{graph}'));

		// append it to the outnode
		outnode.appendChild(mytable);

		// change the value of the button
		mybutton.value = "Show next step";

		graphExponentials.currentStep = 1;
							
		// process the table
		mytable = document.getElementById("graphExponentialstable");	

        // need to switch these flags
        LMtranslated = false;
        AMtranslated = false;
        // this bit specifies which node is to be processed
        AMdocumentId = "graphExponentialstable";
        // process it!
        LMtranslate();
        translate();
        drawPictures();
		//AMprocessNode(mytable);
		return;
	}


	constructionVars = graphExponentials.constructionVars.split(",");			
	a = Math.round(constructionVars[0]);
	b = Math.round(constructionVars[1]);
	
	// get the table
	mytable = document.getElementById("graphExponentialstable");	

	if(graphExponentials.currentStep==1)
	{
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createTextNode('DUMMY'));

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		graphExponentials.currentStep++;	
		//AMprocessNode(mytable);
		mybutton.value = "New example";
		

		return;
	}
    
}

function exponentialModelling(myelementID, mybuttonID)
{
	//	Find an exponential function
	//		
	//		f(x) = a * b^x
	//		
    //  that goes through the points
    //      (x1,y1), (x2,y2)

	outnode = document.getElementById(myelementID);	
	mybutton = document.getElementById(mybuttonID);	

	if(mybutton.value=="New example")
	{
		clearElement(myelementID);
		mybutton.value = "Start example";
		exponentialModelling.currentStep = 0;
		return;
						
	}
	
	if(mybutton.value=="Start example")
	{

		// generate the x-values that the function goes through
		x1 = randomInt(0,3);
		x2 = randomInt(4,8);		

        if(x1==0)
        {
	        exponentialModelling.maxSteps = 5;
        }
        else
        {
	        exponentialModelling.maxSteps = 6;
        }

        // generate a and b
		a = randomInt(-8,8,[0,-1,1]);
		b = randomInt(2,5);

        // calculate y1, y1
        y1 = a*Math.pow(b,x1);
        y2 = a*Math.pow(b,x2);

        // store the construction variables
		exponentialModelling.constructionVars = a+","+b+","+x1+","+x2+","+y1+","+y2;

			
		if(document.getElementById('exponentialModellingtable')==null)
		{
			// create a table
			mytable = document.createElement('table');
			mytable.setAttribute("id","exponentialModellingtable");
				
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1exponentialModellingtable");
		}
		else
		{
			// get the table
			mytable = document.getElementById("exponentialModellingtable");	
			
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1exponentialModellingtable");

		}

		// insert an element
		td = tr.insertCell(tr.cells.length);
	
		// put something in it	
		td.appendChild(document.createTextNode("amath Find an exponential function")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("f(x) = a*b^x")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("that goes through the points")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("("+x1+","+y1+"), ("+x2+","+y2+")."));

		// append it to the outnode
		outnode.appendChild(mytable);

		// change the value of the button
		mybutton.value = "Show next step";

		exponentialModelling.currentStep = 1;
							
		// process the table
		mytable = document.getElementById("exponentialModellingtable");	
		AMprocessNode(mytable);
		return;
	}


	constructionVars = exponentialModelling.constructionVars.split(",");			
	a = Math.round(constructionVars[0]);
	b = Math.round(constructionVars[1]);
	x1 = Math.round(constructionVars[2]);
	x2 = Math.round(constructionVars[3]);
	y1 = Math.round(constructionVars[4]);
	y2 = Math.round(constructionVars[5]);
	
	// get the table
	mytable = document.getElementById("exponentialModellingtable");	

	if(exponentialModelling.currentStep==1)
	{
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("We begin by using the given ordered pairs to set up "));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("the following system of equations:"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath {(a* "+prepExponents(x1,"b")+" = "+y1+", (1)),("
										               +"a* "+prepExponents(x2,"b")+" = "+y2 +", (2)) :}"));

        // if either of the exponents is 0
        if(x1==0||x2==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("Note that b^0=1"));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		exponentialModelling.currentStep++;	
		AMprocessNode(mytable);
		

		return;
	}
    
	if(exponentialModelling.currentStep==2)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// if x1 == 0 then we can solve for a very easily
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath Equation (1) gives a="+a));
		    td.appendChild(document.createElement('br'));
        }
        else
        {
            // otherwise divide the equations to solve for b
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath We will solve for b by dividing the two equations"));
		    td.appendChild(document.createElement('br'));
            
            // we have chosen x2>x1 everytime
		    td.appendChild(document.createTextNode(prepExponents(x2-x1,"b")+"="+prepFracs(y2,y1,"",1)));
        }


		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		exponentialModelling.currentStep++;	
		AMprocessNode(mytable);
		
		return;
	}
    
	if(exponentialModelling.currentStep==3)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// if x1 == 0 then we have solved for a easily
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath We substitute this value of a into (2), which gives"));
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode(prepExponents(x2,"b")+"="+prepFracs(y2,a,"",1)));
            
        }

		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath This clearly means that"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("b="+b));

        // if we are taking the square, 4th, 6th (or any other even) root
        // then say that we ignore the negative solution
        if(Math.round((x2-x1)/2)==(x2-x1)/2)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("Note that we ignore the negative root"));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		exponentialModelling.currentStep++;	
		AMprocessNode(mytable);
		

		return;
	}
    
	if(exponentialModelling.currentStep==4)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath This therefore means that "));
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("f(x)="+a+"*"+b+"^x"));
        }
        else
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath Substituting b into either equation (1) or (2) gives"));
		    td.appendChild(document.createElement('br'));

		    td.appendChild(document.createTextNode("a="+a));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		exponentialModelling.currentStep++;	
		AMprocessNode(mytable);

        // if x1==0, this is the last step
        if(x1==0)
        {
		    mybutton.value = "New example";
        }
		
		return;
	}
    
	if(exponentialModelling.currentStep==5)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath This therefore means that "));
		td.appendChild(document.createElement('br'));

		td.appendChild(document.createTextNode("f(x)="+a+"*"+b+"^x"));

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		exponentialModelling.currentStep++;	
		AMprocessNode(mytable);
		
		mybutton.value = "New example";
		return;
	}

}

function expvslinModelling(myelementID, mybuttonID)
{
	//	Find an exponential function
	//		
	//		f(x) = a * b^x
	//		
    //  that goes through the points
    //      (x1,y1), (x2,y2)
    //
	//	Find a linear function
	//		
	//		f(x) = mx + b
	//		
    //  that goes through the points
    //      (x1,y1), (x2,y2)

	outnode = document.getElementById(myelementID);	
	mybutton = document.getElementById(mybuttonID);	

	if(mybutton.value=="New example")
	{
		clearElement(myelementID);
		mybutton.value = "Start example";
		expvslinModelling.currentStep = 0;
		return;
						
	}
	
	if(mybutton.value=="Start example")
	{

		// generate the x-values that the function goes through
		x1 = randomInt(0,3);
		x2 = randomInt(4,8);		

        if(x1==0)
        {
	        expvslinModelling.maxSteps = 5;
        }
        else
        {
	        expvslinModelling.maxSteps = 6;
        }

        // generate a and b
		a = randomInt(-8,8,[0,-1,1]);
		b = randomInt(2,5);

        // calculate y1, y1
        y1 = a*Math.pow(b,x1);
        y2 = a*Math.pow(b,x2);

        // calculate m and c in 
        //   y = mx + c
        m = prepFracs(Math.round(y2-y1),Math.round(x2-x1),"",1);
        c = prepFracs((y2*Math.round(x2-x1)-Math.round(y2-y1)*x2),Math.round(x2-x1),"",0);

        // store the construction variables
		expvslinModelling.constructionVars = a+","+b+","+x1+","+x2+","+y1+","+y2;

			
		if(document.getElementById('expvslinModellingtable')==null)
		{
			// create a table
			mytable = document.createElement('table');
			mytable.setAttribute("id","expvslinModellingtable");
				
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1expvslinModellingtable");
		}
		else
		{
			// get the table
			mytable = document.getElementById("expvslinModellingtable");	
			
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1expvslinModellingtable");

		}

		// insert an element
		td = tr.insertCell(tr.cells.length);
	
		// put something in it	
		td.appendChild(document.createTextNode("amath Find an exponential function")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("f(x) = a*b^x")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("that goes through the points")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("("+x1+","+y1+"), ("+x2+","+y2+")."));

		// append it to the outnode
		outnode.appendChild(mytable);

		// insert an element
		td = tr.insertCell(tr.cells.length);
		td.appendChild(document.createTextNode("amath Find a linear function ")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("f(x) = m x+b")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("that goes through the points")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("("+x1+","+y1+"), ("+x2+","+y2+")."));

		// append it to the outnode
		outnode.appendChild(mytable);

		// change the value of the button
		mybutton.value = "Show next step";

		expvslinModelling.currentStep = 1;
							
		// process the table
		mytable = document.getElementById("expvslinModellingtable");	
		AMprocessNode(mytable);
		return;
	}


	constructionVars = expvslinModelling.constructionVars.split(",");			
	a = Math.round(constructionVars[0]);
	b = Math.round(constructionVars[1]);
	x1 = Math.round(constructionVars[2]);
	x2 = Math.round(constructionVars[3]);
	y1 = Math.round(constructionVars[4]);
	y2 = Math.round(constructionVars[5]);
    
    // calculate m and c in 
    //   y = mx + c
    m = prepFracs(Math.round(y2-y1),Math.round(x2-x1),"",1);
    c = prepFracs((y2*Math.round(x2-x1)-Math.round(y2-y1)*x2),Math.round(x2-x1),"",0);
	
	// get the table
	mytable = document.getElementById("expvslinModellingtable");	

	if(expvslinModelling.currentStep==1)
	{
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("We begin by using the given ordered pairs to set up "));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("the following system of equations:"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath {(a* "+prepExponents(x1,"b")+" = "+y1+", (1)),("
										               +"a* "+prepExponents(x2,"b")+" = "+y2 +", (2)) :}"));

        // if either of the exponents is 0
        if(x1==0||x2==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("Note that b^0=1"));
        }

		// append it to the row
		tr.appendChild(td);

		// insert an element
		td = tr.insertCell(tr.cells.length);
		td.setAttribute('class','top');				
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("We begin by finding m"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath m = "+m));
            
		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		expvslinModelling.currentStep++;	
		AMprocessNode(mytable);
		

		return;
	}
    
	if(expvslinModelling.currentStep==2)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		td.setAttribute('class','top');				
		
		// if x1 == 0 then we can solve for a very easily
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath Equation (1) gives a="+a));
		    td.appendChild(document.createElement('br'));
        }
        else
        {
            // otherwise divide the equations to solve for b
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath We will solve for b by dividing the two equations"));
		    td.appendChild(document.createElement('br'));
            
            // we have chosen x2>x1 everytime
		    td.appendChild(document.createTextNode(prepExponents(x2-x1,"b")+"="+prepFracs(y2,y1,"",1)));
        }


		// append it to the row
		tr.appendChild(td);

		// insert an element
		td = tr.insertCell(tr.cells.length);
		td.setAttribute('class','top');				
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("We now find b"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath b = "+prepFracs((y2*Math.round(x2-x1)-Math.round(y2-y1)*x2),Math.round(x2-x1),"",1)));
            
		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		expvslinModelling.currentStep++;	
		AMprocessNode(mytable);
		
		return;
	}
    
	if(expvslinModelling.currentStep==3)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// if x1 == 0 then we have solved for a easily
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath We substitute this value of a into (2), which gives"));
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode(prepExponents(x2,"b")+"="+prepFracs(y2,a,"",1)));
            
        }

		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath This clearly means that"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("b="+b));

        // if we are taking the square, 4th, 6th (or any other even) root
        // then say that we ignore the negative solution
        if(Math.round((x2-x1)/2)==(x2-x1)/2)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("Note that we ignore the negative root"));
        }

		// append it to the row
		tr.appendChild(td);

		// insert an element
		td = tr.insertCell(tr.cells.length);
		td.setAttribute('class','top');				
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("This therefore means that "));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath f(x) = "+m+"x"+c));
            
		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		expvslinModelling.currentStep++;	
		AMprocessNode(mytable);
		

		return;
	}
    
	if(expvslinModelling.currentStep==4)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
        if(x1==0)
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath This therefore means that "));
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("f(x)="+a+"*"+b+"^x"));
        }
        else
        {
		    td.appendChild(document.createElement('br'));
		    td.appendChild(document.createTextNode("amath Substituting b into either equation (1) or (2) gives"));
		    td.appendChild(document.createElement('br'));

		    td.appendChild(document.createTextNode("a="+a));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		expvslinModelling.currentStep++;	
		AMprocessNode(mytable);

        // if x1==0, this is the last step
        if(x1==0)
        {
		    mybutton.value = "New example";
        }
		
		return;
	}
    
	if(expvslinModelling.currentStep==5)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("amath This therefore means that "));
		td.appendChild(document.createElement('br'));

		td.appendChild(document.createTextNode("f(x)="+a+"*"+b+"^x"));

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		expvslinModelling.currentStep++;	
		AMprocessNode(mytable);
		
		mybutton.value = "New example";
		return;
	}

}


function solveExpEqnFactor(myelementID, mybuttonID)
{
	//	Find an exponential function
	//		
	//		(b^x+Ab^c)(b^x-b^d)=0
	//		
    //		b, c, d are all integers
    //		A = 1 or -1

	outnode = document.getElementById(myelementID);	
	mybutton = document.getElementById(mybuttonID);	

	if(mybutton.value=="New example")
	{
		clearElement(myelementID);
		mybutton.value = "Start example";
		solveExpEqnFactor.currentStep = 0;
		return;
						
	}
	
	if(mybutton.value=="Start example")
	{

		// generate the solutions
		x1 = randomInt(0,3);
		x2 = randomInt(0,3);		

	    solveExpEqnFactor.maxSteps = 4;

        // generate a and b
		b = randomInt(2,5);

        // calculate y1, y1
        plusMinus = randomInt(-1,1,[0]);
        y1 = plusMinus*Math.pow(b,x1);
        plusMinus = randomInt(-1,1,[0]);
        y2 = plusMinus*Math.pow(b,x2);

        // store the construction variables
		solveExpEqnFactor.constructionVars = b+","+x1+","+x2+","+y1+","+y2;

			
		if(document.getElementById('solveExpEqnFactortable')==null)
		{
			// create a table
			mytable = document.createElement('table');
			mytable.setAttribute("id","solveExpEqnFactortable");
				
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1solveExpEqnFactortable");
		}
		else
		{
			// get the table
			mytable = document.getElementById("solveExpEqnFactortable");	
			
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1solveExpEqnFactortable");

		}

		// insert an element
		td = tr.insertCell(tr.cells.length);
	
		// put something in it	
		td.appendChild(document.createTextNode("Solve the following exponential equation")); 
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("`"+b+"^(2x)"+prepCoeffs(y1+y2,"*"+b+"^x",0)+prepCoeffs(y1*y2,"",0)+"=0`")); 
		td.appendChild(document.createElement('br'));

		// append it to the outnode
		outnode.appendChild(mytable);

		// change the value of the button
		mybutton.value = "Show next step";

		solveExpEqnFactor.currentStep = 1;
							
		// process the table
		mytable = document.getElementById("solveExpEqnFactortable");	
		AMprocessNode(mytable);
		return;
	}


	constructionVars = solveExpEqnFactor.constructionVars.split(",");			
	b = Math.round(constructionVars[0]);
	x1 = Math.round(constructionVars[1]);
	x2 = Math.round(constructionVars[2]);
	y1 = Math.round(constructionVars[3]);
	y2 = Math.round(constructionVars[4]);
	
	// get the table
	mytable = document.getElementById("solveExpEqnFactortable");	

	if(solveExpEqnFactor.currentStep==1)
	{
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		// put something in it
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("We begin by factoring the left hand side"));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode("`("+b+"^x"+prepCoeffs(y1,"",0)+")("+b+"^x"+prepCoeffs(y2,"",0)+")=0`"));
		td.appendChild(document.createElement('br'));

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		solveExpEqnFactor.currentStep++;	
		AMprocessNode(mytable);

		return;
	}
    
	if(solveExpEqnFactor.currentStep==2)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
		td.appendChild(document.createElement('br'));
	    td.appendChild(document.createTextNode("This therefore means that"));
	    td.appendChild(document.createElement('br'));
	    td.appendChild(document.createElement('br'));

        // there may be 1 or 2 solutions
        if(y1==y2)
        {
	        td.appendChild(document.createTextNode("`"+b+"^x="+(-1)*y1+"`"));
        }
        else
        {
	        td.appendChild(document.createTextNode("`"+b+"^x="+(-1)*y1+"` or `"+b+"^x="+(-1)*y2+"`"));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		solveExpEqnFactor.currentStep++;	
		AMprocessNode(mytable);
		
		return;
	}
    
	if(solveExpEqnFactor.currentStep==3)
    {
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
		
        // put something in it
		td.appendChild(document.createElement('br'));
	    td.appendChild(document.createTextNode("and so "));
	    //td.appendChild(document.createElement('br'));
	    //td.appendChild(document.createElement('br'));

        // there may be 0, 1, or 2 solutions
        if(y1==y2)
        {
            if(y1>0)
            {
	            td.appendChild(document.createTextNode(" there are no solutions to this equation."));
            }
            else
            {
	            td.appendChild(document.createTextNode("`x="+x1+"`"));
            }
        }
        else
        {
            solutiontext="";
            if(y1<0)
            {
                solutiontext+="`x="+x1+"`";
            }
            if(y2<0)
            {
                if(solutiontext!=""){solutiontext+=" or ";}
                solutiontext+="`x="+x2+"`";
            }
            if(y1*y2<0)
            {
                solutiontext+=" is the only solution.";
            }
            if(y1>0 && y2>0)
            {
                solutiontext = "there are no real solutions.";
            }
	        td.appendChild(document.createTextNode(solutiontext));
        }

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
		
		solveExpEqnFactor.currentStep++;	
		AMprocessNode(mytable);
		
		mybutton.value = "New example";
		return;
	}

}

function randomfunction(myelementID, mybuttonID, constructionVars, x)
{
	//	Consider the following system of equations
	//		
	//	GRAPH
	//
	//	Where is the solution to the system?
	//		a x + b y = e
	//		c x + d y = f

	
	outnode = document.getElementById(myelementID);	
	mybutton = document.getElementById(mybuttonID);	
	randomfunction.maxSteps = 2;

	// this bit is for returning the y value
	// Note: it needs to be done at this stage as the graphing
	// function does not pass in myelementID, mybuttonID
	if(x!=undefined)
	{
		constructionVars = constructionVars.split(",");			
		functionChoice = Math.round(constructionVars[0]);

		if(functionChoice==1)
		{
			// linear function
			m = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			return m*x+b;
		}
        else if(functionChoice==2)
		{
			// exponential function (b>1)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
			return a*Math.pow(b,x)+c;
		}
        else if(functionChoice==3)
        {
			// exponential function (0<b<1)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
			return a*Math.pow(1/b,x)+c;
        }
        else if(functionChoice==4)
        {
            // quadratic function
            // y = (x-a)^2+b
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
            return a*Math.pow(x-b,2)+c;
        }
        else if(functionChoice==5)
        {
            // polynomial function (degree 3)
            // y = d*(x-a)*(x-b)*(x-c)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
			d = Math.round(constructionVars[4]);
            return d*(x-a)*(x-b)*(x-c);
        }
        else if(functionChoice==6)
        {
            // rational function
            // y = (x-a)/(x-b)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
            return (x-a)/(x-b);
        }
        else if(functionChoice==7)
        {
            // rational function
            // y = (x-a)/(x-b)*(x-c)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
            return (x-a)/((x-b)*(x-c));
        }
        else if(functionChoice==8)
        {
            // rational function
            // y = d*(x-a)^2/(x-b)*(x-c)
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
			d = Math.round(constructionVars[4]);
            return d*Math.pow((x-a),2)/((x-b)*(x-c));
        }
        else if(functionChoice==9)
        {
            // rational function
            // y = (x-a)/(x-b)*(x-c)^2
			a = Math.round(constructionVars[1]);
			b = Math.round(constructionVars[2]);
			c = Math.round(constructionVars[3]);
			d = Math.round(constructionVars[4]);
            return d*(x-a)/((x-b)*Math.pow((x-c),2));
        }
        else if(functionChoice==109)
        {
            // piecewise function
	        //			    a	x <= b
	        //		f(x) = 	c	b < x < d	
	        //			    e	d < x < f
	        //			    g	x >= f	
            // DOESN't WORK YET!
	    	a = Math.round(constructionVars[1]);
	    	b = Math.round(constructionVars[2]);
	    	c = Math.round(constructionVars[3]);
	    	d = Math.round(constructionVars[4]);
	    	e = Math.round(constructionVars[5]);
	    	f = Math.round(constructionVars[6]);
	    	g = Math.round(constructionVars[7]);
		    if(x<b && this.plotOptions.lineCount==1)
		    {
		    	return a;
		    }
		    else if(x>b && x<d && this.plotOptions.lineCount==2)
		    {
		    	return c;
		    }
		    else if(x>d && x<f && this.plotOptions.lineCount==3)
		    {
                return e;
		    }
		    else if(x>f && this.plotOptions.lineCount==4)
		    {
                return g;
		    }
            else
            {
                return x;
            }
        }
        else
        {
            return 1;
        }
		
	}
	
	if(mybutton.value=="New example")
	{
		clearElement(myelementID);
		mybutton.value = "Start example";
		randomfunction.currentStep = 0;
		return;
						
	}
	
	
	if(mybutton.value=="Start example")
	{

        // GRAPH info
		this.graphingFunction = string2Object("randomfunction");
		this.plotOptions = {xmin:-10, xmax:10, xres:1, ymin:-10, ymax : 10, yres:1, a:-10, b:10};
		this.plotOptions.numberOfLines = 1;
		this.plotOptions.lineCount = 1;
		this.plotOptions.lineColours = ["rgb(200,0,0)"];

		functionChoice = randomInt(2,3);
		if(functionChoice==1)
		{
			// linear function
            // y = mx+b
			m = randomInt(-10,10,[0]);
			b = randomInt(-10,10,[0]);
			randomfunction.constructionVars = functionChoice+","+m+","+b;
            randomfunction.solnstr=""+prepCoeffs(m,"x",1)+prepCoeffs(b,"",0);
		}
		else if(functionChoice==2)
		{
			// exponential function
            // y = a*b^x + c    (b>1)
			a = randomInt(-3,3,[0]);
			b = randomInt(2,5);
			c = randomInt(-5,5);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c;
            randomfunction.solnstr=""+prepCoeffs(a,b+"^x",1,1)+prepCoeffs(c,"",0);
		}
		else if(functionChoice==3)
		{
			// exponential function
            // y = a*b^x + c    (0<b<1)
			a = randomInt(-3,3,[0]);
			b = randomInt(2,5);
			c = randomInt(-5,5);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c;
            randomfunction.solnstr=""+prepCoeffs(a,"(1/"+b+")^x",1,1)+prepCoeffs(c,"",0);
		}
        else if(functionChoice==4)
        {
            // quadratic function
            // y = (x-a)^2+b
			a = randomInt(-1,1,[0]);
			b = randomInt(-8,8);
			c = randomInt(-8,8);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c;
            randomfunction.solnstr=prepCoeffs(a,"(x"+prepCoeffs(-1*b,"",0)+")^2",1)+prepCoeffs(c,"",0);
        }
        else if(functionChoice==5)
        {
            // polynomial function (degree 3)
            // y = d*(x-a)*(x-b)*(x-c)

	    	ymin = 1;
            ymax = 0;

	    	// the graph looks best when ymin is below the x axis
            // and ymax is above the x axis
	    	while(ymin>0 && ymax<=0)
	    	{
	    		a = randomInt(-8,8);
	    		b = randomInt(-8,8);
	    		c = randomInt(-8,8);
	    		d = randomInt(-3,3);

	    		/* find the critical points of the function
	    			NOTE: f(x) 	= d*(x-a)*(x-b)*(x-c)
	    						= d*(x^3 - (a+b+c)*x^2 + (b*c+a(b+c))x - abc)
	    				
	    				which clearly means that the CPs are at
	    				
	    						0 = 3 x^2 - 2(a+b+c)x + (bc +a(b+c))
	    		*/
	    		
	    		[x1,x2] = quadFormula(3,parseInt(-2*(a+b+c)), (b*c+a*(b+c)));
	    		
	    		y1 = cubicForDrawing(a,b,c,d,x1);
	    		y2 = cubicForDrawing(a,b,c,d,x2);
	    		
	    		ymin = Math.floor(Math.min(y1,y2));
	    		ymax = Math.ceil(Math.max(y1,y2));
	    		
	    	}
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c+","+d;
            randomfunction.solnstr=prepCoeffs(d,"(x"+prepCoeffs(-1*a,"",0)+")",1)+"(x"+prepCoeffs(-1*b,"",0)+")(x"+prepCoeffs(-1*c,"",0)+")";
		    this.plotOptions.ymin = ymin;
		    this.plotOptions.ymax = ymax;
            this.plotOptions.yres = Math.abs(Math.round((ymax-ymin)/10));
        }
        else if(functionChoice==6)
        {
            // rational function
            // y = (x-a)/(x-b)
			a = randomInt(-5,5,[0]);
			b = randomInt(-5,5,[0,a]);
			randomfunction.constructionVars = functionChoice+","+a+","+b;
            randomfunction.solnstr="(x"+prepCoeffs(-1*a,"",0)+")/(x"+prepCoeffs(-1*b,"",0)+")";
        }
        else if(functionChoice==7)
        {
            // rational function
            // y = (x-a)/(x-b)*(x-c)
			b = randomInt(-5,-1);
			c = randomInt(1,5);
			a = randomInt(b,c,[b,c]);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c;
            randomfunction.solnstr="(x"+prepCoeffs(-1*a,"",0)+")/((x"+prepCoeffs(-1*b,"",0)+")(x"+prepCoeffs(-1*c,"",0)+"))";
        }
        else if(functionChoice==8)
        {
            // rational function
            // y = d*(x-a)^2/(x-b)*(x-c)
			b = randomInt(-5,-1);
			c = randomInt(1,5);
			a = randomInt(b,c,[b,c]);
            d = randomInt(-3,3,[0]);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c+","+d;
            randomfunction.solnstr="("+prepCoeffs(d,"(x"+prepCoeffs(-1*a,"",0)+")^2",1)+")/((x"+prepCoeffs(-1*b,"",0)+")(x"+prepCoeffs(-1*c,"",0)+"))";
        }
        else if(functionChoice==9)
        {
            // rational function
            // y = d*(x-a)/(x-b)*(x-c)^2
			b = randomInt(-5,-1);
			c = randomInt(1,5);
			a = randomInt(b,c,[b,c]);
            d = randomInt(-3,3,[0]);
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c+","+d;
            randomfunction.solnstr="("+prepCoeffs(d,"(x"+prepCoeffs(-1*a,"",0)+")",1)+")/((x"+prepCoeffs(-1*b,"",0)+")(x"+prepCoeffs(-1*c,"",0)+")^2)";
        }
        else if(functionChoice==109)
        {
	        //			    a	x <= b
	        //		f(x) = 	c	b < x < d	
	        //			    e	d < x < f
	        //			    g	x >= f	
			a = randomInt(-8,8,[0]);		
			b = randomInt(-8,-3);		
			c = randomInt(-8,8,[a]);		
			d = randomInt((b+1),0);		
			e = randomInt(-8,8,[a,c]);		
			f = randomInt((d+1),10);		
			g = randomInt(-8,8,[a,c,e]);		
			randomfunction.constructionVars = functionChoice+","+a+","+b+","+c+","+d+","+e+","+f;
		    randomfunction.solnstr= "{("+a+",\x5c"+"if x<="+b+")";
		    randomfunction.solnstr+= ",("+c+",\x5c"+"if "+b+"<x<"+d+")";
		    randomfunction.solnstr+= ",("+e+",\x5c"+"if"+d+"<x<"+f+")";
		    randomfunction.solnstr+= ",("+g+",\x5c"+"ifx>="+f+") :}";
		    this.plotOptions.numberOfLines = 4;
		    this.plotOptions.lineColours = ["rgb(200,0,0)","rgb(0,200,0)","rgb(0,0,200)","rgb(200,200,200)"];
        }

			
		if(document.getElementById('randomfunctiontable')==null)
		{
			// create a table
			mytable = document.createElement('table');
			mytable.setAttribute("id","randomfunctiontable");
				
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1randomfunctiontable");
		}
		else
		{
			// get the table
			mytable = document.getElementById("randomfunctiontable");	
			
			// insert a row
			tr = mytable.insertRow(mytable.rows.length);	
			tr.setAttribute("id","row1randomfunctiontable");

		}

		// insert an element
		td = tr.insertCell(tr.cells.length);

		// put something in it
		td.appendChild(document.createTextNode("A function `f` is shown in the following graph.")); 
        
        // put a hint in for the quadratic
        if(functionChoice==4)
        {
		    td.appendChild(document.createTextNode("Hint: use vertex form"));
        }
        // detail a point on the graph if it's a polynomial
        // y = d*(x-a)*(x-b)*(x-c)
        if(functionChoice==5)
        {
            xvalue = randomInt(-3,3,[a,b,c]);
            yvalue = cubicForDrawing(a,b,c,d,xvalue);
		    td.appendChild(document.createTextNode("amath f(x) goes through the point ("+xvalue+","+yvalue+")."));
        }
        // detail a point on the graph if it's a rational
        // y = (x-a)/(x-b)
        if(functionChoice==6)
        {
            xvalue = 0;
			yvalue = prepFracs(-1*a, -1*b,"",1);
		    td.appendChild(document.createTextNode("amath f(x) goes through the point ("+xvalue+","+yvalue+")."));
        }
        // detail a point on the graph if it's a rational
        // y = (x-a)/(x-b)*(x-c)
        if(functionChoice==7)
        {
			xvalue = randomInt(-5,5,[a,b,c]);
			yvalue = prepFracs(xvalue-a, (xvalue-b)*(xvalue-c),"",1);
		    td.appendChild(document.createTextNode("amath f(x) goes through the point ("+xvalue+","+yvalue+")."));
        }
        // detail a point on the graph if it's a rational
        // y = d*(x-a)^2/(x-b)*(x-c)
        if(functionChoice==8)
        {
			xvalue = randomInt(-5,5,[a,b,c]);
			yvalue = prepFracs(d*Math.pow(xvalue-a,2), (xvalue-b)*(xvalue-c),"",1);
		    td.appendChild(document.createTextNode("amath f(x) goes through the point ("+xvalue+","+yvalue+")."));
        }
        // detail a point on the graph if it's a rational
        // y = d*(x-a)/(x-b)*(x-c)^2
        if(functionChoice==9)
        {
			xvalue = randomInt(-5,5,[a,b,c]);
			yvalue = prepFracs(d*(xvalue-a), (xvalue-b)*Math.pow(xvalue-c,2),"",1);
		    td.appendChild(document.createTextNode("amath f(x) goes through the point ("+xvalue+","+yvalue+")."));
        }

		// append it to the outnode
		outnode.appendChild(mytable);

		// change the value of the button
		mybutton.value = "Show next step";

		randomfunction.currentStep = 1;
							
		// process the table
		mytable = document.getElementById("randomfunctiontable");	
		AMprocessNode(mytable);
		
		// set up the canvas as part of the question node
		cnv = document.createElement("canvas");
		cnv.setAttribute("id", "randFunc");
		cnv.setAttribute("height", "400");
		cnv.setAttribute("width", "420");

		// append it to the output node
		outnode.appendChild(cnv);
	
		this.graphfn = drawStuff;
		this.graphfn(randomfunction.constructionVars, "randFunc");
		
		return;
	}

	
	
	constructionVars = randomfunction.constructionVars.split(",");			
	
	
	// get the table
	mytable = document.getElementById("randomfunctiontable");	
	if(randomfunction.currentStep==1)
	{
		// insert a row
		tr = mytable.insertRow(mytable.rows.length);						
			
		// insert an element
		td = tr.insertCell(tr.cells.length);
	
		// put something in it
		td.appendChild(document.createTextNode("amath f(x)="+randomfunction.solnstr));

		// append it to the row
		tr.appendChild(td);
						
		// append it to the outnode
		mytable.appendChild(tr);
			
		AMprocessNode(mytable);
		
		randomfunction.currentStep++;
		
		mybutton.value = "New example";

		
		return;
	}					

	function cubicForDrawing(a,b,c,d,x)
	{
		// (x-a)*(x-b)*(x-c)
		return d*(x-a)*(x-b)*(x-c);
	}
}
