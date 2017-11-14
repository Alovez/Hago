from sqlalchemy.dialects import sqlite
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey

Base = declarative_base()

class User(Base):
    __tablename__ = 'account_info'

    id = Column(sqlite.INTEGER(), primary_key=True)
    username = Column(sqlite.TEXT())
    password = Column(sqlite.TEXT())
    create_time = Column(sqlite.DATETIME())
    update_time = Column(sqlite.DATETIME())
    nick_name = Column(sqlite.TEXT())
    avatar_path = Column(sqlite.TEXT())
    last_ip = Column(sqlite.TEXT())
    is_login = Column(sqlite.BOOLEAN())

class Player(Base):
    __tablename__ = 'player_info'

    id = Column(sqlite.INTEGER(), primary_key=True)
    user_id = Column(sqlite.INTEGER(), ForeignKey(column='account_info.id'))
    defender_win_count = Column(sqlite.INTEGER(), default=0)
    defender_lost_count = Column(sqlite.INTEGER(), default=0)
    defender_draw_count = Column(sqlite.INTEGER(), default=0)
    defender_total_count = Column(sqlite.INTEGER(), default=0)
    hacker_win_count = Column(sqlite.INTEGER(), default=0)
    hacker_lost_count = Column(sqlite.INTEGER(), default=0)
    hacker_draw_count = Column(sqlite.INTEGER(), default=0)
    hacker_total_count = Column(sqlite.INTEGER(), default=0)
    room_id = Column(sqlite.INTEGER, ForeignKey(column='room_info.id'))
    room_state = Column(sqlite.TEXT) //defender, hacker, viewer

class Room(Base):
    __tablename__ = 'room_info'

    id = Column(sqlite.INTEGER(), primary_key=True)
    defender_data_list = Column(sqlite.TEXT())
    hacker_data_list = Column(sqlite.TEXT())

