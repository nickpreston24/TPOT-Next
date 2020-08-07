import { ReactNode, FC } from "react";

// export interface Command {
//     execute(): void;
// }

// export class SampleCommand implements Command {
//     private payload: string;

//     constructor(payload: string) {
//         Object.assign(this, payload);
//     }
//     execute(): void {
//         console.log(`SampleCommand: See, I can do simple things like printing (${this.payload})`);
//     }
// }


export abstract class Command {
    public reciever: ReactNode // e.g. a button
    public abstract execute(): void

    constructor(reciever: ReactNode) {
        Object.assign(this, reciever)
    }
}

export class SampleButtonCommand extends Command {

    constructor(reciever: ReactNode) {
        super(reciever);
        console.log('Sample Command :>>', this)
    }
    public execute(): void {
        alert("Ping!")
    }
}


export class NavbarCommand extends Command {
    private activationRoute: string;
    private onClickFn: Function;

    public execute(): void {
        if (!!this.onClickFn)
            this.onClickFn();
    }

    constructor(reciever: ReactNode, onClickFn) {
        super(reciever);
        // Object.assign(this, onClickFn)
        this.onClickFn = onClickFn
    }
}
