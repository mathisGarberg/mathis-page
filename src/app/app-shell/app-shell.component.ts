import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  template: `
    <div class="loading">
      Denne siden lastes med SSR
      <div></div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {}
