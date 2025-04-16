import { Widget, Window, EventArgs } from "../core/ui";
import { Checkbox } from "./checkbox";


class CheckboxList extends Widget {
    private _checkboxes: Checkbox[] = [];
    private _values: Record<string, boolean> = {};
    private _onChange?: (label: string, checked: boolean, all: Record<string, boolean>) => void;
    private _x: number = 0;
    private _y: number = 0;

    constructor(parent: Window, labels: string[]) {
        super(parent);
        this.role = null;
        this.createCheckboxes(labels);
    }

    private createCheckboxes(labels: string[]) {
        let y = 0;
        for (const label of labels) {
            const chk = new Checkbox(this.parent as Window);
            chk.label = label;
            chk.move(10, y);
            chk.onChange = (checked) => {
                this._values[label] = checked;
                if (this._onChange) {
                    this._onChange(label, checked, { ...this._values });
                }
            };
            this._checkboxes.push(chk);
            this._values[label] = false;
            // y += 30; // spacing between checkboxes
        }
    }

    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
    
        let yOffset = 0;
        for (const chk of this._checkboxes) {
            chk.move(x, y + yOffset);
            yOffset += 40; // spacing between checkboxes
        }
    }

    get values(): Record<string, boolean> {
        return this._values;
    }

    set onChange(callback: (label: string, checked: boolean, all: Record<string, boolean>) => void) {
        this._onChange = callback;
    }

    // Required Widget overrides
    render(): void {}
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { CheckboxList };
