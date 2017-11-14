import sqlite3
import settings
from sqlalchemy import Column
from sqlalchemy.dialects import sqlite
from sqlalchemy.ext.declarative import declarative_base
from db_constants import User, Player, Room
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime

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
    
