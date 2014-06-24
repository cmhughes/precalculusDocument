XML based approach, a la Beezer
    # install xsltproc
    # sudo apt-get install xsltproc 

# output to tex file
xsltproc ./xsl/mathbook-latex.xsl sample-article.xml > myfile.tex
# outputs to derivatives.html (specified in sample-article.xml)
xsltproc ./xsl/mathbook-html.xsl sample-article.xml
