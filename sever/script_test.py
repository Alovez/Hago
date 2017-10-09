#!/usr/bin/python
from sys import stdout, stdin
import sqlite3
import time


def is_table_exist(conn, table):
    cursor = conn.execute("select name from sqlite_master where type='table' order by name;")
    is_table = False
    for row in cursor:
        if row[0] == table:
            is_table = True
    return is_table


conn = sqlite3.connect('chess_state.db')
if not is_table_exist(conn, 'state'):
    conn.execute('''create table state 
    (id            integer PRIMARY KEY autoincrement,
     chess_no      INT              NOT NULL,
     chess_state   TEXT             NOT NULL,
     time          TEXT             NOT NULL);''')
conn.close()


def insert_state(chess_no, chess_state):
    conn = sqlite3.connect('chess_state.db')
    conn.execute("insert into state (chess_no, chess_state, time) values ('%s', '%s', '%s');" % (
    chess_no, chess_state, time.ctime()))
    conn.commit()
    conn.close()

def get_all_state(chess_no):
    conn = sqlite3.connect('chess_state.db')
    cursor = conn.execute("select chess_state from state where chess_no=%s" % chess_no)
    result = []
    for row in cursor:
        result.append(row[0])
    conn.close()
    return result


while True:
    line = stdin.readline().strip().split('&')
    if line[0] != '@heart\n':
        chess_no = line[0]
        chess_state = line[1]
        insert_state(chess_no, chess_state)
        result = get_all_state(chess_no)
        for row in result:
            print(row.split(','))
            stdout.flush()
