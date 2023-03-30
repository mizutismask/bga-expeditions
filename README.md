# What is this project ?

This project is an adaptation for BoardGameArena of the game Expeditions: around the world published by Super Meeple.
You can play here : https://boardgamearena.com

# How to install the auto-build stack

## Install builders

Intall node/npm then `npm i` on the root folder to get builders.

## Auto build JS and CSS files

In VS Code, add extension https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave and then add to config.json extension part :

```json
        "commands": [
            {
                "match": ".*\\.ts$",
                "isAsync": true,
                "cmd": "npm run build:ts"
            },
            {
                "match": ".*\\.scss$",
                "isAsync": true,
                "cmd": "npm run build:scss"
            }
        ]
    }
```

If you use it for another game, replace `expeditions` mentions on package.json `build:scss` script and on tsconfig.json `files` property.

## Auto-upload builded files

Also add one auto-FTP upload extension (for example https://marketplace.visualstudio.com/items?itemName=lukasz-wronski.ftp-sync) and configure it. The extension will detected modified files in the workspace, including builded ones, and upload them to remote server.

## Hint

Make sure ftp-sync.json and node_modules are in .gitignore

# How to start PHP unit test

go on tests dir and start execute file, for example `php ./expeditions.game.test-longest-path.php` / `php ./expeditions.game.test-destination-completed.php`

# Points of rules

Location claiming requires no action from players on bga.
In case of cycle, can I continue the expedition from the compass ? Yes
In case of cycle with the last arrow of any color, can player use tickets to remove this arrow ? No

# About other maps

Some code is already prepared in case of new maps. search "TODO MAPS" to activate them if you duplicate this project to create a new map

^\w*$
