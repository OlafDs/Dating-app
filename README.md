# Dating app - Project Tech

This is a dating app created for sporty singles that don't have time to meet new people


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to have to install this project

```
Install Git
Code editor
Node v11.12.0
NPM v6.7.0
A MongoDB installation (local, cloud or server)
```

If you came across a problem installing mongoDB click [here](https://docs.mongodb.com/) and follow the steps to successfully install MongoDB

For the code editor i used Visual Studio Code, but that's my preference.

### package.json

Check the ```package.json``` file for the dependencies and the devDependencies for downloading NPM packages. I'll show the devDenpendencies here. You need to have this installed: 

```
  "devDependencies": {
    "nodemon": "^1.19.1",
	  "express": "^4.16.4"
  }
}
```
And these are the dependencies that i used in the ```package.json``` file. You don't need to use these. These packages are optinal to download, but it will help to write your code easier:

```
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "dotenv": "^8.0.0",
    "ejs": "^2.6.1",
    "express-session": "^1.16.1",
    "mongojs": "^2.6.0",
    "mongoose": "^5.5.11",
    "multer": "^1.4.1",
    "slug": "^1.1.0",
    "validator": "^11.0.0"
  }
```

### Installing

How to install this project:

Copy the “HTTPS clone URL” link using the clipboard icon at the bottom right of the page’s side-bar.

Use the command git clone, then paste the link from your clipboard, or copy the command and link from below:

```
git clone https://github.com/OlafDs/Dating-app.git
```

Navigate into the repository and install the dependencies from the ```package.json```file. With the **command** below you install **all the packages.** But if you don't want to do that, check the ```package.json```file first and see what you want to download.


```
npm install
```

Change the directory to ~/Dating-app

```
cd ~/Dating-app.git
```

And to ensure that the master-branch is up-to-date, use the pull command

```
git pull https://github.com/OlafDs/Dating-app.git master
```

In MongoDB create a server with a collection and change that in the server file to connect it with your MongoDB Database

```
var db = mongojs('NAME-OF-YOUR-DATABASE', ['NAME-OF-YOUR-COLLECTION']);
```

After that start your server

```
https://<hostname>:<portname>
````

And you'll see this is you are successfully connected

**Start/Login page**

![3a8704b2cfdc5b769a472154bdb018f9](https://user-images.githubusercontent.com/49676649/58911866-1b17fd80-8719-11e9-86d6-edfd98ed5179.png)

**Register page**

You can also go to the register page from the login page. You need to click the *register* link.


![9efb6dadc01ab3192221dee840038a78](https://user-images.githubusercontent.com/49676649/58912070-9083ce00-8719-11e9-8b0e-bea31c4489c7.png)

Tada! There is your local website with a database.

### Setting up .env

Install the dotenv package with ```npm install dotenv``` or with ```yarn add dotenv```. The dotenv package will make your project and database more secure so other people can't hack it. This is not required to do. So if you dont want to do this you can skip this.

Put this is your ```.env```file and change it to the your host, port, MongoDB, dbURL and your secret session:

```
DB_HOST= # Database host (probably localhost)
DB_PORT= # Port of database instance
MONGO_DB= # The database you are using
DB_URL= # URL to connect with your database <mongodb://<your hostname>/<your database name>>
SESSION_SECRET= # Used for session secrets
```

## Other commands to use

```
npm start <server file> || nodemon <server file>
CNTRL + C = Exit server run
```

### Stylsheets

The CSS of all the pages are in one CSS file. All the coding of each page are separated from each other in the CSS file, so you can have a clear view where you are and where you need to go if you want to change something.


## Author

OlafDs - Tech 3

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Google
* Stack Overflow
* Github
* Youtube
* Laurens Aarnoudse
* My classmates that helped me

