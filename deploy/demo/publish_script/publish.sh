#!/bin/bash
set -e
export LANG="zh_CN.UTF-8"
cd /home/demo/sourcecode/tobacco
git fetch origin +refs/heads/release:refs/remotes/origin/release
git checkout -B release refs/remotes/origin/release
git reset --hard refs/remotes/origin/release
git clean -fd
