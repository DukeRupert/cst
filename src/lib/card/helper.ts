import type { CardTypes } from "./types";

export function createCard(type: string): CardTypes.Item | string {
  if (typeof type !== 'string') return 'error: type was not of type string'
  let card: CardTypes.Item

  switch (type) {
    case 'simple':
      card = simpleBlank;
      break;

    default:
      card = simpleBlank;
  }

  return card;
}

// Constants
const simpleBlank: CardTypes.Simple = {
  id: '',
  type: 'simple',
  x: 0,
  y: 0,
  h: 2,
  w: 3,
  data: {
    name: 'Name',
    content: 'Character Name',
    size: 'xl'
  }
};
