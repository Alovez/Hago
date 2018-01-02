import hashlib
from Server.db_manager import DBManager
from Server.param_constants import Param

class User(object):
    def __init__(self, username):
        self.username = username
        self.db_manager = DBManager()
        self.password = None

    def set_password(self, password):
        m2 = hashlib.md5()
        m2.update(password.encode('utf-8'))
        self.password = m2.hexdigest()

    def add_to_db(self):
        self.db_manager.add_user(self.username, self.passwd, self.username)

    def check_authorisation(self):
        user_db = self.db_manager.get_user(self.username)
        if not user_db.is_login:
            return self.password == user_db.password
        else:
            return Param.Reconnect

    def set_session_id(self, session_id):
        self.db_manager.set_session_id(self.username, session_id)

    def logout(self):
        self.db_manager.logout(self.username)
