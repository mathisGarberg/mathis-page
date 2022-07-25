import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface MediaLink {
  link: string;
  name: string;
  icon: IconName;
}

export const mediaContents = [
  {
    link: 'https://www.linkedin.com/in/mathis-garberg-451672144/',
    name: 'LinkedIn',
    icon: 'linkedin'
  },
  {
    link: 'https://www.github.com/mathisGarberg',
    name: 'Github',
    icon: 'github'
  },
  {
    link: 'https://www.medium.com/@mathis.garberg',
    name: 'Medium',
    icon: 'medium-m'
  },
  {
    link: 'https://stackoverflow.com/users/4228322/mathis-garberg',
    name: 'Stack Overflow',
    icon: 'stack-overflow'
  },
  {
    link: 'https://unsplash.com/@pi_mathis',
    name: 'Unsplash',
    icon: 'unsplash'
  }
] as MediaLink[];
