import { Widget, Window, EventArgs, RoleType, Rect, Circle, Text } from "../core/ui";

class MoodSlider extends Widget {
    private _track: Rect;
    private _thumb: Circle;
    private _emojiLabel: Text;

    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 200;
    private _moods: string[] = ["😢", "🙁", "😐", "🙂", "😊"];
    private _currentIndex: number = 2;

    private _onMoodChange?: (emoji: string, index: number) => void;

    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.none;

        // Track bar
        this._track = parent.window.rect(this._width, 10)
            .fill("#ff6e33")
            .radius(5)
            .stroke("#aaa");

        // Thumb
        this._thumb = parent.window.circle(20).fill("#ffc2aa").stroke("#666");

        // Emoji label
        this._emojiLabel = parent.window.text(this._moods[this._currentIndex])
            .font({ size: 24, family: "Segoe UI Emoji" })
            .fill("#000");

        this.update();
        this.registerEvents();
    }

    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this.update();
    }

    set onMoodChange(callback: (emoji: string, index: number) => void) {
        this._onMoodChange = callback;
    }

    protected update(): void {
        const slotWidth = this._width / (this._moods.length - 1);
        const thumbX = this._x + this._currentIndex * slotWidth;

        this._track.move(this._x, this._y + 20);
        this._thumb.move(thumbX - 10, this._y + 15);
        this._emojiLabel.text(this._moods[this._currentIndex]);
        this._emojiLabel.move(this._x + this._width / 2 - this._emojiLabel.bbox().width / 2, this._y - 15);
    }

    private registerEvents(): void {
        this._track.click((e: MouseEvent) => {
            const clickX = e.offsetX - this._x;
            const slotWidth = this._width / (this._moods.length - 1);
            const index = Math.round(clickX / slotWidth);
            this.setMoodIndex(index);
        });
    }

    private setMoodIndex(index: number): void {
        const clamped = Math.max(0, Math.min(index, this._moods.length - 1));
        this._currentIndex = clamped;
        this.update();

        if (this._onMoodChange) {
            this._onMoodChange(this._moods[clamped], clamped);
        }
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

export { MoodSlider };
