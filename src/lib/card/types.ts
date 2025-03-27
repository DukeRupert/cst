export namespace CardTypes {
  export type TextSize = 'xs' | 'sm' | 'base' | 'xl' | '2xl'

  export interface Grid {
    x: number,
    y: number,
    w: number,
    h: number
  }

  export interface Base extends Grid {
    id: string
    type: string
  }

  export interface Simple extends Base {
    type: 'simple'
    data: {
      title: string
      content: string
      size: TextSize
    }
  }

  export interface Ancestry extends Base {
    type: 'ancestry'
    data: {
      title: string
      name: string
      description: string
      lifespan: string
      age: string
      size: string
    }
  }

  export interface Characteristics extends Base {
    type: 'characteristics'
    data: {
      might: number
      agility: number
      reason: number
      intuition: number
      presence: number
    }
  }

  export type Item = Simple | Ancestry
}

export type Item = CardTypes.Item
export type Simple = CardTypes.Simple
export type Ancestry = CardTypes.Ancestry
export type Characteristics = CardTypes.Characteristics
