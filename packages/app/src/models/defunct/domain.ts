export type Constructor<T extends {} = {}> = new (...args: any[]) => T
export const createInstance = <T>(destinationConstructor: Constructor<T>): T =>
  Object.assign(new destinationConstructor(), {})

export const toDto = <T>(source: any, destinationConstructor: Constructor<T>): T =>
  Object.assign(new destinationConstructor(), source)
export const mapToDto = <T>(records: T[], destinationConstructor: Constructor<T>): T[] =>
  records.map((record) => toDto(record, destinationConstructor))

export const With = <T>(input: T, action: (n: T) => void) => {
  if (!input) return null
  action(input)
  return input
}

export const Alter = <T>(input: T, mutateFn: (n: T) => T) => (!!input ? mutateFn(input) : null)

export function Find(object, key) {
  var value
  Object.keys(object).some((index) => {
    if (index === key) {
      value = object[index]
      return true
    }
    if (object[index] && typeof object[index] === 'object') {
      value = Find(object[index], index)
      return value !== undefined
    }
  })
  return value
}
