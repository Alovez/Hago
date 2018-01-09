from enum import Enum, unique

@unique
class Param(Enum):
    Ctrl = 'ctrl' 
    Username = 'username'
    Password = 'password'
    SessionId = 'session_id'
    Reconnect = 'reconnect'

@unique
class Command(Enum):
    Disconnect = 'disconnect'
    Heart = 'heart'
    Register = 'register'
    Login = 'login'
    Logout = 'logout'
    Reconnect = 'reconnect'
    CreateRoom = 'get_game_id_d'
    AddToHackerPool = 'get_game_id_h'

@unique
class Response(Enum):
    LoginPass = 'lp'
    LoginFailed = 'lf'
    RegisterSuccess = 'rs'
    Reconnect = 'rc'

@unique
class RoomState(Enum):
    Empty = 'empty'
    WaitingMatching = 'waiting_for_matching'
    Playing = 'playing'