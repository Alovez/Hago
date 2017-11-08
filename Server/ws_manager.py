#!/usr/bin/env python

import asyncio
import websockets

async def hello(websocket, path):
    while True:
        name = await websocket.recv()
        print("< {}".format(name))
        if name == 'quit':
            break
        greeting = "Hello {}!".format(name)
        await websocket.send(greeting)
        await websocket.send('second message')
        print("> {}".format(greeting))

start_server = websockets.serve(hello, '127.0.0.1', 8088)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
