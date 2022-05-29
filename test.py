from curses import use_default_colors
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
            db.init_app(app)
            db.create_all()
            p1 = Players(username="test1", password_hash="123")
            p2 = Players(username="test2", password_hash="234")
            db.session.add(p1)
            db.session.add(p2)
            db.session.commit()
            self.driver.maximize_window()
            self.driver.get()

    def tearDown(self):
        if self.driver:
            self.driver.close()
            db.session.query(Players).delete()
            db.session.commit()
            db.session.remove()

    def test_register(self):
        s = Players.query.filter_by(id=1).first
        self.assertEqual(s.username, 'test1', msg='player exists in db')
    
if __name__ == '__main__':
    unittest.main(verbosity=2)