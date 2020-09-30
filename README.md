# Live coding
- [x] Wetteranzeige
- [ ] Übungsaufgabe: Button implementieren, der bei Sonne gelb und bei Regen grau ist

# javascript
- [x] destructuring (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [x] spreading (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

# rxjs
-> siehe page1-* (app-routing.module.ts)

# Testing
- [x] verschiedene Templates rendern im TestHost (src/app/warning-level/warning-level-selector/send-mode-selector/send-mode-selector.component.spec.ts)
- [x] fakeAsync, Timings testen (src/app/shared/services/user-activity.service.spec.ts)
- [x] lesbare Tests (src/app/loading-screen/start-konfigurator/station-info/station-info.component.spec.ts)
- [x] "keine Assertion"-Fehler vermeiden (src/app/shared/services/warning-messages/warning-message-request-factory.spec.ts)
- [x] fixture.detectChanges (src/app/loading-screen/start-konfigurator/station-info/station-info.component.spec.ts)
- [x] nativeElement (src/app/description/category-selector/category-selector.component.spec.ts)
- [x] debugElement (src/app/base/banner/collapsible-banner/collapsible-banner.component.spec.ts)
- [x] TestBed.inject, Spies (src/app/receiver/receivers.component.spec.ts)
- [x] HttpTestingController (src/app/authentication.service.spec.ts)
- [x] http Fehlerbehandlung (src/app/base/banner/maintenance-banner/maintenance.service.ts)
- [x] async (https://www.digitalocean.com/community/tutorials/angular-testing-async-fakeasync) (heißt bald waitForAsync)

## Wie schreibe ich einen Test?
- [x] Komponenten erzeugen mit `ng generate component folder/Name`
- [x] Services erzeugen mit `ng generate service folder/ServiceName`
- [x] siehe https://angular.io/cli/generate
- [x] siehe https://angular.io/guide/testing und weitere Kapitel in diesem Bereich


# Angular Basics
- [x] angular.json

## Komponenten
- [x] Inputs (src/app/base/banner/collapsible-banner/collapsible-banner.component.ts)
- [x] Outputs (src/app/loading-screen/start-konfigurator/terms-and-conditions/terms-and-conditions.component.ts)
- [x] Lifecycle (https://angular.io/guide/lifecycle-hooks)
- [x] Smart vs Dumb Components (https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)

### Templates
- [x] ngIf and ng-container, ng-template (src/app/login/login.component.html)
- [x] ngFor (src/app/description/category-selector/category-selector.component.html)
- [x] ng-content (src/app/base/base-layout.component.html)
- [x] ng-content select (src/app/base/banner/banner.component.html)

### Forms
- [x] Reactive Forms (angular docs)
- [x] Template driven Forms (angular docs)

## Services
- [x] Subject + Observable

## Modules
- [x] Modules
- [x] RoutingModules

## Misc
- [x] Directives
- [x] Pipes

## Fallstricke
- [x] Types vs Objects (nur weil TypeScript sagt, es ist ein XY, heißt es nicht, dass es eins ist) (insbesondere HttpClient)
- [x] Tests ohne Assertion (NEU: mit Warning)

# Angular Updates

1. Go to https://update.angular.io/ and configure as needed.
2. Execute the given steps
3. Make commits between steps
4. Install the target version of angular globally and create a new project.
5. Compare the following files between the fresh project and the updated project
  - this is, because we want the project to differ as little as possible from a fresh install
  - works great with `vim -d FILE1 FILE2`
7. Update other dependencies
6. Run `npm run lint`, `npm run build` and `npm run test` to make sure everything still works


## Files to compare

- angular.json
- karma.conf.js
- package.json
- tsconfig.app.json
- tsconfig.spec.json
- tsconfig.json
- tslint.json
- browserslist
- src/polyfills.ts
- src/index.html
- src/test.ts
- src/main.ts

