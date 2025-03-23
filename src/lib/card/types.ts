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
    type: 'simple'
  }

  export interface Simple extends Base {
    data: {
      name: string
      content: string
      size: TextSize
    }
  }

  export type Item = Simple
}

export type Item = CardTypes.Item
export type Simple = CardTypes.Simple
