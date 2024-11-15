# EasyRoulette - European Roulette Game Prototype

This repository contains a prototype of a European Roulette game developed using TypeScript and Cocos Creator.

![](/docs/image.png)

## Features

- **Betting Mechanics**: Fully implemented betting system that simulates the classic European Roulette experience.
- **Unit Tests**: Unit tests are integrated as game objects.
- **Integration with YandexGames**: Reward for watching Ad, store configuration and balance on the server side. Local server for testing.
- **Background music**: On/Off.
- **Simple rank system**: It's just function of the current balance.

## How to run local server
```
npx @yandex-games/sdk-dev-proxy -p <path_to_build_dir> --app-id=<yandex_app_id>
```

## TODO

- **Mute the music when showing Ad**.
- **Show message when rank is up.**
- **Play sound effects when betting and winning.**
- **Fix offset of the secondary bets.**
- **Make UI responsive.**