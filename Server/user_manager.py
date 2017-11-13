import hashlib

class User(object):
    def __init__(self, username):
        self.username = username

    def set_password(self, password):
        m2 = hashlib.md5()
        m2.update(password.encode('utf-8'))
        self.password = m2.hexdigest()

    
        