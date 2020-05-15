/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SBar {
        "exceedMaxLineStroke": string;
        "fill": string;
        "maxValue": number;
        "minValue": number;
        "orientation": "horizontal" | "vertical";
        "secondLevelFill": string;
        "secondLevelMaxValue": number;
        "thirdLevelFill": string;
        "thirdLevelMaxValue": number;
        "value": number;
    }
    interface SBox {
        "boxFill": string;
        "boxStroke": string;
        "connectionLineStroke": string;
        "maxLineStroke": string;
        "medianLineStroke": string;
        "minLineStroke": string;
        "orientation": "horizontal" | "vertical";
        "scaleMaxValue": number;
        "scaleMinValue": number;
        "values": number[] | string;
    }
}
declare global {
    interface HTMLSBarElement extends Components.SBar, HTMLStencilElement {
    }
    var HTMLSBarElement: {
        prototype: HTMLSBarElement;
        new (): HTMLSBarElement;
    };
    interface HTMLSBoxElement extends Components.SBox, HTMLStencilElement {
    }
    var HTMLSBoxElement: {
        prototype: HTMLSBoxElement;
        new (): HTMLSBoxElement;
    };
    interface HTMLElementTagNameMap {
        "s-bar": HTMLSBarElement;
        "s-box": HTMLSBoxElement;
    }
}
declare namespace LocalJSX {
    interface SBar {
        "exceedMaxLineStroke"?: string;
        "fill"?: string;
        "maxValue"?: number;
        "minValue"?: number;
        "orientation"?: "horizontal" | "vertical";
        "secondLevelFill"?: string;
        "secondLevelMaxValue"?: number;
        "thirdLevelFill"?: string;
        "thirdLevelMaxValue"?: number;
        "value"?: number;
    }
    interface SBox {
        "boxFill"?: string;
        "boxStroke"?: string;
        "connectionLineStroke"?: string;
        "maxLineStroke"?: string;
        "medianLineStroke"?: string;
        "minLineStroke"?: string;
        "orientation"?: "horizontal" | "vertical";
        "scaleMaxValue"?: number;
        "scaleMinValue"?: number;
        "values"?: number[] | string;
    }
    interface IntrinsicElements {
        "s-bar": SBar;
        "s-box": SBox;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "s-bar": LocalJSX.SBar & JSXBase.HTMLAttributes<HTMLSBarElement>;
            "s-box": LocalJSX.SBox & JSXBase.HTMLAttributes<HTMLSBoxElement>;
        }
    }
}
