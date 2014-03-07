function loadchecklist()
{
    // set up an object for the algorithmic examples
	allVars = new Object();	

    // set up the glossary boxes
    setupGlossarylinksandboxes();

    // set up the collapsable boxes
    loadboxes();
    
    // pictures (need to go first!)
    mathcolor="Black";
    LMtranslate();
    translate();
    drawPictures();

    // process the MathML
    // NOTE: the flag in ASCIIMathML.js that allows this is
    //  translateOnLoad = false;    
    AMprocessNode(document.getElementById('contentcolumn'));
}

function setupGlossarylinksandboxes()
{

   // Check for a cookie for the glossaryCheck
   // The result determines the class that we choose
   // for the glossary links- either plain or decorated
  
   // default glossaryclass is to assume the user
   // wants it highlighted
   glossaryclass="glossarylink";

   // default check box
   document.getElementById("glossaryCheck").glossaryhighlightYesNo.checked=true;

   // if there's a cookie for it, then change if necessary
   if(getCookie("glossaryHighlight")!="")
   {
     if(getCookie("glossaryHighlight")==0)
     {
         glossaryclass="plaintext";
         document.getElementById("glossaryCheck").glossaryhighlightYesNo.checked=false;
     }
   }

   // activate glossary links
   keywords = getKeyWords();

   // need to set up a glossary box counter
   glossaryboxcounter = -1;
   
   glossboxstorage = new Array();

   // look through keywords
   for(index=0; index<keywords.length; index++)
   {
        // define the original string as a regular expression
        // the () are used to capture the replaced argument, which is used later
        // as $1
        //
        // The \b put boundaries around the keywords[index]
        // otherwise things like
        //              exponentialbox
        // would be matched with exponential
        // The [^"] says that the word can't begin with " 
        // (which might indicate it is an ID or a name for an html object) 
        // The "gi" stands for global, case insensitive
        originalstring = RegExp('[^\"]\\b('+keywords[index]+'s?)\\b','gi');
        
        // the new string is *just* a string (not a RegExp)
        // which needs to go within a span
        //newstring = "<span class=\"glossaryspan\"> <a href=\"javascript:void(0)\" class="+glossaryclass+">$1</a></span>";
        newstring = "<span class=\"glossaryspan\"> $1</span>";

        // make the substitution
        document.getElementById('contentcolumn').innerHTML=document.getElementById('contentcolumn').innerHTML.replace(originalstring, newstring);

        // Each glossary link needs an ID.
        //
        // Loop through current glossary links, and work with the ones that don't have an ID
        // as previous keywords will have created them
        allglossarylinks = document.getElementsByClassName(glossaryclass);
        allglossaryspan = document.getElementsByClassName('glossaryspan');

        for(i=0; i < allglossaryspan.length; i++)
        {
           if(allglossaryspan[i].id=="") 
           {
                // increment the glossary box counter
                glossaryboxcounter++;
                
                // set the ID of the glossary span
                allglossaryspan[i].setAttribute('id','span'+glossaryboxcounter);

                // set the ID of the glossary link
                linkID = keywords[index].replace(' ','')+glossaryboxcounter; // Could also be 'glossarylink'+glossaryboxcounter;
                                                                             // The advantage of doing it this way is that 
                                                                             // the ID now contains the topic it is referencing

                // check that the keyword is not within a heading <h1></h1>, <h2>, </h2>, etc
                bodynolinebreaks = document.getElementById('contentcolumn').innerHTML;
                re = RegExp("\\n","g");
                //bodynolinebreaks.replace(re,"");
                bodynolinebreaks = bodynolinebreaks.replace(/(\r\n|\n|\r)/gm,"");
                bodynolinebreaks.match(RegExp("<h([0-9])>.*?<\/h\\1>",'gi'));
                if(bodynolinebreaks.match(RegExp("<h([0-9])>.*?<\/h\\1>",'gi')).join(",").match("span"+glossaryboxcounter)==null)
                {
                    // get the current text from the span
                    keeptext = document.getElementById('span'+glossaryboxcounter).childNodes[0].textContent;
                    clearElement('span'+glossaryboxcounter);
                    // if the keeptext begins with a space, then remove it, and put it in the span
                    // otherwise we get a hyperlink that begins with a space (which looks ugly)
                    if(keeptext.match(/^\ /)!=null)
                    {
                        re = RegExp('^\ ','');
                        keeptext.replace(re,"");
                        allglossaryspan[i].appendChild(document.createTextNode(' '));
                    }
                    
                    // make the glossary links active
                    // Note: the glossary boxes don't actually exist at this stage- we do it next 
                    glosslink = document.createElement('a');
                    glosslink.appendChild(document.createTextNode(keeptext));
                    glosslink.setAttribute('id',linkID);
                    glosslink.setAttribute('onclick',"toggleglossarybox('glossarybox"+glossaryboxcounter+"')");
                    glosslink.setAttribute('class',glossaryclass);
                    glosslink.setAttribute('href',"javascript:void(0)");
                    allglossaryspan[i].appendChild(glosslink);
                }

                // create the close button
                closebutton=document.createElement('img');
                closebutton.setAttribute('src','images/closebutton.png');
                closebutton.setAttribute('width','15');
                // make it into a link that closes this glossary box
                closebuttonlink=document.createElement('a');
                closebuttonlink.appendChild(closebutton);
                closebuttonlink.setAttribute('onclick',"toggleglossarybox('glossarybox"+glossaryboxcounter+"')");
                closebuttonlink.setAttribute('href',"javascript:void(0)");
                closebuttonlink.setAttribute('class',"closebutton");
                // put it on the right
                closebuttonbox=document.createElement('div');
                closebuttonbox.setAttribute('style','float:right');
                closebuttonbox.appendChild(closebuttonlink);
                // make the glossary box
                theglossbox=document.createElement('div');
                theglossbox.style.display = "none";
                theglossbox.setAttribute('class','glossarybox');
                theglossbox.setAttribute('id','glossarybox'+glossaryboxcounter);
                if(document.getElementById(keywords[index].replace(' ',''))!=null)
                {
                    // if there's a glossary item, then put it in the div box
                    theglossbox.appendChild(closebuttonbox);
                    theglossbox.innerHTML += document.getElementById(keywords[index].replace(' ','')).innerHTML;
                }
                else
                {
                   // if not, then give an alert for the first occurence
                   if(IDcounter==0){alert('no glossary item available for '+keywords[index]);}
                }

                // store the glossary box
                glossboxstorage.push(theglossbox);
           }
        }

   }

   // The above loop created the links, and the glossary boxes-
   // this next loop puts them together.
   //
   // The reason for waiting is that otherwise the glossary boxes
   // are searched for keywords, so you would get glossary boxes within
   // glossary boxes
   for(i=0; i < glossaryboxcounter+1;i++)
   {
       // append each link with its corresponding div box (within a span)
       //      <span>
       //          <span>                          absolutely positioned
       //              <a>glossary link</a>
       //              <div> glossary box </div>   relatively positioned (to the above span)
       //          </span>
       //      </span>
       // create the div box
       
       // append it to a span
       insideSpan = document.createElement('span');
       insideSpan.appendChild(glossboxstorage[i]);
       // append the span to the span around the link
       document.getElementById('span'+i).appendChild(insideSpan);
   }

   // now that the glossary boxes are set up, check the cookie to see if
   // the user wants them
   //
   // default: assume the user wants glossboxes, and not just links
   document.getElementById('boxesnotlinks').checked=true;
   if(getCookie("glossboxChoice")!="")
   {
     if(getCookie("glossboxChoice")==0)
     {
         changeGlossarylinksbehaviour(0);
         document.getElementById('linksnotboxes').checked=true;
     }
   }
}

function changeGlossarylinksbehaviour(userChoice)
{
   // default glossaryclass
   glossaryclass="glossarylink";

   // check the cookie, and change glossaryclass if necessary
   if(getCookie("glossaryHighlight")!="")
   {
     if(getCookie("glossaryHighlight")==0)
     {
         glossaryclass="plaintext";
     }
   }
   
   // get the glossary links
   allglossarylinks = document.getElementsByClassName(glossaryclass);

   // need to change the href attribute
   for(i=0; i < allglossarylinks.length; i++)
   {
        if(userChoice==0)
        {
            // user wants links
	        document.cookie = "glossboxChoice=0";
            linkforglossary = allglossarylinks[i].id;
            stripnumber = RegExp("[0-9]","gi");
            linkforglossary = linkforglossary.replace(stripnumber,'');
            allglossarylinks[i].setAttribute('href',"glossary.php#"+linkforglossary);
        }
        else
        {
            // user wants boxes
	        document.cookie = "glossboxChoice=1";
            allglossarylinks[i].setAttribute('href',"javascript:void(0)");
        }
   }
}


function changeGlossarylinks()
{

	glossaryCheck = document.getElementById("glossaryCheck");
    var allLinks = document.getElementsByTagName('a');

	if(!glossaryCheck.glossaryhighlightYesNo.checked)
	{
	    document.cookie = "glossaryHighlight="+encodeURI(0)+";";

		for(var i=0; i<allLinks.length; i++ )
		{
			if(allLinks[i].className=="glossarylink")
            {
                allLinks[i].setAttribute("class", "plaintext");
            }
        }
	}
	else
	{
	    document.cookie = "glossaryHighlight="+encodeURI(1)+";";
		for(var i=0; i<allLinks.length; i++ )
		{
			if(allLinks[i].className=="plaintext")
            {
                allLinks[i].setAttribute("class", "glossarylink");
            }
        }
	}
}


function toggleglossarybox(divboxID)
{
    // if the user has chosen not to see the glossaryboxes,
    // then return without toggling
    if(getCookie("glossboxChoice").length>=1 && getCookie("glossboxChoice")==0)
    {
        return;
    }
    // open or close the glossary box- no need for cookies
    var box = document.getElementById(divboxID);
	if(box.style.display == 'none')
	{
		/*The box is CLOSED, so OPEN it*/
		box.style.display = 'block';	
	}					
	else if(box.style.display == 'block')					
	{
		/*The box is OPEN, so CLOSE it*/
		box.style.display = 'none';
	}
}

function getKeyWords()
{
   // The keywords are used by a couple of functions
   // so it's best to have them defined in one place
   keywords = ["exponential","concave up","concave down"];
   return keywords;
}

function getCookie(name)
{
    // get the value of the cookie
    var arg = name+"=";
    var argumentlength = arg.length;
    var cookielength = document.cookie.length;
    var i = 0;
    while(i < cookielength)
    {
        var j = i + argumentlength ;
        if(document.cookie.substring(i,j)==arg)
        {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i)+1;
        if(i==0)
        {
            break;
        }
    }
    return "";
}

function getCookieVal(offset)
{
    // gets the value of the cookie
    var endstr = document.cookie.indexOf(";",offset);
    if(endstr==-1)
    {
        endstr = document.cookie.length;
    }
    return decodeURI(document.cookie.substring(offset,endstr));
}

function goNext(exampleName, myelementID, mybuttonID)
{
    // used in the algorithmically generated examples
	allVars.getInfo = string2Object(exampleName);
	allVars.getInfo(myelementID, mybuttonID);

	clearElement(myelementID+"step");					
	
	if(document.getElementById(mybuttonID).value!="Start example")
	{
		document.getElementById(myelementID+"step").appendChild(document.createTextNode("Step "+ allVars.getInfo.currentStep+" of "+allVars.getInfo.maxSteps));
	}
	return;
}

function toggleAll(allOpen)
{

	var x = window.divboxStore;
	var y = window.pixStore;

    // change the display style
	for (var i=0;i<x.length;i++)
	{
		if(allOpen==1)
		{
			/* CLOSE the Box */
			x[i].style.display = 'none';	
		}
		else if (allOpen==0)
		{
			/*OPEN the Box */
			x[i].style.display = 'block';
		}
	}
	
    // change the images
	for (var i=0;i<y.length;i++)
	{
		if(allOpen==1)
		{
			/* CLOSED Box */
			y[i].src = "images/rightbutton.gif";	
		}
		else if (allOpen==0)
		{
			/*OPENED Box */
			y[i].src = "images/downbutton.gif";	
		}
	}
	return;
}


function loadboxes()
{
		/* On load we want to show the boxes open or closed depending on the cookie values */
    
		var y = document.getElementsByTagName('div');
		var divboxStore = new Array();
		var divboxCounter = -1;

		for(var i=0; i<y.length; i++ )
		{
			if(y[i].className=="changeable")
			{
				divboxCounter++;
				divboxStore[divboxCounter] = y[i]; 
				y[i].style.display = 'none';
				
			}					
		}

        // used later to toggle
		window.divboxStore = divboxStore;

		var pix = document.getElementsByTagName('img');
		var pixStore = new Array();
		var pixstoreCounter = -1;

		for(i=0; i<pix.length; i++)
		{
			if(pix[i].className=="changeable")		
			{
				pixstoreCounter++;
				pixStore[pixstoreCounter] = pix[i];			
			}
		
		}

        // used later to toggle
		window.pixStore = pixStore;

        pagecookie = getCookie(mathclass);
    
        // open the appropriate div boxes depending on
        // the cookie
        if(pagecookie.length>0)
        {
            // pagecookie has the form
            //      bx0:1,bx2:0,bx3:1
            // each entry is separated by commas
            //
            // Next line creates an array with
            //  [bx0:1, bx2:0, bx3:1, ...]
            pagecookie = pagecookie.split(',');
    
            // loop through the entries in the array
         	for(var i=0; i<pagecookie.length; i++)
         	{
         		divboxID = pagecookie[i].split(':')[0];
         		boxopen = pagecookie[i].split(':')[1];
         		pictureID = "px"+divboxID.split('x')[1];		
         		toggle(divboxID,pictureID,boxopen);	
         	}
       }
}

function toggle(divboxID, pictureID, boxopen)
{
    //  INPUT:
    //          divboxID:  id of the div box to be toggled
    //          pictureID: id of the corresponding image (right or down.gif)
    //          boxopen:   optional argument
    // opens or closes the div box, changes the right/down button
    // and writes a cookie

    usedboxopen = 0;
    if(boxopen==0)
    {
        document.getElementById(divboxID).style.display="none"
        document.getElementById(pictureID).src="images/rightbutton.gif";
        usedboxopen = 1;
    }
    else if(boxopen==1)
    {
        document.getElementById(divboxID).style.display="block"
        document.getElementById(pictureID).src="images/downbutton.gif";
        usedboxopen = 1;
    }

    if(usedboxopen=="")
    {
         if(document.getElementById(divboxID).style.display=="block")
         {
             document.getElementById(divboxID).style.display="none"
             document.getElementById(pictureID).src="images/rightbutton.gif";
             boxopen=0;
         }
         else
         {
             document.getElementById(divboxID).style.display="block"
             document.getElementById(pictureID).src="images/downbutton.gif";
             boxopen=1;
         }
    }
    
    // if there is no cookie,then set one
    if(getCookie(mathclass)=="")
    {
        document.cookie = mathclass+"="+divboxID+":"+encodeURI(boxopen);
    }
    else
    {
        // otherwise make sure to delete the current entry
        // for this div box
        re = RegExp(',?'+divboxID+':[0-9]',"g")
        cookietext = getCookie(mathclass);
        cookietext = cookietext.replace(re,"");
        if(cookietext.length==0)
        {
            cookietext+=divboxID+":"+encodeURI(boxopen);
        }
        else
        {
            cookietext+=","+divboxID+":"+encodeURI(boxopen);
        }
        re = RegExp('^,',"g")
        cookietext = cookietext.replace(re,"");
        document.cookie = mathclass+"="+cookietext;
    }
    return;
}


function calculatortoggle(divboxIDopen, divboxIDclose)
{
    //  INPUT:
    //          divboxIDopen:  id of the div box to be OPENED
    //          divboxIDclose: id of the div boxes to be closed
    //
    // Used for the calculator screenshots

    document.getElementById(divboxIDopen).style.display="block";
    document.getElementById(divboxIDclose).style.display="none";
}
