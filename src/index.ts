import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { Checkbox } from "./widgets/checkbox";
import { CheckboxList } from "./widgets/checkboxGroup";
import { RadioGroup } from "./widgets/radioButtonGroup";
import { ScrollBar } from "./widgets/scrollbar";
import { ProgressBar } from "./widgets/progressBar";
import { MoodSlider } from "./widgets/custom";


let w = new Window(window.innerHeight-10,'100%');

//label
let lbl1= new Heading(w);
lbl1.text = "Maddy's Toolkit Example";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

// //button
// let btn = new Button(w);
// let amount = 0;
// btn.tabindex = 2;
// btn.fontSize = 14;
// btn.label = "Click Me";
// btn.onClick(() => {
//     amount++;
//     lbl1.text = 'Clicked! x' + amount;
//     btn.label = "Click Again!"
// });
// btn.move(50, 70)

const checkGroup = new CheckboxList(w, ["Apples", "Bananas", "Cherries"]);
checkGroup.move(150, 150);

checkGroup.onChange = (label, checked, allValues) => {
    console.log(`Checkbox "${label}" was ${checked ? "checked" : "unchecked"}`);
    console.log("Current values:", allValues);
  };

//radio button
const radios = new RadioGroup(w, ["Small", "Medium", "Large"]);
radios.move(300, 150);
radios.onChange = (index, label) => {
    console.log(`Selected radio button: "${label}" at index ${index}`);
  };

//scrollbar
const scroll = new ScrollBar(w);
scroll.scrollBarHeight = 300;
scroll.move(100, 50); // moves the whole bar + thumb

scroll.onThumbMove((e) => {
  console.log("Thumb position:", scroll.thumbPosition);
});

//progress bar
const progress = new ProgressBar(w);
progress.progressWidth = 300;
progress.move(100, 400);

progress.onIncrement = (val) => {
  console.log("Progress is now:", val);
};

progress.onStateChange = (state) => {
  console.log("State changed:", state);
};

progress.increment(75); // logs progress and state

//mood
const mood = new MoodSlider(w);
mood.move(100, 300);

mood.onMoodChange = (emoji, index) => {
  console.log(`You feel: ${emoji}`);
};
