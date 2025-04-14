import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { Checkbox } from "./widgets/checkbox";
import { CheckboxList } from "./widgets/checkboxGroup";



let w = new Window(window.innerHeight-10,'100%');

//label
let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

//button
let btn = new Button(w);
let amount = 0;
btn.tabindex = 2;
btn.fontSize = 14;
btn.label = "Click Me";
btn.onClick(() => {
    amount++;
    lbl1.text = 'Clicked! x' + amount;
    btn.label = "Click Again!"
});
btn.move(12, 50)

//checkbox
// let chk1 = new Checkbox(w);
// chk1.label = "test";
// chk1.move(10, 100);

// let chk2 = new Checkbox(w);
// chk2.label = "test2";
// chk2.move(10, 140);


const checkGroup = new CheckboxList(w, ["Apples", "Bananas", "Cherries"]);
checkGroup.move(10, 150); // ← move the whole group on screen



