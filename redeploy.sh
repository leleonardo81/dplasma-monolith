#!/bin/bash

git pull origin master
pm2 reload server
sudo systemctl restart nginx.service