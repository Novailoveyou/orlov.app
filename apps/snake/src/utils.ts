export const { a, abbr } = {
  a: () => document.createElement('a'),
  abbr: () => document.createElement('abbr'),
  address: () => document.createElement('address'),
  area: () => document.createElement('area'),
  article: () => document.createElement('article'),
} as const satisfies {
  [Key in keyof HTMLElementTagNameMap]: () => HTMLElementTagNameMap[Key]
}
