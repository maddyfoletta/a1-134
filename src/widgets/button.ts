// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private _clickCallback?: () => void;


    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    set label(text: string){
        this._input = text;
        this.update()
    }

    get label(): string {
        return this._input;
    }

    set size(sizes: {width: number, height: number}){
        this.height = sizes.height;
        this.width = sizes.width;
        this.update();
    }

    get size(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height).radius(6).fill("#ff6e33").stroke("black");
        this._rect.stroke("black");
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.size(this.width, this.height);
            this._rect.fill(this.backcolor);
            this._rect.fill(this.backcolor);
        
        super.update();
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void): void {
        this._clickCallback = callback;
    }
    

    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill("#ff6e33");
        // this._rect.stroke("#ffffff")
    }

    pressReleaseState(): void{

        if (this.previousState instanceof PressedWidgetState){
            this.raise(new EventArgs(this));
        }

        if (this._clickCallback) {
            this._clickCallback();
        }
    }

    idledownState(): void {
        // this._rect.fill("#a93100");
    }

    pressedState(): void {
        this.backcolor = "#ffffff";
        this._rect.fill(this.backcolor);
        this._rect.stroke("#ff6e33");
        console.log("Pressed");
    }

    hoverState(): void {
        this.backcolor = "#ff986e";
        this._rect.fill(this.backcolor);
    }
    hoverPressedState(): void {
        this.backcolor = "#ffd5c0";
        this._rect.fill(this.backcolor);
    }
    pressedoutState(): void {
        // this.backcolor = "#c7ffc0";
        // this._rect.fill(this.backcolor);
        
    }
    moveState(): void {
        // this.backcolor = "#ffe5dc"; // subtle move indication
        // this._rect.fill(this.backcolor);
        // this.label = "try again"
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent){
            console.log(keyEvent.key);
        }
    }   
}

export {Button}