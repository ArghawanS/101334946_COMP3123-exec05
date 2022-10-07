//Arghawan GHulam Siddiq - 101334946

const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.send(`${__dirname}/home.html`);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(`${__dirname}/user.json`);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  let result = "<p>"
	let queryUsername = req.query['username'];
	let queryPassword = req.query['password'];
	let conf = JSON.parse(fs.readFileSync('user.json'));

  if(queryUsername === conf.username && queryPassword == conf.password)
	{
		result += `status: true<br>`;
		result += `message: "User is valid"<br>`;
	}
	else if(queryUsername !== conf.username)
	{
		result += `status: false<br>`;
		result += `message: "Username is invalid"<br>`;
	}
	else
	{
		result += `status: false<br>`;
		result += `message: "Password is invalid"<br>`;
	}
	result += "</p>";
	res.send(result);
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
	let queryUsername = req.query['username'];
	res.send(`<b>${queryUsername} successfully logged out.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
