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
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    animate(
      300,
      keyframes([
        style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
        style({
          opacity: 1,
          transform: 'translateX(15px)',
          offset: 0.3
        }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
      ])
    )
  ])
]);

export const rotateAnimation =
  // Each unique animation requires its own trigger. The first argument of the trigger function is the name
  trigger('rotatedState', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(-180deg)' })),
    transition('rotated => default', animate('400ms ease-out')),
    transition('default => rotated', animate('400ms ease-in'))
  ]);
