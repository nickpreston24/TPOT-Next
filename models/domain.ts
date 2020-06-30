
type Constructor<T extends {} = {}> = new (...args: any[]) => T;
export const createInstance = <T>(destinationConstructor: Constructor<T>): T => Object.assign(new destinationConstructor(), {});
export const toDto = <T>(source: any, destinationConstructor: Constructor<T>): T => Object.assign(new destinationConstructor(), source);

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