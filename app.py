from crypt import methods
from email.policy import default
from click import password_option
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class Players(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    max_score = db.Column(db.Integer, default=0)


@app.route('/')
def index():
    return render_template('game_page.html')

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
        players = Players.query.order_by(Players.date_created)
        return render_template('login_page.html', players=players)


if __name__ == "__main__":
    app.run(debug=True)