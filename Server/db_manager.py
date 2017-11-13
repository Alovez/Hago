import sqlite3
import settings

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