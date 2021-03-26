import { Component } from '@angular/core';

@Component({
  selector: 'app-terminal',
  template: `
    <pre class="terminal">
  <pre>ng generate component xyz</pre>
</pre>
  `,
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {}
