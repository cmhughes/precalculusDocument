%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    See http://www.gnu.org/licenses/

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

This document started at Portland Community College; some 
activity happened between February 2011 and January 2012.

Ethos:
    Modelling-based approach to pre-calculus materials: 
        exponential functions
        logarithmic functions
        polynomial functions
        rational functions
        piecewise-defined functions
        trigonometric functions
        transformations and composition of functions
        parametric curves
    
    Emphasizing the rule of four:  
        graphically
        numerically
        verbally
        algebraically. 

We release this document to the world in the hope that it 
can be built upon. 

mainfile.tex \includes the various chapter files. The graphs and 
other images are all produced with tikz/pgfplots; you compile
the document with pdflatex. You might like to make use of the 
arara tool to ease the compilation. All features and settings
are controlled in mainfile.tex

Progress (July 2013)
    - we have made some progress on the first half of this document-
      the pdf should be a fairly good indicator of how far we got.

Features:
    - solutions to problems are written to separate files
      which are \inputted at the end
    - the problem numbers hyperlink to their respective solutions,
      and the solution numbers hyperlink back to the problems
    - the hyperlinks for even and odd problems can be switched
      separately

Ideas for the future:
    - chapter by chapter index
    - global index
    - chapter by chapter glossary
    - global glossary
    - xml markup as in http://linear.ups.edu/html/preface.html may 
      lead to easier output to different modes (pdf, html, SAGE links)
    - (obviously) complete the other chapters

Disclaimer:
    - if you find any mistakes, feel free to fix them and push your 
      version back up to git
