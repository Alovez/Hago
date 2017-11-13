#!/usr/bin/env python

import asyncio
import websockets

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
        await websocket.send(greeting)
        print("> {}".format(greeting))

start_server = websockets.serve(hello, '127.0.0.1', 8088)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
