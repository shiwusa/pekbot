import {WHICH_PARROT} from "../Pek/constant";

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

export default class ReplierClass {
    onWhichParrot(username) {
        const variant = random(0, 7);
        return `@${username} ` + WHICH_PARROT[variant];
    }
}
