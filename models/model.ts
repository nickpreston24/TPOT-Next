//from: https://nehalist.io/working-with-models-in-angular/

// Deserialize any object to a class
export interface Deserializable {
    deserialize(input: any): this;
}

// Inheritors can deserialize any JSON object to itself
export default class Model implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input)
        return this
    }
}