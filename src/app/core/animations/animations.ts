import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
  state,
  keyframes
} from '@angular/animations';

export const listStagger = trigger('listStagger', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        stagger(
          '50ms',
          animate(
            '550ms ease-out',
            style({ opacity: 1, transform: 'translateY(0px)' })
          )
        )
      ],
      { optional: true }
    ),
    query(':leave', animate('500ms', style({ opacity: 0 })), {
      optional: true
    })
  ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate(300)]),
  transition(':leave', animate(300, style({ opacity: 0 })))
]);

export const slideInOutAnimation = trigger('slideInOutAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
  ])
]);

export const bounceAnimation = trigger('bounceAnimation', [
  transition('* <=> *', [
    animate(
      '2s',
      keyframes([
        style({ transform: 'scale(1,1) translateY(0)' }),
        style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
        style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
        style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
        style({ transform: 'scale(1,1) translateY(-7px)' }),
        style({ transform: 'scale(1,1) translateY(0)' })
      ])
    )
  ])
]);
