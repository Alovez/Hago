import hashlib
from db_manager import DBManager

class User(object):
    def __init__(self, username):
        self.username = username
        self.dbmanager = DBManager()

    def set_password(self, password):
        m2 = hashlib.md5()
        m2.update(password.encode('utf-8'))
        self.password = m2.hexdigest()

    def add_to_db(self):
        self.dbmanager.add_user(self.username, self.passwd, self.username)

    def check_authorisation(self):
        user_db = self.dbmanager.get_user(self.username)
        if not user_db.is_login():
            return self.password == user_db.password
        else:
            return False
    
    def set_session_id(self, session_id):
        self.dbmanager.set_session_id(self.username, session_id)

    def logout(self):
