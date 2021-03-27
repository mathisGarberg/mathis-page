import { Component, OnInit } from '@angular/core';
import { concat, from, interval, Observable, of } from 'rxjs';
import {
  concatMap,
  delay,
  ignoreElements,
  map,
  repeat,
  skip,
  switchMap,
  take
} from 'rxjs/operators';
import { AnimationCompleteCallbackService } from 'src/app/app.component';

@Component({
  selector: 'app-terminal',
  template: `
    <pre class="terminal">
  <pre>{{ value$ | async }}|</pre>
</pre>
  `,
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  titles = [
    'console.log("Hello! My name is Mathis Garberg");',
    'console.log("Living in Oslo, Norway);',
    'console.log("An open source enthusiast with passion for programming");',
    'console.log("Creator of intuitive and user friendly solutions");',
    'npm install --save-dev mathis-garberg'
  ];

  value$: Observable<string>;

  type = ({ word, speed, backwards = false }) =>
    interval(speed).pipe(
      map((x: number) =>
        backwards ? word.substr(0, word.length - x - 1) : word.substr(0, x + 1)
      ),
      take(word.length)
    );

  typeEffect = (word: string) =>
    concat(
      this.type({ word, speed: 50 }),
      of('').pipe(delay(800), ignoreElements()),
      this.type({ word, speed: 40, backwards: true }),
      of('').pipe(delay(100), ignoreElements())
    );

  constructor(
    private animationCompleteCallback: AnimationCompleteCallbackService
  ) {}

  ngOnInit(): void {
    this.value$ = this.animationCompleteCallback.animationCompleteCallbackValue.pipe(
      skip(1),
      switchMap(() =>
        from(this.titles).pipe(concatMap(this.typeEffect), repeat())
      )
    );
  }
}
