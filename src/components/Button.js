import {Container, Graphics, Text} from 'pixi.js';
import Pokeball from "./Pokeball";

export default class Button extends Container {

    constructor(onPress) {
        super();
        this.name = 'button';

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
        console.log('button show');
        this.visible = true;
    }

    hide() {
        console.log('button end');
        this.visible = false;
    }
}