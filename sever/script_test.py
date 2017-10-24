#!/usr/bin/python
from sys import stdout, stdin
import time
from DBManager import DBManager
from user_manager import User, UserManager

class GameManager():
    def defender_finished():
        pass

db = DBManager()
db.check_tables()
um = UserManager()
um.check_tables()
while True:
    line = stdin.readline().strip()
    if line != '@heart':
        params = line.split('&')
        command = params[0]
        if command == 'get_chess_no':
            print(db.get_chess_no())
            stdout.flush()
            continue
        elif command == 'd' or command == 'h':
            chess_no = params[1]
            chess_state = params[2]
            if len(db.get_all_state(chess_no, command)) == 0:
                db.insert_state(chess_no, chess_state, command)
            else:
                db.update_state(chess_no, chess_state, command)
            print('OK')
            stdout.flush()
        elif command == 'gd':
            chess_no = params[1]
            state = db.get_state_by_no(chess_no, 'd')
            print(state)
            stdout.flush()
        elif command == 'gh':
            chess_no = params[1]
            state = db.get_state_by_no(chess_no, 'h')
            print(state)
            stdout.flush()
        elif command == 'regist':
            username = params[1]
            email = params[2]
            passwd = params[3]
            if um.get_user_id_by_name(username) is not None:
                print('User Name is exist.')
                stdout.flush()
                continue
            if um.get_user_id_by_email(email) is not None:
                print('Email is exist.')
                stdout.flush()
                continue
            new_id = um.get_new_id()
            user = User(new_id, username, email, passwd)
            print(um.create_new_user(user))
            stdout.flush()
        elif command == 'login':
            username = params[1]
            passwd = params[2]
            user = um.get_user_id_by_name(username)
            if user is None:
                print('User name EROOR!')
            elif um.check_passwd(user):
                print('Pass')
            else:
                print('User name or Password error!')
            stdout.flush()
        else:
            print('Invalide command.')
            stdout.flush()
