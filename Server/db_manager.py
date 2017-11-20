import sqlite3
import settings
from sqlalchemy import Column
from sqlalchemy.dialects import sqlite
from sqlalchemy.ext.declarative import declarative_base
from db_constants import User, Player, Room
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from sqlalchemy import desc
from param_constants import RoomState

Base = declarative_base()

class DBManager(object):
    def __init__(self, *args):
        super(DBManager, self).__init__(*args))
        self.db_name = settings.DB_NAME
    
    def get_session(self):
        engine = create_engine('sqlite:///%s' % self.db_name, echo=True)
        try:
            Base.metadata.create_all(engine)
        except:
            print('Table is already exist.')
        Session = sessionmaker(bind=engine, autocommit=settings.AUTO_COMMIT, autoflush=settings.AUTO_FLUSH)
        return Session()

    def add_user(self, username, passwd, nickname):
        session = self.get_session()
        user = User(
            username=username, 
            password=passwd, 
            nickname=nickname, 
            create_time=datetime.date().today()
            update_time=datetime.date().today()
        )
        session.add(user)
        session.commit()
        session.close()

    def get_user(self, username):
        session = self.get_session()
        user = session.query(User.password, User.is_login).filter(User.username == username).first()
        session.close()
        return user

    def set_session_id(self, username, session_id):
        session = self.get_session()
        user = session.query(User).filter(User.username == username).first()
        user.session_id = session_id
        session.add(user)
        session.commit()
        session.close()

    def get_session_id(self, username):
        session = self.get_session()
        user = session.query(User.session_id).filter(User.username == username).first()
        session.close()
        return user

    def get_game_id_d(self):
        session = self.get_session()
        room = Room(defender_data_list='', hacker_data_list='')
        session.add(room)
        session.commit()
        id = session.query(Room.id).filter(Room.room_state == RoomState.Empty).order_by(desc(Room.id)).first()
        session.close()
        return id

    def enter_room_d(self, room_id, user_id):
        session = self.get_session()
    
    def get_game_id_h(self):
        session = self.get_session()
        id = session.query(Room.id).filter(Room.room_state == RoomState.WaitingMatching).order_by(desc(Room.id)).first()
        session.close()
        return id