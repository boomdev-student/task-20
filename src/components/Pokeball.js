import {Container, Sprite} from 'pixi.js';
import gsap from 'gsap';
import POKEMONS from '../assets/pokemons.json';

export default class Pokeball extends Container {
    static events = {
        OPEN_END: 'open_end',
        OPEN_START: 'open_start',
        CLOSE_END: 'close_end',
        CLOSE_START: 'close_start',
    };

    constructor() {
        super();
        this.name = 'pokeball';

        this.sortableChildren = true;

        this._drawBall();
        this._addPokemonName();

        // indicates whether if the ball is opened or not
        this.isOpened = false;

        this.on(Pokeball.events.OPEN_START, () => this._openBall());
        this.on(Pokeball.events.CLOSE_START, () => this._closeBall());
    }

    /**
     * Open the ball and start shuffling the names of the pokemons
     *
     * Emits: Pokeball.events.OPEN_START
     */
    open() {
        this.emit(Pokeball.events.OPEN_START);

        this._shuffle().then(() => {
            this.close();
        });
    }

    /**
     * Close the ball.
     *
     * Emits: Pokeball.events.CLOSE_START
     */
    close() {
        this.emit(Pokeball.events.CLOSE_START);
    }

    /**
     * Position both parts of the ball in their initial position;
     */
    _drawBall() {
        this.top = Sprite.from('ballTop');

        // add 20 to offset the visual difference, caused by the pokeball button
        this.top.y = -this.top.height / 2 + 20;
        this.top.zIndex = 1;
        this.addChild(this.top);

        this.bottom = Sprite.from('ballBottom');
        this.bottom.y = this.bottom.height / 2;
        this.bottom.zIndex = 1;
        this.addChild(this.bottom);
    }

    /**
     * Animate both parts of the ball to make room for pokemon's name
     *
     * Emits: Pokeball.events.OPEN_END
     */
    _openBall() {
        gsap.timeline({delay: 0,})
            .to(this.top, {y: this.top.y + (this.pokemonName.height) * -1, ease: 'bounce.out'}, 1)
            .to(this.bottom, {y: this.bottom.y + (this.pokemonName.height), ease: 'bounce.out'}, 1)
            .then(() => {
                this.isOpened = true;
                this.emit(Pokeball.events.OPEN_END);
            });
    }

    /**
     * Animate both parts of the ball to their initial position.
     *
     * Emits: Pokeball.EVENTS.CLOSE_END
     */
    _closeBall() {
        gsap.timeline({delay: 0,})
            .to(this.top, {y: -this.top.height / 2 + 20, ease: 'bounce.in'}, 1)
            .to(this.bottom, {y: this.bottom.height / 2, ease: 'bounce.in'}, 1)
            .then(() => {
                this.isOpened = false;
                this.emit(Pokeball.events.CLOSE_END);
            });
    }

    /**
     * Update pokemonName's property text with a random name from the list.
     */
    _setRandomText() {
        this.pokemonName.text = POKEMONS[Math.floor(Math.random() * POKEMONS.length)].toUpperCase();
    }

    /**
     * Creates PIXI.Text used to display Pokemons name,
     * also attaches two listeners which define whether the text should be shown or not.
     *
     * @private
     */
    _addPokemonName() {
        this.pokemonName = new PIXI.Text('a', {
            fontFamily: 'Arial Black',
            fontWeight: 'bold',
            fontSize: 90,
            lineHeight: 70,
            fill: 0xFFFFFF,
            align: 'center',
        });
        this.pokemonName.alpha = 0;
        this.pokemonName.anchor.x = 0.5;
        this.pokemonName.x = this.top.width / 2;
        this.pokemonName.y = this.bottom.y - 35;

        this.addChild(this.pokemonName);
        this.pokemonName.zIndex = 0;

        this.on(Pokeball.events.OPEN_START, () => {
            gsap.to(this.pokemonName, {
                alpha: 1,
                delay: 1,
                duration: 1
            });
        });

        this.on(Pokeball.events.CLOSE_START, () => {
            gsap.to(this.pokemonName, {
                alpha: 0,
                delay: 1,
                duration: 0.5,
            });
        });
    }

    /**
     * @returns {Promise}
     * @private
     */
    _shuffle() {
        let prev = 0;

        const dummy = {value: 0};
        const steps = gsap.to(dummy, {
            duration: 1,
            ease: "steps(100)",
            value: 100,
            paused: true,
            onUpdate: () => {
                if (dummy.value !== prev) this._setRandomText();
                prev = dummy.value;
            },
        });
        return gsap.to(steps, {duration: 4, progress: 1, ease: "circ.out"});
    }

}