#!/usr/bin/env python

import asyncio
import websockets
from user_manager import User
from param_constants import Param, Command, Response
import time
import hashlib

async def hello(websocket, path):
    session_id = None
    while True:
        url = await websocket.recv()
        print("< {}".format(url))
        param = url.split('&')
        param_dict = {}
        for param_item in param:
            param_item.split('=')
            param_dict[param_item[0]] = param_item[1]
        if param.get(Param.Ctrl, False):
            if param[Param.Ctrl] == Command.Disconnect:
                
                break
            if param[Param.Ctrl] == Command.Heart:
                continue
            if param[Param.Ctrl] == Command.Regist:
                new_user = User(param[Param.Username])
                new_user.set_password(param[Param.Password])
                new_user.add_to_db()
                await websocket.send(Response.RegistSuccess)
            if param[Param.Ctrl] == Command.Login:
                username = param[Param.Username]
                passwd = param[Param.Password]
                assert_user = User(username)
                assert_user.set_password(passwd)
                if assert_user.check_authorisation():
                    await websocket.send(Response.LoginPass)
                    m2 = hashlib.md5()
                    m2.update(str(time.ctime()) + username)
                    session_id = m2.hexdigest()
                    assert_user.set_session_id(session_id)
                else:
                    await websocket.send(Response.LoginFailed)
            if param[Param.Ctrl] == Command.GetGameIdD:
                
        await websocket.send(greeting)
        print("> {}".format(greeting))

start_server = websockets.serve(hello, '127.0.0.1', 8088)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
