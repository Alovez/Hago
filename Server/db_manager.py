import sqlite3
import settings
from sqlalchemy import Column
from sqlalchemy.dialects import sqlite
from sqlalchemy.ext.declarative import declarative_base
from db_constants import User

Base = declarative_base()

class DBManager(object):
    def __init__(self, *args):
        super(DBManager, self).__init__(*args))
        self.user_db = settings.ACCOUNT_DB
        self.game_info_db = settings.GAME_DB
        self.room_info_db = settings.ROOM_DB
    
    def get_user_connection(self):
        return sqlite3.connect(self.user_db)
        
    def get_game_info_connection(self):
        return sqlite3.connect(self.game_info_db)

    def get_room_info_connction(self):
        return sqlite3.connect(self.room_info_db)
    
    def get_new_user_id(self):
        

    def add_user(self, username, passwd, nickname):
        connect = self.get_user_connection()
        sql = 'insert into UserAccounts (username, password, nickname) values ()'
