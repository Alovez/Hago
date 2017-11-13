from sqlalchemy.dialects import sqlite
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column

Base = declarative_base()

class User(Base):
    __tablename__ = 'account_info'

    id = Column(sqlite.INTEGER(), primary_key=True)