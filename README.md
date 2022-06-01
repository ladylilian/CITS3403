# CITS3403 Project
Make to 24 daily game web application for CITS3403 Project

## Purpose
To tests player's mental arithmetic.<br><br>
How to play:
You are randomly given four digits, each from one to nine, with repetitions allowed.
The objective is to use the four symbols of addition(+), subtraction(-), multiplication(×), and division(÷) to calculate the four given digits and make the result equals to 24.<br><br>
Every time a player completed a round, meeting the goal of making four number cards equal to 24, they will score 100 points. And the top 8 players with the highest scores will be listed in the ranking board. 

## Architecture
To understand how we should build our database model, we first discussed what need to be displayed. In our game, the primary goal is to continue winning game rounds and scoring more points to rank higher up in the ranking board.<br>

To identify the player who is currently playing the game requires an unique ID, for them to login requires their login details, and to store their game records such as the score of the current game and personal highest score.<br>

To build the SQLAlchemy model, we created the Players classes define the database schema, each instance (player) of the model have the following key-value pairs:
1. id (int, primary_key)
2. username (string, unique)
3. password (string, hashed)
4. highest score (int, default=0)
5. current score (int, default=0)
6. date created (datetime)


## How to launch the web application
First, install and create a virtual environment in the directory of our project folder then activate the virtual environment to install all the required the packages (e.g. flask, flask-sqlalchemy, etc.).

In your Terminal or Command Prompt go to the folder that contains our app.py file then type "python app.py" in your terminal or command prompt you should see this output.<br>
<img width="510" alt="image" src="https://user-images.githubusercontent.com/102458345/170899850-f2677796-9740-4fcc-ad49-cb3fec724234.png">

Follow the link in "Running on:..." and the web application should be running on your local computer. The game will require you to register and login, once you logged in successfully, then you can start playing the 24 Game.

## How to Play:
### BUGs!! Please only use these two method to play the game
Metohd 1: Use a number button and an operator order to click (only click each number button once), for example, 9+6+7+2, or 7x2-9÷6<br>
Method 2: If you want to make two pairs of numbers, please click the number button again, for example, (9+7)x(6+2), as we can see in Image 2, it will become 16 and 8, click 8 again; (9+7)x(6+2), click 16 again

Image 1:

![image](https://user-images.githubusercontent.com/88468270/170912438-843cf230-dd7f-49a6-9cec-10f66cce7ec5.png)

Image 2:

![image](https://user-images.githubusercontent.com/88468270/170912483-47cd10ed-b211-49e2-ab49-8995c509b523.png)





## Unit/Integration Testing
Please run "python test.py".

## Pre-Setup
| Package | Site | Guide |
| ----------- | ----------- | ----------- |
| Git | https://git-scm.com/download/win | https://www.youtube.com/watch?v=HfTXHrWMGVY&list=PLZlA0Gpn_vH9xx-RRVNG187ETT2ekWFsq&index=2 |
| mysql | https://dev.mysql.com/downloads/installer/ | https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/ |
| python | https://www.python.org/downloads/ | https://realpython.com/installing-python/ |
| Bootstrap | https://getbootstrap.com/docs/5.1/getting-started/download/ | https://www.makeuseof.com/bootstrap-beginners-guide/ |\

## File Structure
```
CITS3403/
|
├── static/
|   ├── scripts/
|   └── styles/
├── templates/
|
├── app.py
├── jest.config.js
├── log.txt
├── players.db
├── README.md
├── requirements.txt
├── test.py
└── updateSqliteTable.py
```

## Branches/Workflow
Sample workflow to follow for organisation purposes. Please collaborate on tasks that might have conflicting commits by either avoiding or fixing the conflicts.
- feature -> feature/{task}
- bugfix -> bugfix/{task}
  
### Example

1. New task (Add login page to front-end) requires new feature branch
2. Create a new branch off of main (e.g. feature/login-front-end)
3. Complete task
4. Create pull request to main
5. Review by other contributors and pass tests
6. Merge to main 🎉 🎉 🎉

## Contributors

| Name             | Student Number |
| ---------------- | -------------- |
| Pin-Hsuan Tseng  | 22941085       |
| Jorden Lee       | 22493816       |
