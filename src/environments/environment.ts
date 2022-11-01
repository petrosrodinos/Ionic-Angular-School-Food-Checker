// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAxUMuyRdDYhA-aFezDs1y3x-bxAhRKs0k',
    authDomain: 'foodchecker-607a7.firebaseapp.com',
    projectId: 'foodchecker-607a7',
    storageBucket: 'foodchecker-607a7.appspot.com',
    messagingSenderId: '185789464310',
    appId: '1:185789464310:web:213921e3f9fa85645276d7',
    measurementId: 'G-0LYTDTK6TZ',
  },
  adminEmails: ['petros@gmail.com', 'petros1petros2@gmail.com'],
  admob: {
    ios: 'ca-app-pub-7268165775797379/9722264236',
    android: 'ca-app-pub-7268165775797379/9722264236',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
