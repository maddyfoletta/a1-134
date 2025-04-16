import { Widget, Window, EventArgs, RoleType } from "../core/ui";
import { Rect, Text } from "../core/ui";

class ScrollBar extends Widget {
    private _track: Rect;
    private _thumb: Rect;
    private _upButton: Rect;
    private _text: Text;
    private _input: string;
    private _downButton: Rect;

    private _trackHeight: number;
    public _thumbHeight: number;
    private _thumbPosition: number;
    private _trackY: number = 20;

    public _positionForViewer: number;
    private _onThumbMove: (event: EventArgs) => void;

    private _x: number = 0;
    private _y: number = 0;

    constructor(parent: Window) {
        super(parent);
        this._trackHeight = 200;
        this._thumbHeight = 20;
        this._thumbPosition = 100;
        this._onThumbMove = () => {};
        this.role = RoleType.scrollbar;
        this._positionForViewer = 0;
        this.render();
    }

    // Set and get scroll bar height
    set scrollBarHeight(value: number) {
        this._trackHeight = value;
        this.update();
    }

    get scrollBarHeight(): number {
        return this._trackHeight;
    }

    // Get thumb position
    get thumbPosition(): number {
        return this._thumbPosition;
    }

    // Create and render all parts of the scrollbar
    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Track
        this._track = this._group.rect(20, this._trackHeight).fill("#ffc2aa");
        this._track.move(0, this._y + this._trackY);
        this._track.mouseup((event: MouseEvent) => {
            const offsetY = event.offsetY - this._y;
            const position = offsetY - this._trackY - this._thumbHeight / 2;
            this.moveThumbTo(position);
        });

        // Thumb
        this._thumb = this._group.rect(20, this._thumbHeight).fill("#ff6e33");

        // Up Button
        this._upButton = this._group.rect(20, 20).fill("#ff6e33");
        this._upButton.mouseup(() => this.moveThumb(-10));

        // Down Button
        this._downButton = this._group.rect(20, 20).fill("#ff6e33");
        this._downButton.mouseup(() => this.moveThumb(10));

        this.update();
    }

    // Register external callback
    onThumbMove(callback: (event: EventArgs) => void): void {
        this._onThumbMove = callback;
    }

    // Move the entire scrollbar widget
    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this._group.move(x, y);
        this.update();
    }

    // Update thumb size and position
    override update(): void {
        this._thumb.size(20, this._thumbHeight);
        this._track.size(20, this._trackHeight);

        // Position components
        this._track.move(10, this._y + this._trackY);
        this._upButton.move(10, this._y + this._trackY - 20);
        this._downButton.move(10, this._y + this._trackY + this._trackHeight);

        this.updateThumbPosition();
        super.update();
    }

    private updateThumbPosition(): void {
        this._thumb.move(10, this._y + this._trackY + this._thumbPosition);
    }

    private moveThumb(offset: number): void {
        let newPosition = this._thumbPosition + offset;
        newPosition = Math.max(0, Math.min(newPosition, this._trackHeight - this._thumbHeight));
        this._thumbPosition = newPosition;
        this.updateThumbPosition();

        // Update viewer tracker
        if (offset < 0) {
            this._positionForViewer += 1;
        } else if (offset > 0) {
            this._positionForViewer -= 1;
        }

        this.raise(new EventArgs(this));
        this._onThumbMove(new EventArgs(this));
    }

    private moveThumbTo(position: number): void {
        this._thumbPosition = Math.max(0, Math.min(position, this._trackHeight - this._thumbHeight));
        this.updateThumbPosition();
        this.raise(new EventArgs(this));
        this._onThumbMove(new EventArgs(this));
    }

    // State overrides (optional to style states)
    idleupState(): void {
        this._thumb.fill("pink");
    }
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { ScrollBar };
