/*

GENERAL.js
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
	
	This file contains functions used by all questions

*/

function prepBrackets(a)
{
	if(a>=0)
	{
		return a;
	}
	else if(a<0)
	{
		return "("+a+")";
	}
}

function prepFracs(numerator, denominator, variable, atBeginningofLine, need0)
{
	/* Function to prepare fraction, numerator/denominator
		
		example
		
			prepFracs(4, 8) =  "1/2";
			prepFracs(-4, 8) = "-1/2"
			prepFracs(-8, -8) = "-1"
			prepFracs(-8, -4) = "1"
	
	*/
	
	if(numerator==0)
	{
		if(need0==1)
		{
			return "0";
		}
		else
		{
				return "";
		}
	}
	
	reduced = reduceFraction(numerator, denominator);
	
	// in the case that the variable is empty (=="")
	if(variable==undefined||variable=="")
	{
		if(reduced.length==1)		
		{
			return ""+prepCoeffs(reduced[0],"",atBeginningofLine);
		}
		else if(reduced.length==2)
		{
			if(atBeginningofLine==undefined)
			{
				return reduced[0]+"/"+reduced[1];
			}
			else
			{
				return prepCoeffs(reduced[0],"",atBeginningofLine)+"/"+reduced[1];
			}
		}
	}
	else if(variable==" ")
	{
		if(reduced.length==1)		
		{
			return ""+prepCoeffs(reduced[0]," ",atBeginningofLine);
		}
		else if(reduced.length==2)
		{
			return reduced[0]+"/"+reduced[1];
		}
	}
	else
	{
		if(reduced.length==1)		
		{
			return ""+prepCoeffs(reduced[0],variable,atBeginningofLine);
		}
		else if(reduced.length==2)
		{
			/* if the numerator < 0, then this is the appropriate thing to send back,
				whether we are at the beginning of the line or not
			*/
			if(reduced[0]<0)
			{
				return "-("+prepCoeffs(parseInt(Math.abs(reduced[0])),variable,1)+")/"+reduced[1];
			}
				
			if(atBeginningofLine==0)
			{
				return "+("+prepCoeffs(parseInt(Math.abs(reduced[0])),variable,1)+")/"+reduced[1];
			}
			else
			{
				return "("+prepCoeffs(parseInt(Math.abs(reduced[0])),variable,1,"",1)+")/"+reduced[1];	
			}
		}
	}
}


function prepExponents(exponent, variable)
{
	// This function prepares exponents for writing to the
	// questionStr
	//
	// example
	// 	Say you wanted to write a question that had
	//			f(x) = x^m
	//	Then if m=1, you do not want to write
	//			f(x) = x^1
	//	instead you would just want to write
	//			f(x) = x
	//
	var processedString;


	switch(exponent)
	{
		case 0:
			processedString = 1;
			break;
		case 1:
			processedString = variable;
			break;
		default:
			processedString = variable+"^"+exponent;
			break
	}
	
	return processedString;

}


function prepCoeffs(coefficient, variable, beginning, multSymbol, forUseInInterval)
{
	// This function prepares coefficients for writing to the
	// questionStr
	//
	// INPUT
	//	COEFFICIENT 	- the coefficient of the variable, e.g 2
	//	VARIABLE	- variable, e.g x
	//	BEGINNING	- specifies whether the expression is at the beginning
	//				or not (1 or 0 respectively)
	//	MULTSYMBOL	- specifies whether or not we want a '*' symbol, note that
	//				this can be left undefined
	//	FORUSEININTERVAL- specifies if we want to use the resulting expression
	//			  	in an interval, e.g (0, pi/2)
	//
	//
	// example
	// 	Say you wanted to write a question that had
	//			f(x) = mx + b
	//	Then if m=0, you do not want to write
	//			f(x) = 0x+b
	//	instead you would just want to write
	//			f(x) = b
	//
	//	By feeding your variables to this function as
	//		prepCoeffs(m, "x", 1)
	//	if m=0, then the returned string will be ""
	//
	//	The the last argument, BEGINNING, specifies 
	//	whether the current part of the question is at the beginning or not.
	//	For example, if we were processing 
	//			a x + b y = d
	//	then if a=0, this would put b at the beginning of the string, so we could
	//	call the function with
	//			prepCoeffs(b, "y", a==0)
	//
	// examples
	//
	//	prepCoeffs(-1,"x",1)			"-x"
	//	prepCoeffs(1,"x^2",1)			"x^2"
	//	prepCoeffs(0,"x^2",1)			""
	//	prepCoeffs(3,"x^5",1)			"3x^5"
	//	prepCoeffs(3,"x^5",1,1)			"3*x^5"
	//	prepCoeffs(1,"x^5",1,1)			"x^5"
	//	prepCoeffs(-1,"x^5",1,1)		"-x^5"
	//	prepCoeffs(0,"x^5",1,1)			""
	//	prepCoeffs(0," pi",1,undefined,1)	"0"	(this was useful when I was designing the multiple choice question for 112)

	var processedString;


	if(typeof multSymbol=="undefined")
	{
		// if we don't want a multiplication symbol
		multSymbol = "";
	}
	else
	{
		// or if we do want one...
		multSymbol = "*";
	}

	switch(coefficient)
	{
		case 0:
			processedString = "";
			if(forUseInInterval==1)
			{
				processedString = "0";	
			}
			break;
		case 1:
			if(variable=="")
			{
				variable = Math.abs(coefficient);
			}

			if(beginning !=1 )
			{
				processedString = "+"+variable;
				break;
			}
			processedString = variable;
			break;
		case -1:
			if(variable=="")
			{
				variable = Math.abs(coefficient);
			}

			processedString = "-"+variable;
			break;
		default:
			if(beginning !=1 && parseFloat(coefficient)>0 )
			{
				processedString = "+"+coefficient+variable;
				break;
			}
			processedString = coefficient+multSymbol+variable;
			break
	}
	
	return processedString;

}


	function reduceFraction(numerator,denominator)
	{
		// This function reduces a fraction to its simplest forms
		//
		// INPUT: 	numerator- an integer number
		// 		denominator- an integer number
		//
		// OUTPUT: 	array which has either size 1 or 2, depending
		//		on if the reduced answer is an integer (e.g 16/2 = 8)
		//		or a fraction (e.g 10/15 = 2/3)
		//		
		//		The array has elements [reduced_numerator, reduced_denominator],
		//		or when the answer is just a number, simply [result_Of_division]
		//
		// EXAMPLES:	reduceFraction(5,40);		returns [1,8]
		//		reduceFraction(36,6);		returns [6]
		//		reduceFraction(3,0);		returns ["undefined"]
		//		reduceFraction(-12,16)		returns [-3,4]
		//		reduceFraction(12,-16)		also returns [-3,4]

		var numDenom = new Array();
		var origNum = numerator, origDenom = denominator;
		var index;
	
		if(numerator==0)
		{
			// If the numerator is 0, then there is no need to write the 
			// number as a fraction
			numDenom = [0];			
			return numDenom;
		}

		
		if(denominator==0)
		{
			// If the denominator is 0, then the result is undefined
			numDenom = ["undefined"];			
			return numDenom;
		}

		numerator = Math.abs(numerator);
		denominator = Math.abs(denominator);

		for(index=Math.min(numerator,denominator); index>1; index--)
		{
			// Work through the loop backwards, starting with the 
			// minimum of the numerator and denominator
			if(numerator%index==0 && denominator%index==0)
			{
				numerator /= index;
				denominator /= index;	
			}
		}	
		

		if(origNum*origDenom<0)
		{
			// If we need a '-' sign, put it on the numerator
			numerator *= -1;
		}

		
		if(denominator==1)
		{
			// If the denominator is 1, then there is no need to write the 
			// number as a fraction
			numDenom = [numerator];			
			return numDenom;
		}
		else
		{
			numDenom = [numerator, denominator];
			return numDenom;
		}
	}

	function isPrime(number)
	{
	   // Is the number prime?
	   // Note: we check the absolute value of the number

	   number = Math.abs(number);
	   var isPrimeTF = true;

	   if(Math.round(number)!=number)
	   {
		return !isPrimeTF;
	   }
   
	   if(Math.round(number/2)==number/2)
	   {
		// This corresponds to an even number
		return !isPrimeTF;	    	
	   }

	   for(var i = 2; i <= Math.sqrt(number) && isPrimeTF; i++)
	      isPrimeTF = number % i != 0;

	   return isPrimeTF;
	}	


	function randomInt(a,b,Optional)
	{
		// randomInt
		//
		// Find a random integer between a and b
		// Note: the random integer can include a and b
		//
		// INPUT
		//	a		lower bound 
		//	b		upper bound
		//	Optional 	contains an array of numbers
		//			that a, b can not equal
		// OUTPUT
		//	a random integer between and b
		//
		// 
		// examples
		//	randomInt(1,5)	can return either 1, 2, 3, 4, 5
		//	
		
		var randomInteger;

		if(randomInt.arguments.length>2)
		{
		// If we have passed 3 arguments to this function, it means
		// that we want to put a restriction on the randomly generated 
		// number
		//
		// The restriction is that we don't want the number to be in the
		// array that we are passing. 
		//	
		// We search the array using the 'indexOf' property, which returns -1
		// if the integer is not in the array, and an integer >=0 representing the
		// position of the element in the array otherwise.
		
			var okay = 0;
			while(!okay)
			{
				randomInteger = Math.floor(Math.random()*(b-a+1))+a;
				
				if(randomInt.arguments[2].sort().indexOf(randomInteger)==-1)
				{
					okay = 1;		
				}
			}			
		}
		else
		{
			randomInteger = Math.floor(Math.random()*(b-a+1))+a;
		}

		return randomInteger;
	}

function compareNumbers(a,b)
{
	return a - b;
}


function indexOfall(inputString, characterToMatch)
{
	// Finds the indexes of all occurences of the specified CHARACTERTOMATCH 
	// in the INPUTSTRING
	//
	// I tried doing this with the built in functions, SEARCH, INDEXOF, and
	// various REGULAR EXPRESSIONS, but nothing came up right. 
	//
	// The OUTPUT from this function is an array containing the indexes
	// of the specified character.
	//
	// EXAMPLES
	//
	//	str = "here is a sentence nnn ***"
	//	indexOfall(str,"*")		[23, 24, 25]
	//	indexOfall(str,"e")		[1, 3, 11, 14, 17]
	//	indexOfall(str,"/")		[-1]

	n = inputString.length;

	if(inputString.indexOf(characterToMatch)==-1)
	{
		// if there are no matches, then send back "[-1]" (similar to indexOf)
		return [-1];
	}
	else
	{
		// otherwise keep using INDEXOF on successive substrings of the original inputstring
		stillMatching = 1;		
		locationOfChars = new Array();
		startingPoint = -1;		

		while(stillMatching)		
		{

			inputString = inputString.substring(startingPoint+1, n);
			m = inputString.length;
			
			if(inputString.indexOf(characterToMatch) != -1)
			{
				locationOfChars.push(inputString.indexOf(characterToMatch)+n-m);
			}
			
			startingPoint = inputString.indexOf(characterToMatch);
		
			if(startingPoint==-1)
			{
				stillMatching = 0; 
				break;
			}						
								
		}

	}

	return locationOfChars;


	
}


function factorial(q)
{
	// Compute the factorial of an integer number >0
	//
	//	e.g
	//		factorial(3) = 6
	//		factorial(4) = 24
	//
	//	This function returns an error if the input Q is non-integer, or negative


	if(Math.round(q) != q)
	{
		return "ERROR: Cannot compute factorial of non-integer number";
	}
	else if(q<0)
	{
		return "ERROR: Cannot compute factorial of negative number";
	}
 
	if((q==0)||(q==1))
	{
		return 1;
	}
	else
	{
		var qn = 1;
		while(q>0)
		{
			qn*=q;
			q--;
		}
		return qn;
	}
} 


function GCD(nums)
{
	// Find the Greatest Common Divisor of an array of numbers, NUMS
	
        if(!nums.length)
                return 0;
        for(var r, a, i = nums.length - 1, GCDNum = nums[i]; i;)
                for(a = nums[--i]; r = a % GCDNum; a = GCDNum, GCDNum = r);
        return GCDNum;
}


function factorIntoPrimes(number)
{
	// Factor NUMBER into the product of primes
	
	// check the number first- we can't deal with negative or non-integer numbers
	if(number<=0 || Math.round(number) != number)
	{
		return "ERROR: cannot deal with non-positive or non-integer numbers";
	}

	// If the original number is prime, then exit
	if(isPrime(number))
	{
		return "Prime";
	}
	
	// otherwise we factor the number into primes
	factorStore = new Array();
	
	var i=2;
	while(i<=sqrt(number))
	{
		if(number % i == 0)
		{
			factor = number/i;
			factorStore.push(i);		
			i--;
			number = factor;
		}
	
		i++;
	}

	// In theory this statement should not need an if, as 
	// the previous checks should garuntee that there is 
	// a factor- but just to be safe!
	if(typeof factor !="undefined")
	{
		factorStore.push(factor);
	}
	
	return factorStore;
}

function randFunctionName()
{
	// A function to generate a random function name- useful for questions
	// such as 
	//
	//	Let 
	//		f(x) = 3x + 2
	//	Find
	//		f(2)
	//
	// We can make the question more interesting by using different letters 
	// for the function other than f

	var possibleFunctionNames = ["f", "g", "h", "k", "p", "q", "r", "s", "t", "u", "v", "w"];
	
	var functionName = randomInt(0, (possibleFunctionNames.length-1));
	var caseChoice = randomInt(0,1);
	
	functionName = possibleFunctionNames[functionName];

	// we can make the function name upper case randomly
	if(caseChoice==1)
	{
		functionName = functionName.toUpperCase();		
	}

	return functionName;
}

function randVariable()
{
	// A function to generate a random variable such as x, y, z, w
	//
	// This is useful for questions such as
	//
	//	Solve the following equation for x
	//		
	//		2x +1 = 3
	//
	// We can make the question more interesting by using different letters 
	// for the variable other than x

	var possibleVariableNames = ["x", "y", "z", "b", "c", "r", "s", "t"];
	var variableName = randomInt(0, (possibleVariableNames.length-1));
	
	variableName = possibleVariableNames[variableName];

	return variableName;
}

function instructions(instructionChoice)
{

	if(instructionChoice=="reducedForm")
	{
		output = "Write your answer in reduced form, and as an improper fraction, e.g write 10/3, not 3 1/3."
	}

}


function roundNumber(number,decimals) 
{
	// Rounds a NUMBER to the specified number of DECIMALS
	//
	//	examples
	//
	//		roundNumber(56.43,2)		56.43
	//		roundNumber(56.456,2)		56.46
	//		roundNumber(56,2)		56.00

	// The new rounded number
	var newString;
	decimals = Number(decimals);
	if (decimals < 1) 
	{
		newString = (Math.round(number)).toString();
	}
	else 
	{
		var numString = number.toString();
		if (numString.lastIndexOf(".") == -1) 
		{
			// If there is no decimal point
			numString += ".";// give it one at the end
		}
		var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
		var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
		var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
		if (d2 >= 5) 
		{
			// Do we need to round up at all? If not, the string will just be truncated
			if (d1 == 9 && cutoff > 0) 
			{
				// If the last digit is 9, find a new cutoff point
				while (cutoff > 0 && (d1 == 9 || isNaN(d1))) 
				{
					if (d1 != ".") 
					{
						cutoff -= 1;
						d1 = Number(numString.substring(cutoff,cutoff+1));
					} 
					else 
					{
						cutoff -= 1;
					}
				}
			}
			d1 += 1;
		} 
		newString = numString.substring(0,cutoff) + d1.toString();
	}
	if (newString.lastIndexOf(".") == -1) 
	{
		// Do this again, to the new string
		newString += ".";
	}

	var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;

	for(var i=0;i<decimals-decs;i++)
	{
		newString += "0";
	}

	//var newNumber = Number(newString);// make it a number if you like
	return newString; // Output the result to the form field (change for your purposes)
}

function mdc(o)
{
	// Find the highest common multiple of an array of numbers
	//
	//	examples
	//		mdc([2,4])=2
	//		mdc([4,8])=4
	if(!o.length)
     		return 0;
     	for(var r, a, i = o.length - 1, b = o[i]; i;)
     		for(a = o[--i]; r = a % b; a = b, b = r);
    	return b;
}

function greatestCommonFactor(firstNumber, secondNumber)
{

	if(firstNumber == secondNumber)
	{
		gcf = firstNumber;
		return gcf;
	}

	// begin with gcf = 1 (1 is a common factor of any 2 numbers)
	gcf = 1;

	// find firstNumber/secondNumber
	reduced = reduceFraction( firstNumber, secondNumber );

	if(reduced.length==1)
	{
		// in this case a/b = integer
		gcf = secondNumber;
		return gcf;
	}
	else
	{
		// otherwise we can send back firstNumber/reduced[0]
		gcf = firstNumber/reduced[0];
		return gcf;
	}
	
}

function clearElement(idtobecleared)
{
	// empty the contents of an element, such as a div box, or a table
	var outnodedum = document.getElementById(idtobecleared);
	var n = outnodedum.childNodes.length;
	for (var i=0; i<n; i++)
	{
		outnodedum.removeChild(outnodedum.firstChild);
	}
}
				
function testQuadZero(a,b,c,x)
{
	// Test the variable x to see if
	//
	//		a x^2 + bx + c =0
	var isQuadFactor = 0;
	if((a*Math.pow(x,2)+b*x+c)==0)
	{
		isQuadFactor = 1;
	}
	return isQuadFactor;
}
		
function quadFormula(a,b,c)
{
	/* Compute the solutions to a quadratic equation, 
		assuming it has at least one real solution
		
	*/
	if((Math.pow(b,2)-4*a*c)<0)
	{
		return "noreal";
	}
	else
	{
		x1 = (-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a); 
		x2 = (-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);
		return [x1, x2];
	}
	
}
