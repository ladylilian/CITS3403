from crypt import methods
from email.policy import default
from click import password_option
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
### from flask_login import LoginManager
from datetime import datetime
from sqlalchemy import desc
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
###app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

class Players(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    max_score = db.Column(db.Integer, default=0)
    


@app.route('/')
def index():
    players = Players.query.order_by(desc(Players.max_score))
    return render_template('game_page.html', players=players)

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        player_uname = request.form['username']
        player_pword = request.form['password']
        new_player = Players(username=player_uname, password=player_pword)

        try:
            db.session.add(new_player)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue logging in'

    else:
        players = Players.query.order_by(desc(Players.max_score))
        return render_template('login_page.html', players=players)


if __name__ == "__main__":
    app.run(debug=True)