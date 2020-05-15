/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SBar {
        "firstSegmentMaxValue": number;
        "firstSegmentMinValue": number;
        "secondSegmentMaxValue": number;
        "thirdSegmentMaxValue": number;
        "value": number;
    }
}
declare global {
    interface HTMLSBarElement extends Components.SBar, HTMLStencilElement {
    }
    var HTMLSBarElement: {
        prototype: HTMLSBarElement;
        new (): HTMLSBarElement;
    };
    interface HTMLElementTagNameMap {
        "s-bar": HTMLSBarElement;
    }
}
declare namespace LocalJSX {
    interface SBar {
        "firstSegmentMaxValue"?: number;
        "firstSegmentMinValue"?: number;
        "secondSegmentMaxValue"?: number;
        "thirdSegmentMaxValue"?: number;
        "value"?: number;
    }
    interface IntrinsicElements {
        "s-bar": SBar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "s-bar": LocalJSX.SBar & JSXBase.HTMLAttributes<HTMLSBarElement>;
        }
    }
}
