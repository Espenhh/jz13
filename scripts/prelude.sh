#!/bin/bash

_command_exists() {
    type "$1" &> /dev/null;
}

if ! _command_exists pacman ; then
    echo "Install pacman: $ npm install pacman -g"
    exit 2
fi

if [ "$(pacman -V)" != "0.10.4" ]; then
    echo -e "\nUpdating pacman..."
    npm install pacman -g
fi
