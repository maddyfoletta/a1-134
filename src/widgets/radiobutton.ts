import { Window, Widget, Circle, Text, RoleType } from "../core/ui";

class RadioButton extends Widget {
    private _outer: Circle;
    private _inner: Circle;
    private _label: Text;
    private _checked: boolean = false;
    private _onChange?: () => void;
    private _labelText: string = "Option";
    private _x: number = 0;
    private _y: number = 0;

    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.button;

        // Outer circle
        this._outer = parent.window.circle(20).fill("#fff").stroke({ width: 2, color: "#ff6e33" });
        this._outer.click(() => this.select());

        // Inner circle (filled when selected)
        this._inner = parent.window.circle(10).fill("#ff6e33").hide();
        this._inner.click(() => this.select());

        // Label
        this._label = parent.window.text(this._labelText)
            .font({ size: 16, family: "Tahoma" })
            .fill("black");
        this._label.click(() => this.select());

        this.move(0, 0);
    }

    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this._outer.move(x, y);
        this._inner.center(x + 10, y + 10); // center inside outer
        this._label.move(x + 30, y);
    }

    set label(value: string) {
        this._labelText = value;
        this._label.text(value);
    }

    get label(): string {
        return this._labelText;
    }

    set checked(val: boolean) {
        this._checked = val;
        if (val) this._inner.show();
        else this._inner.hide();
    }

    get checked(): boolean {
        return this._checked;
    }

    select(): void {
        if (!this._checked) {
            this._onChange?.(); // notify RadioGroup
        }
    }

    set onChange(handler: () => void) {
        this._onChange = handler;
    }

    // override global event registration to avoid all triggering
    protected registerWindowEvents(): void {}

    render(): void { this.update(); }
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
    protected update(): void {
        this._outer.attr({ role: this.role, tabindex: this.tabindex });
    }
}

export { RadioButton };
