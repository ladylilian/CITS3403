from crypt import methods
from email.policy import default
from flask import Flask, render_template, url_for
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

@app.route('/login')
def login():
    return render_template('login_page.html')


if __name__ == "__main__":
    app.run(debug=True)