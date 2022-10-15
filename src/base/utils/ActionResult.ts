export class ActionResult {
    private _errors: string[];

    constructor() {
        this._errors = [];
    }

    public get errors(): string[] {
        return this._errors;
    }

    public get success(): boolean {
        return this._errors.length === 0;
    }

    public AddError = (value: string) => {
        this._errors.push(value);
    };

    public AddErrors = (values: string[]) => {
        this._errors.push(...values);
    };
}
