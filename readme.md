Volg deze stappen om van je app een PWA te maken:
- https://angular.io/guide/service-worker-getting-started#serving-with-http-server

Na het toevoegen van `@angular/pwa` moest ik in de webmanifest bij de icons de regels `"purpose": "maskable any"` weg halen. Ik begrijp (nog) niet waarom.

De app was nu installeerbaar op mijn telefoon.
