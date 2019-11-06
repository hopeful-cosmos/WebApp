#!/usr/bin/python3
import requests
import time

data = {'name': 'dummy', 'state': 'somewhere', 'country': 'somewhere', 'star_name': 'somewhere', 'wish': 'I wish for something'}
while True:
    time.sleep(15)
    result = requests.post('http://hopeful-cosmos.me/api/wish/make', json=data)
    result = requests.post('http://hopeful-cosmos.me/api/wish/make', json=data)
    result = requests.post('http://hopeful-cosmos.me/api/wish/make', json=data)
    # print(result.__dict__)
    time.sleep(15)
    result = requests.get('http://hopeful-cosmos.me/api/wish/all')
    result = requests.get('http://hopeful-cosmos.me/api/wish/all')
    result = requests.get('http://hopeful-cosmos.me/api/wish/all')
    # print(result.__dict__)
    time.sleep(3)
