import { Widget, Window } from "../core/ui";
import { RadioButton } from "./radiobutton";

class RadioGroup extends Widget {
    private _buttons: RadioButton[] = [];
    private _selectedIndex: number = -1;
    private _onChange?: (selectedIndex: number, label: string) => void;
    private _x: number = 0;
    private _y: number = 0;

    constructor(parent: Window, labels: string[]) {
        super(parent);
        if (labels.length < 2) throw new Error("RadioGroup must have at least 2 buttons");

        let y = 0;
        labels.forEach((label, index) => {
            const btn = new RadioButton(parent);
            btn.label = label;
            btn.move(10, y);
            btn.onChange = () => this.select(index);
            this._buttons.push(btn);
            y += 30;
        });
    }

    select(index: number): void {
        if (this._selectedIndex !== -1) {
            this._buttons[this._selectedIndex].checked = false;
        }

        this._selectedIndex = index;
        this._buttons[index].checked = true;

        if (this._onChange) {
            this._onChange(index, this._buttons[index].label);
        }
    }

    set onChange(handler: (index: number, label: string) => void) {
        this._onChange = handler;
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
    
        let yOffset = 0;
        for (const chk of this._buttons) {
            chk.move(x, y + yOffset);
            yOffset += 40; // spacing between checkboxes
        }
    }


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

export { RadioGroup };
