import unittest, os, time
from app import Players, app, db
from selenium import webdriver

class SystemTest(unittest.TestCase):
    driver = None

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path='/Users/jordan/Desktop/CITS3403/chromedriver')

        if not self.driver:
            self.skipTest('Web browser not available.')

        else:
            basedir = os.path.abspath(os.path.dirname(__file__))
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'players.db')
            self.app = app.test_client()
            db.create_all()
            test = Players(id=000000, username="test", password_hash="123", max_score=1000)
            db.session.add(test)
            db.session.commit()

    def tearDown(self):
        self.driver.close()
        db.session.query(Players).delete()
        db.session.commit()
        db.session.remove()

    def test_register(self):
        player = Players.query.get(000000)
        self.assertEqual(player.username, 'test', msg='username did not match')
        self.assertEqual(player.password_hash, '123', msg='password did not match')

    
if __name__ == '__main__':
    unittest.main()