export interface Type<T> extends Function {
    new(...args: any[]): T
}

// Transforms API data (DTOs) to and from Domain Models (User, Paper, et al)
// SRC: https://coryrylan.com/blog/rich-domain-models-with-typescript
export default class DomainConverter {
    static fromDto<T>(domainModel: Type<T>, dto: any) {
        const instance = Object.create(domainModel.prototype)
        instance.state = dto
        return instance as T
    }
}