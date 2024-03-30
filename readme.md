Dit is een proefje om te kijken hoe je van een Angular app met een NodeJS back-end een pwa maakt en push notificaties kan sturen naar mobiele telefoons.

# Maak van Angular een PWA

Bronnen:
- https://angular.io/guide/service-worker-getting-started#serving-with-http-server
- https://medium.com/ngconf/angular-pwa-install-and-configure-858dd8e9fb07

Na het toevoegen van `@angular/pwa` moest ik in de webmanifest bij de icons de regels `"purpose": "maskable any"` weg halen. Ik begrijp (nog) niet waarom.

De app was nu installeerbaar op mijn telefoon.


# Push notifications

Bronnen:
- https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/server.js
- https://developers.google.com/web/fundamentals/push-notifications/web-push-protocol
- https://dev.to/ajayupreti/how-to-use-push-notifications-in-angular-2cll
- https://dev.to/devsmranjan/web-push-notification-with-web-push-angular-node-js-36de
- https://www.youtube.com/watch?v=0vSEmEdYKro

## NodeJS back-end

Installeer het web-push package.
```
npm i web-push
```

Genereer VAPID keys.
```
web-push generate-vapid-keys --json
```
Je krijgt een VAPID key pair
```
{
  publicKey: '<PUBLIC_KEY>',
  privateKey: '<PRIVATE_KEY>'
}
```

De push notificaties werken alleen als de server via https draait!
