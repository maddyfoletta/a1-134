import { Window, Widget, Rect, Text, RoleType, EventArgs } from "../core/ui";

class Checkbox extends Widget {
    private _box: Rect;
    private _checkmark: Text;
    private _label: Text;
    private _labelText: string = "Checkbox";
    private _checked: boolean = false;
    private _onChange?: (checked: boolean) => void;

    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.button;
    
        // Checkbox square
        this._box = parent.window.rect(20, 20)
            .fill("#ff6e33")
            .stroke({ width: 1, color: "#000" });
        this._box.click(() => this.toggle());
    
        // Checkmark ✓
        this._checkmark = parent.window.text("X")
            .font({ size: 18, family: "Arial" })
            .fill("#000")
            .hide();
        this._checkmark.click(() => this.toggle());
    
        // Label
        this._label = parent.window.text(this._labelText)
            .font({ size: 16, family: "Arial" })
            .fill("#000");
        this._label.click(() => this.toggle());
    
        this.move(0, 0);
    }
    
    protected registerWindowEvents(): void {
        // disable global mouse tracking for Checkbox
    }
    

    // Move all elements together
    move(x: number, y: number): void {
        this._box.move(x, y);
        this._checkmark.move(x - 2, y + 5.5); // slight offset to center
        this._label.move(x + 30, y);
    }

    // Public label property
    set label(text: string) {
        this._labelText = text;
        this._label.text(text);
    }

    get label(): string {
        return this._labelText;
    }

    // Public checked property
    set checked(val: boolean) {
        this._checked = val;
        if (val) {
            this._checkmark.show();
        } else {
            this._checkmark.hide();
        }
        if (this._onChange) this._onChange(val);
    }
    

    get checked(): boolean {
        return this._checked;
    }

    // Toggle state
    toggle(): void {
        this.checked = !this.checked;
    }

    // onChange callback setter
    set onChange(handler: (checked: boolean) => void) {
        this._onChange = handler;
    }

    // State change hooks (optional to implement visuals)
    idleupState(): void {}
    idledownState(): void {
        this.toggle(); // Toggle on click
    }
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}

    render(): void {
        this.update();
    }

    // Override update to sync role and tabindex
    protected update(): void {
        this._box.attr({ role: this.role, tabindex: this.tabindex });
    }
}

export { Checkbox };
