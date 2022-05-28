from datetime import datetime
from click import confirm
from flask import Flask, render_template, url_for, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, current_user
from flask_wtf import FlaskForm
from sqlalchemy import desc
from wtforms import StringField,PasswordField,SubmitField,BooleanField
from wtforms.validators import DataRequired,Email,EqualTo
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///players.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

login_manger = LoginManager()
login_manger.init_app(app)

class Players(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(80))
    max_score = db.Column(db.Integer, default=0)
    current_score = db.Column(db.Integer, default=0)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, index=True)

def set_password(self, password):
    self.password_hash = generate_password_hash(password)

def check_password(self, password):
    return check_password_hash(self.password_hash, password)

@login_manger.user_loader
def load_player(player_id):
    return Players.query.get(int(player_id))

class RegistrationForm(FlaskForm):
    username = StringField('username', validators =[DataRequired()])
    password1 = PasswordField('Password', validators = [DataRequired()])
    password2 = PasswordField('Confirm Password', validators = [DataRequired(),EqualTo('password1')])
    submit = SubmitField('Register')

class LoginForm(FlaskForm):
    username = StringField('username',validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me',validators= [DataRequired()])
    submit = SubmitField('Login')

@app.route('/', methods = ['POST','GET'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        check_username = Players.query.filter_by(username = form.username.data).first()
        if check_username is None:
            hashed_pw = generate_password_hash(form.password1.data)
            player = Players(username =form.username.data, password_hash=hashed_pw)
            db.session.add(player)
            db.session.commit()
            return redirect(url_for('login'))
        else:
            flash("That username is already taken, please try a different one.")
    players = Players.query.order_by(desc(Players.max_score))
    return render_template('register_page.html', form=form, players=players)


@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        player = Players.query.filter_by(username = form.username.data).first()
        if player is not None and check_password_hash(player.password_hash, form.password.data):
            login_user(player)
            next = request.args.get("next")
            return redirect('game')
        flash('Invalid username or password.')
    players = Players.query.order_by(desc(Players.max_score))
    return render_template('login_page.html', form=form, players=players)

@app.route('/game')
def index():
    players = Players.query.order_by(desc(Players.max_score))
    return render_template('game_page.html', players=players)

if __name__ == "__main__":
    app.run(debug=True)

