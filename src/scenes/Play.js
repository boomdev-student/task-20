import Footer from "../components/Footer";
import Pokeball from "../components/Pokeball";
import Button from "../components/Button";
import Scene from "./Scene";

export default class Play extends Scene {
    async onCreated() {
        const footer = new Footer();
        footer.x = -window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);


        const pokeball = new Pokeball();
        pokeball.x = -pokeball.width / 2;
        pokeball.y = -pokeball.height / 2;
        this.addChild(pokeball);

        const button = new Button(() => pokeball.open());
        button.x = -button.width / 2;
        button.y = pokeball.height / 2 - button.height;
        this.addChild(button);

        pokeball.on(Pokeball.events.OPEN_START, () => button.hide());
        pokeball.on(Pokeball.events.CLOSE_END, () => button.show());
    }

    /**
     * Hook called by the application when the browser window is resized.
     * Use this to re-arrange the game elements according to the window size
     *
     * @param  {Number} width  Window width
     * @param  {Number} height Window height
     */
    onResize(width, height) {
        // eslint-disable-line no-unused-vars
    }
}
