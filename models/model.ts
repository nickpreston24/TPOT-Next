//from: https://nehalist.io/working-with-models-in-angular/

// Custom Deserialize function
// Any Implementors MUST have a function that deserializes JSON.
export interface IDeserializable {
    deserialize(input: any): this;
}

// ALL Inheritors can deserialize JSON.
// (Note: because this is abstract, it cannot be instanced, which is on purpose)
export default abstract class Model implements IDeserializable {
    constructor(props) { 
        this.deserialize(props) 
        console.log('this (deserialized) :>> ', this);
    }

    // The default deserialization function:
    deserialize(input: any): this {
        Object.assign(this, input)
        return this
    }
}