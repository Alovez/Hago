from enum import Enum, unique

@unique
class Param(Enum):
    Ctrl = 'ctrl' 
    Username = 'username'
    Password = 'password'

@unique
class Command(Enum):
    Disconnect = 'disconnect'
    Heart = 'heart'
    Regist = 'regist'
    Login = 'login'
    GetGameIdD = 'get_game_id_d'
    GetGameIdH = 'get_game_id_h'

@unique
class Response(Enum):
    LoginPass = 'lp'
    LoginFailed = 'lf'
    RegistSuccess = 'rs'

@unique
class RoomState(Enum):
    Empty = 'empty'
    WaitingMatching = 'waiting_for_matching'
    Playing = 'playing'