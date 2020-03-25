# currency_rates

# bootcamp
TWDB practice

1. dnf install node

2. mkdir your_project_dir

3. cd your_project_dir

4. npm init

5. npm i express --save

6. npm i ejs --save

7. npm i body-parser --save

8. mkdir views //for ejs files (aka route templates) like home.ejs etc.

9. add next strings to your app.js (aka main.js) application file
:
app.set("view engine", "ejs");    //for using ejs file without 'ejs' ext
app.use(express.static("public"));//for css and scripts files 
app.use(bodyParser.urlencoded({extended: true})) //telling express to use the  body-parser

10. 
