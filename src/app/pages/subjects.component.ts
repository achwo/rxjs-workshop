import { AfterViewInit, Component } from '@angular/core';
import { concat, Observable, Subject, timer, ReplaySubject, BehaviorSubject, of, from } from 'rxjs';
import { last, multicast, publish, publishBehavior, publishReplay, share, shareReplay, tap, delay } from 'rxjs/operators';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './page.template.html',
  styles: []
})
export class SubjectsComponent extends PageComponent implements AfterViewInit {
  headline = 'Subject';
  ngAfterViewInit(): void {}

  run(): void {
//    this.subjects();
//    this.replaySubjects();
//    this.behaviourSubjects();
    this.shareReplaying();
  }

  subjects(): void {
    const subject = new Subject<string>();

    subject.asObservable().subscribe(v => this.card.result('Subject emitted', v));

    subject.next('first emit');
    subject.next('second emit');
    this.facts.add('subjects emitten Daten an alle Observers');

    subject.asObservable().subscribe(v => this.card.result('Late subscriber', v));

    this.facts.add('Subject: subscriptions, die nach dem Senden passieren, bekommen nur neue Werte');
  }

  replaySubjects(): void {
    const subject = new ReplaySubject<string>();

    subject.asObservable().subscribe(v => this.card.result('Subject emitted', v));

    subject.next('first emit');
    subject.next('second emit');

    subject.asObservable().subscribe(v => this.card.result('Late subscriber', v));

    this.facts.add('ReplaySubject: vorherige Werte werden nachgesendet');
    this.facts.add('ReplaySubject: Die Anzahl an wiederholten Werten kann eingeschränkt werden. (bufferSize)');
    this.facts.add('ReplaySubject: Die wiederholten Werte können auch anhand einer Zeitspanne eingegrenzt werden. (windowSize)');
  }

  behaviourSubjects(): void {
    const subject = new BehaviorSubject<string>('default value');
    this.facts.add('BehaviorSubject brauchen einen default Wert.');

    subject.asObservable().subscribe(v => this.card.result('Subject emitted', v));
    this.facts.add('BehaviorSubject: der default-Wert wird auch emitted, wenn noch kein anderer Wert emitted wurde');

    subject.next('first emit');
    subject.next('second emit');

    subject.asObservable().subscribe(v => this.card.result('Late subscriber', v));

    this.facts.add('BehaviorSubject: nur der letzte Wert wird nachgesendet');
  }

  shareReplaying(): void {
    const subject = new Subject<string>();
    const obs$ = subject.asObservable().pipe(shareReplay(1));

    obs$.subscribe(v => this.card.result('Subscribed before emitting', v));
    subject.next('Emitted value');

    obs$.subscribe(v => this.card.result('Subscribed after emitting', v));

    this.facts.add('shareReplay wiederholt vorherige Werte.');
    this.facts.add('shareReplay wird oft benutzt, um Requests zu cachen.');

  }
}
