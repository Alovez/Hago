import sqlite3
import time

class DBManager():
    def check_tables(self):
        conn = sqlite3.connect('chess_state.db')
        if not self.is_table_exist(conn, 'd_state'):
            conn.execute('''create table d_state 
            (id            integer PRIMARY KEY autoincrement,
            chess_no      INT              NOT NULL,
            chess_state   TEXT             NOT NULL,
            time          TEXT             NOT NULL);''')
        if not self.is_table_exist(conn, 'h_state'):
            conn.execute('''create table h_state 
            (id            integer PRIMARY KEY autoincrement,
            chess_no      INT              NOT NULL,
            chess_state   TEXT             NOT NULL,
            time          TEXT             NOT NULL);''')
        conn.close()

    def is_table_exist(self, conn, table):
        cursor = conn.execute("select name from sqlite_master where type='table' order by name;")
        is_table = False
        for row in cursor:
            if row[0] == table:
                is_table = True
        return is_table

    def insert_state(self, chess_no, chess_state, table):
        conn = sqlite3.connect('chess_state.db')
        conn.execute("insert into %s_state (chess_no, chess_state, time) values ('%s', '%s', '%s');" % (
        table,chess_no, chess_state, time.ctime()))
        conn.commit()
        conn.close()

    def get_all_state(self, chess_no, table):
        conn = sqlite3.connect('chess_state.db')
        cursor = conn.execute("select chess_state from %s_state where chess_no=%s" % (table, chess_no))
        result = []
        for row in cursor:
            result.append(row[0])
        conn.close()
        return result

    def update_state(self, chess_no, chess_state, table):
        conn = sqlite3.connect('chess_state.db')
        conn.execute("update %s_state set chess_state='%s' where chess_no=%s"%(table, chess_state, chess_no))
        conn.commit()
        conn.close()
    
    def get_state_by_no(self, chess_no, table):
        conn = sqlite3.connect('chess_state.db')
        cursor = conn.execute("select chess_state from %s_state where chess_no=%s" % (table, chess_no))
        result = ''
        for row in cursor:
            result = row[0]
        conn.close()
        return result

    def get_chess_no(self):
        conn = sqlite3.connect('chess_state.db')
        cursor = conn.execute('select chess_no from d_state')
        chess_no = 0
        for row in cursor:
            chess_no = row[0] + 1
        return chess_no