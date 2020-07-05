import { action } from "mobx";

type Constructor<T extends {} = {}> = new (...args: any[]) => T;
export const createInstance = <T>(destinationConstructor: Constructor<T>): T => Object.assign(new destinationConstructor(), {});
// TODO: This works - But let's update it to ONLY assign types according to keys, not every prop field that come in!
export const toDto = <T>(source: any, destinationConstructor: Constructor<T>): T => Object.assign(new destinationConstructor(), source);
export const mapToDto = <T>(records: T[], destinationConstructor: Constructor<T>): T[] => records.map((record) => toDto(record, destinationConstructor));

// A generic function that performs an action on some input without mutating it.
export const With = <T>(input: T, action: (n: T) => void) => { if (!input) return null; action(input); return input; }
// A generic function that returns an altered instance T.
export const Alter = <T>(input: T, mutateFn: (n: T) => T) => !!input ? mutateFn(input) : null;

export function Find(object, key) {
    var value;
    Object.keys(object).some((index) => {
        if (index === key) {
            value = object[index];
            return true;
        }
        if (object[index] && typeof object[index] === 'object') {
            value = Find(object[index], index)
            return value !== undefined;
        }
    })
    return value;
}

//TODO: Write the equivalent of With and Alter:

// public static T With<T>(this T self, Action<T> action)
// where T : class
// {
    // action(self);
    // return self;
// }
// public static T Alter<T>(this T self, Func<T, T> action)
// where T : class
//     => self != null ? action(self) : default;


// public static bool HasNullProperty<T>(this T instance, string propertyName = "")
// where T : class, new() => instance
//     .GetNullProperties()
//         .Any(name => name == propertyName);

// public static bool HasNullProperties<T>(this T instance)
// where T : class, new() => instance != null
//     && propertyCache.Stash(typeof(T))
//        .Any(prop => prop.GetValue(instance, null) == null);
// }



/** Old Attempts */

// export interface Type<T> extends Function {
//     new(...args: any[]): T
// }

// // Transforms API data (DTOs) to and from Domain Models (User, Paper, et al)
// // SRC: https://coryrylan.com/blog/rich-domain-models-with-typescript
// export class DomainModelConverter {
//     static fromDto<T>(domainModel: Type<T>, dto: any) {
//         const instance = Object.create(domainModel.prototype)
//         instance.state = dto
//         return instance as T
//     }
//     static toDto<T>(domain: any) {
//         return domain.state as T;
//     }
// }

// export class GenericFactory {
//     static create<T>(type: (new () => T)): T {
//         return new type();
//     }
// }


// export function toDto<T>(dtoType: Type<T>, record: any): T {
//     return Object.assign(dtoType, record) as T;
// }

// Maps JSON to an array of Types, T
// export function toDtos<T>(dtoType: Type<T>, records: any[]): T[] {

//     if (!dtoType)
//         throw new Error('Dto type must exist!')

//     if (!records || records?.length == 0) {
//         console.warn('Empty records array passed to this function.')
//         return [];
//     }

//     return records.map((record) => Object.assign(dtoType, record.fields) as T)
// }

// export default DomainModelConverter