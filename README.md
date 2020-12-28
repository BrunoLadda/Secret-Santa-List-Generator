# Secret Santa List Generator
- Developed in VueJs using Vuex.
- Axios for user API query.
- As it is a knowledge assessment (including CSS and HTML), it was decided not to use any design framework like Vuetify or Vue Material, neither ready components.


Application rules
- The list can only be generated if we have at least 3 participants.
- Each participant must receive and give one gift.
- An participant cannot give gift for himself
- Every time the user add or remove a participant, the Secret Santa list is deleted, so it can be recreated.

Future implementations:
- Add real participants
- Send notifications to participants with their pairs
- Add possibility to set a sugested gift for each participant

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
