#!/bin/bash
set -e
export LANG="zh_CN.UTF-8"
cd /home/sunhuijun/sourcecode/tobacco
git fetch origin +refs/heads/main:refs/remotes/origin/main
git checkout -B main refs/remotes/origin/main
git reset --hard refs/remotes/origin/main
git clean -fd
