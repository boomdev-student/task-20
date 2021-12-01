import * as PIXI from "pixi.js";
import gsap from 'gsap';
import {PixiPlugin} from "gsap/PixiPlugin";
import Application from "./core/Application";

gsap.registerPlugin(PixiPlugin);

if (process.env.NODE_ENV === "development") {
    // required for pixi dev tools to work
    window.PIXI = PIXI;
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new Application();

    // Used for automated testing only
    if (process.env.NODE_ENV === "development") {
        window.__PIXI_APP = app;
    }
});
