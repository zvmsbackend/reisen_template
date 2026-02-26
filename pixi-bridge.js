import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";

if (typeof window !== "undefined") {
    window.PIXI = PIXI;
}

const makeCompatApplication = () => {
    const holder = {
        _app: null,
        stage: null,
        renderer: null,
        ticker: null,
        view: null,
        canvas: null,
        init(options = {}) {
            const app = new PIXI.Application({
                view: options.canvas,
                width: options.width,
                height: options.height,
                antialias: options.antialias,
                backgroundAlpha: options.backgroundAlpha,
                resolution: options.resolution,
                autoDensity: options.autoDensity,
            });
            this._app = app;
            this.stage = app.stage;
            this.renderer = app.renderer;
            this.ticker = app.ticker;
            this.view = app.view;
            this.canvas = app.view;
            return Promise.resolve();
        },
        destroy(removeView = true) {
            if (this._app) {
                this._app.destroy(removeView, { children: true, texture: true, baseTexture: true });
                this._app = null;
                this.stage = null;
                this.renderer = null;
                this.ticker = null;
                this.view = null;
                this.canvas = null;
            }
        },
    };
    return holder;
};

export const newApplication = () => makeCompatApplication();
export const newContainer = () => new PIXI.Container();
export const textureFrom = (source) => PIXI.Texture.from(source);
export const spriteFrom = (source) => PIXI.Sprite.from(source);
export const newBlurFilter = (blur) => {
    const BlurFilterClass = PIXI.BlurFilter ?? PIXI.filters?.BlurFilter;
    return new BlurFilterClass(blur);
};
export const newColorMatrixFilter = () => {
    const ColorMatrixFilterClass = PIXI.ColorMatrixFilter ?? PIXI.filters?.ColorMatrixFilter;
    return new ColorMatrixFilterClass();
};

export const newFilter = (vertexSrc, fragmentSrc) => {
    try {
        return new PIXI.Filter({ vertex: vertexSrc, fragment: fragmentSrc });
    } catch (_) {
        return new PIXI.Filter(vertexSrc, fragmentSrc);
    }
};

export const loadTexturePromise = (source) =>
    new Promise((resolve, reject) => {
        const loader = new PIXI.Loader();
        loader.add(source, source).load((_, resources) => {
            const texture = resources[source]?.texture;
            if (texture) {
                resolve(texture);
            } else {
                reject(new Error(`Failed to load texture: ${source}`));
            }
        });
        loader.onError.once((err) => reject(err));
    });

export const loadLive2dModel = async (source) => {
    const model = await Live2DModel.from(source);
    return model;
};

export const live2dMotion = async (model, group, index) => {
    if (!model || typeof model.motion !== "function") {
        return false;
    }
    try {
        const ok = await model.motion(group, index);
        return !!ok;
    } catch (_) {
        return false;
    }
};

export const live2dExpression = async (model, id) => {
    if (!model || typeof model.expression !== "function") {
        return false;
    }
    try {
        const ok = await model.expression(id);
        return !!ok;
    } catch (_) {
        return false;
    }
};
