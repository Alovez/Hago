#!/usr/bin/env python

import asyncio
import websockets
from user_manager import User

async def hello(websocket, path):
    while True:
        url = await websocket.recv()
        print("< {}".format(url))
        param = url.split('&')
        param_dict = {}
        for param_item in param:
            param_item.split('=')
            param_dict[param_item[0]] = param_item[1]
        if param.get('ctrl', False):
            if param['ctrl'] == 'disconnect':
                break
            if param['ctrl'] == 'heart':
                continue
            if param['ctrl'] == 'regist':
                new_user = User(param['username'])
                new_user.set_password(param['password'])
                new_user.add_to_db()
            if param['ctrl'] == 'login':
                
                
        await websocket.send(greeting)
        print("> {}".format(greeting))

start_server = websockets.serve(hello, '127.0.0.1', 8088)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
