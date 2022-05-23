from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('game_page.html')

@app.route('/guide')
def guide():
    return render_template('guide.html')

@app.route('/ranking')
def rank():
    return render_template('ranking.html')

@app.route('/login')
def login():
    return render_template('login_page.html')

if __name__ == "__main__":
    app.run(debug=True) 