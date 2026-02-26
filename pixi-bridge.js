import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4";

if (typeof window !== "undefined") {
    window.PIXI = PIXI;
}

export const newApplication = () => new PIXI.Application();
export const newContainer = () => new PIXI.Container();
export const textureFrom = (source) => PIXI.Texture.from(source);
export const spriteFrom = (source) => PIXI.Sprite.from(source);
export const newBlurFilter = (blur) => new PIXI.BlurFilter(blur);
export const newColorMatrixFilter = () => new PIXI.ColorMatrixFilter();

export const newFilter = (vertexSrc, fragmentSrc) => {
    try {
        return new PIXI.Filter({ vertex: vertexSrc, fragment: fragmentSrc });
    } catch (_) {
        return new PIXI.Filter(vertexSrc, fragmentSrc);
    }
};

export const loadAssets = (source) => PIXI.Assets.load(source);

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
