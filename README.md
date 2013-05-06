##What is google-ranking

Google ranking is based on phantomjs and is meant to query google.com to search for a keyword and then to find the number where your website appears in the goolge results. 

#Pre-requisite
Phantomjs must be installed and you should be able to run phantomjs --version

This simple script can be called as 


#phantomjs google_ranking.js "keyword" "website name"

The above command will enter "keyword" in google search and will try to find if "website name" appears in the result shown by google.
This also counts the page number and the link number where "website name" appeared as result in google search while looking for "keyword"
This also takes a snapshot and save it as google.png.

#BUG
YES you guessed it right, google do not allows robot to make query. And this is what this script tries to do.
So this script will fail if you will run few instanaces of it simultaneously. 
This is helpful for small projects to get a ranking of your web page in google with some keyword but not for big projects where you have to run it very often.

