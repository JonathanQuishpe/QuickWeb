// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyBMGyUcfwT3JauJS2MyM8CHe3U847DPIQ8",
    authDomain: "notificaciones-73f9d.firebaseapp.com",
    databaseURL: "https://notificaciones-73f9d.firebaseio.com",
    projectId: "notificaciones-73f9d",
    storageBucket: "notificaciones-73f9d.appspot.com",
    messagingSenderId: "837047116674",
    appId: "1:837047116674:web:984fe4b93f57add7f6a59b",
    measurementId: "G-JZEKR15SXY"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

