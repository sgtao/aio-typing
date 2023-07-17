[to Top](../README.md)

# react-aio-typing
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `pnpm start`

### `pnpm test`

### `pnpm run build`

### `pnpm run eject`

## Deploy to firebase Hosting
- refer Firebase doc : https://firebase.google.com/docs/hosting?authuser=0&hl=ja#implementation_path

### firebase console
- project name : react-aio-typing
  * project id : react-aio-typing-27586

### setup
```sh
# firebase logout # if needed.
firebase login
firebase init
# Hosting: Configure and deploy Firebase Hosting sites
# Select a default Firebase project for this directory: react-aio-typing-XXXXXX (react-aio-typing)
# What do you want to use as your public directory? build
# Set up automatic builds and deploys with GitHub? N
firebase deploy
# Hosting URL: https://react-aio-typing-XXXXXX.web.app
```

### confirm hosting
- refer webApp(i.e.): https://react-aio-typing-27586.web.app


## Login screen uses Material-UI template

- refer MaterialUI site : https://mui.com/material-ui/getting-started/installation/
### setup
```sh
pnpm install @mui/material @emotion/react @emotion/styled -D
pnpm install @fontsource/roboto -D
pnpm install @mui/icons-material -D
```

### Implement Login Screen
- use template : https://github.com/mui/material-ui/blob/v5.14.0/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js

