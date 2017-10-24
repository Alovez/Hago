import hashlib
import sqlite3
from DBManager import DBManager
import time

class User(object):
    def __init__(self, id, name, email, passwd, tran_passwd=True):
        self.id = id
        self.name = name
        self.email = email
        if tran_passwd:
            m2 = hashlib.md5()
            m2.update(passwd.encode('utf-8'))
            self.passwd = m2.hexdigest()
        else:
            self.passwd = passwd

class UserManager():
    def __init__(self):
        self.user_db = 'user.db'
        
    def check_tables(self):
        conn = sqlite3.connect(self.user_db)
        if not self.is_table_exist(conn, 'users'):
            conn.execute('''create table users
            (id            integer PRIMARY KEY autoincrement,
            user_name      TEXT             NOT NULL,
            email          TEXT             NOT NULL,
            passwd         TEXT             NOT NULL);''')
        conn.close()

    def is_table_exist(self, conn, table):
        cursor = conn.execute("select name from sqlite_master where type='table' order by name;")
        is_table = False
        for row in cursor:
            if row[0] == table:
                is_table = True
        return is_table

    def _get_user_by_id(self, id):
        conn = sqlite3.connect(self.user_db)
        cursor = conn.execute("select user_name, email, passwd from users where id=%s" % id)
        user = None
        for row in cursor:
            user = User(id, row[0], row[1], row[2], False)
        conn.close()
        return user

    def get_user_id_by_name(self, username):
        conn = sqlite3.connect(self.user_db)
        cursor = conn.execute(" select id from users where user_name='%s'" % username)
        id = None
        for row in cursor:
            id = row[0]
        conn.close()
        try:
            return self._get_user_by_id(id)
        except:
            return None

    def get_user_id_by_email(self, email):
        conn = sqlite3.connect(self.user_db)
        cursor = conn.execute(" select id from users where email='%s'" % email)
        id = None
        for row in cursor:
            id = row[0]
        conn.close()
        try:
            return self._get_user_by_id(id)
        except:
            return None

    def check_passwd(self, user):
        conn = sqlite3.connect(self.user_db)
        cursor = conn.execute("select passwd from users where id='%s'" % user.id)
        passwd = None
        for row in cursor:
            passwd = row[0]
        conn.close()
        if user.passwd == passwd:
            return True
        else:
            return False

    def create_new_user(self, user):
        try:
            conn = sqlite3.connect(self.user_db)
            conn.execute("insert into users values (%s, '%s', '%s', '%s')" % (user.id, user.name, user.email, user.passwd))
            conn.commit()
            conn.close()
            return 'ok'
        except Exception as e:
            print(e)
            return 'error'

    def get_new_id(self):
        conn = sqlite3.connect(self.user_db)
        cursor = conn.execute('select id from users order by id DESC limit 1')
        id = 0
        for row in cursor:
            id = row[0]
        conn.close()
        return id + 1
