#!/bin/bash

git pull origin master
pm2 reload
sudo systemctl restart nginx.service