import { Widget, Window, RoleType, EventArgs } from "../core/ui";
import { Rect, Text } from "@svgdotjs/svg.js";

class ProgressBar extends Widget {
    private _track: Rect;
    private _fill: Rect;
    private _label: Text;

    private _width: number = 200;
    private _height: number = 20;
    private _value: number = 0;

    private _x: number = 0;
    private _y: number = 0;

    private _onIncrement?: (value: number) => void;
    private _onStateChange?: (state: string) => void;

    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.none;

        this._track = parent.window.rect(this._width, this._height).fill("#ffc2aa").stroke("#999");
        this._fill = parent.window.rect(0, this._height).fill("#ff6e33");
        this._label = parent.window.text("0%")
            .font({ size: 14, family: "Tahoma" })
            .fill("#000");

        this.update();
    }

    // Set width
    set progressWidth(value: number) {
        this._width = value;
        this._track.width(value);
        this.update();
    }

    // Set value (0–100)
    set incrementValue(val: number) {
        this._value = Math.max(0, Math.min(val, 100));
        this.update();

        if (this._onIncrement) {
            this._onIncrement(this._value);
        }
    }

    // Get value
    get incrementValue(): number {
        return this._value;
    }

    // Increment by amount
    increment(amount: number): void {
        this.incrementValue = this._value + amount;
        if (this._onStateChange) {
            this._onStateChange("incremented");
        }
    }

    // Set handlers
    set onIncrement(callback: (value: number) => void) {
        this._onIncrement = callback;
    }

    set onStateChange(callback: (state: string) => void) {
        this._onStateChange = callback;
    }

    // Move the widget
    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this._track.move(x, y);
        this.update();
    }

    // Update visuals (called whenever value or size changes)
    protected update(): void {
        const clamped = Math.max(0, Math.min(this._value, 100));
        const fillWidth = (clamped / 100) * this._width;

        // Move and size elements
        this._fill.width(fillWidth);
        this._fill.height(this._height);
        this._fill.move(this._x, this._y);

        this._label.text(`${Math.round(clamped)}%`);
        const labelX = this._x + this._width / 2 - this._label.bbox().width / 2;
        const labelY = this._y + this._height / 2 - this._label.bbox().height / 2;
        this._label.move(labelX, labelY);
    }

    // Required overrides
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

export { ProgressBar };
