import {
  Component,
  ChangeDetectionStrategy,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'app-card-button',
  template: `
    <div class="card-container">
      <a
        class="card"
        target="_blank"
        rel="noopener"
        href="https://angular.io/tutorial"
      >
        <svg
          class="material-icons"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
          />
        </svg>

        <p>Learn Angular</p>

        <svg
          class="material-icons"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </a>
    </div>
  `,
  styles: [
    `
      p {
        margin: 0;
      }

      .content {
        display: flex;
        margin: 82px auto 32px;
        padding: 0 16px;
        max-width: 960px;
        flex-direction: column;
        align-items: center;
      }

      svg.material-icons {
        height: 24px;
        width: auto;
      }

      svg.material-icons:not(:last-child) {
        margin-right: 8px;
      }

      .card svg.material-icons path {
        fill: #888;
      }

      .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 16px;
      }

      .card {
        border-radius: 4px;
        border: 1px solid #eee;
        background-color: #fafafa;
        height: 40px;
        width: 200px;
        margin: 0 8px 16px;
        padding: 16px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease-in-out;
        line-height: 24px;
      }

      .card-container .card:not(:last-child) {
        margin-right: 0;
      }

      .card.card-small {
        height: 16px;
        width: 168px;
      }

      .card-container .card:not(.highlight-card) {
        cursor: pointer;
      }

      .card-container .card:not(.highlight-card):hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);
      }

      .card-container .card:not(.highlight-card):hover .material-icons path {
        fill: rgb(105, 103, 103);
      }

      .card.highlight-card {
        background-color: #1976d2;
        color: white;
        font-weight: 600;
        border: none;
        width: auto;
        min-width: 30%;
        position: relative;
      }

      .card.card.highlight-card span {
        margin-left: 60px;
      }

      a,
      a:visited,
      a:hover {
        color: #1976d2;
        text-decoration: none;
      }

      a:hover {
        color: #125699;
      }

      .terminal {
        position: relative;
        width: 80%;
        max-width: 600px;
        border-radius: 6px;
        padding-top: 45px;
        margin-top: 8px;
        overflow: hidden;
        background-color: rgb(15, 15, 16);
      }

      .terminal::before {
        content: '\2022 \2022 \2022';
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        background: rgb(58, 58, 58);
        color: #c2c3c4;
        width: 100%;
        font-size: 2rem;
        line-height: 0;
        padding: 14px 0;
        text-indent: 4px;
      }

      .terminal pre {
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
        color: white;
        padding: 0 1rem 1rem;
        margin: 0;
      }

      /* Responsive Styles */
      @media screen and (max-width: 767px) {
        .card-container > *:not(.circle-link),
        .terminal {
          width: 100%;
        }

        .card:not(.highlight-card) {
          height: 16px;
          margin: 8px 0;
        }

        .card.highlight-card span {
          margin-left: 72px;
        }

        svg#rocket-smoke {
          right: 120px;
          transform: rotate(-5deg);
        }
      }

      @media screen and (max-width: 575px) {
        svg#rocket-smoke {
          display: none;
          visibility: hidden;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardButtonComponent {
  @Input() icon: string;
  @Input() content: string;
}

@NgModule({
  declarations: [CardButtonComponent],
  exports: [CardButtonComponent]
})
export class CardButtonModule {}
