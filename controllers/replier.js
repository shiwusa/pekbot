import {WHICH_PARROT} from "../Pek/constant.js";
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

class ReplierClass {
    onWhichParrot(username) {
        const variantNumber = random(0, 7);
        const variant = WHICH_PARROT[variantNumber];
        return {
            text: `@${username} ` + variant.text,
            img: variant.img
        }
    }
}

export default new ReplierClass();