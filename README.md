# Dating app - Project Tech

This is a dating app created for sporty singles that don't have time to meet new people

![3a8704b2cfdc5b769a472154bdb018f9](https://user-images.githubusercontent.com/49676649/58911866-1b17fd80-8719-11e9-86d6-edfd98ed5179.png)

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

Check the ```package.json``` file for the dependencies and the devDependencies for downloading NPM packages. I'll show the devDenpendencies here: 

```
  "devDependencies": {
    "nodemon": "^1.19.1",
	  "express": "^4.16.4"
  }
}
```


### Installing

How to install this project:

Copy the “HTTPS clone URL” link using the clipboard icon at the bottom right of the page’s side-bar.

Use the command git clone, then paste the link from your clipboard, or copy the command and link from below:

```
git clone https://github.com/OlafDs/Dating-app.git
```

Navigate into the repository and install the dependencies

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

### Setting up .env


```
DB_HOST= # Database host (probably localhost)
DB_PORT= # Port of database instance
MONGO_DB= # The database you are using
DB_URL= # 
SESSION_SECRET= # Used for session secrets
```

### Stylsheets

The CSS of all the pages are in one CSS file. All the coding of each page are separated from each other in the CSS file, so you can have a clear view where you are and where you need to go if you want to change something.


## Author

OlafDs - Tech 3

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Laurens Aarnoudse
* Google
* Stack Overflow
* Github
* Youtube
* My classmates that helped me

