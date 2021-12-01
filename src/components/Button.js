import {Container, Graphics, Text} from 'pixi.js-legacy';
import Pokeball from "./Pokeball";
import gsap from 'gsap';

export default class Button extends Container {

    constructor(onPress) {
        super();
        this.name = 'button';

        this.alpha = 1;

        this.interactive = true;
        this.buttonMode = true;

        this._drawButton();

        this.on('click', onPress);
        this.on(Pokeball.events.OPEN_START, () => this.hide());
        this.on(Pokeball.events.CLOSE_END, () => this.show());
    }

    /**
     * Draw the button:
     * - Rectangle
     * - Text
     */
    _drawButton() {
        const background = new Graphics();
        background.beginFill(0xe8343a);
        background.drawRect(0, 0, 180, 60);
        background.endFill();
        this.addChild(background);

        const label = new Text('THROW BALL', {
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xffffff,
        });
        label.anchor.set(0.5, 0.5)
        label.x = background.width / 2;
        label.y = background.height / 2;
        this.addChild(label);
    }

    show() {
        gsap.to(this, {
            alpha: 1,
            delay: 0,
            duration: 0.5
        });
    }

    hide() {
        gsap.to(this, {
            alpha: 0,
            delay: 0,
            duration: 0.5
        });
    }
}