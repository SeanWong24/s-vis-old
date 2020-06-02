/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ParallelSetsDataNode, ParallelSetsDataRecord } from "./components/s-parallel-sets/utils";
export namespace Components {
    interface SBar {
        "exceedMaxLineStroke": string;
        "fill": string;
        "maxValue": number;
        "minValue": number;
        "orientation": 'horizontal' | 'vertical';
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
        "orientation": 'horizontal' | 'vertical';
        "scaleMaxValue": number;
        "scaleMinValue": number;
        "values": number[] | string;
    }
    interface SParallelSets {
        "axisBoxFill": string;
        "axisBoxWidth": number;
        "axisHeaderTextColor": string;
        "axisHeaderTextSize": number;
        "axisHeaderTextWeight": string;
        "axisSegmentTextColor": string;
        "axisStrokeWidth": number;
        "colorScheme": string[];
        "data": ParallelSetsDataRecord[];
        "dimensions": string[];
        "maxSegmentLimit": number;
        "maxSegmentMarginRatioAllowed": number;
        "mergedSegmentMaxRatio": number;
        "mergedSegmentName": string;
        "minimumRatioToShowAxisText": number;
        "ribbonHighlightOpacity": number;
        "ribbonOpacity": number;
        "sideMargin": number;
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
    interface HTMLSParallelSetsElement extends Components.SParallelSets, HTMLStencilElement {
    }
    var HTMLSParallelSetsElement: {
        prototype: HTMLSParallelSetsElement;
        new (): HTMLSParallelSetsElement;
    };
    interface HTMLElementTagNameMap {
        "s-bar": HTMLSBarElement;
        "s-box": HTMLSBoxElement;
        "s-parallel-sets": HTMLSParallelSetsElement;
    }
}
declare namespace LocalJSX {
    interface SBar {
        "exceedMaxLineStroke"?: string;
        "fill"?: string;
        "maxValue"?: number;
        "minValue"?: number;
        "orientation"?: 'horizontal' | 'vertical';
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
        "orientation"?: 'horizontal' | 'vertical';
        "scaleMaxValue"?: number;
        "scaleMinValue"?: number;
        "values"?: number[] | string;
    }
    interface SParallelSets {
        "axisBoxFill"?: string;
        "axisBoxWidth"?: number;
        "axisHeaderTextColor"?: string;
        "axisHeaderTextSize"?: number;
        "axisHeaderTextWeight"?: string;
        "axisSegmentTextColor"?: string;
        "axisStrokeWidth"?: number;
        "colorScheme"?: string[];
        "data"?: ParallelSetsDataRecord[];
        "dimensions"?: string[];
        "maxSegmentLimit"?: number;
        "maxSegmentMarginRatioAllowed"?: number;
        "mergedSegmentMaxRatio"?: number;
        "mergedSegmentName"?: string;
        "minimumRatioToShowAxisText"?: number;
        "onAxisSegmentClick"?: (event: CustomEvent<ParallelSetsDataNode[]>) => void;
        "onRibbonClick"?: (event: CustomEvent<ParallelSetsDataNode>) => void;
        "ribbonHighlightOpacity"?: number;
        "ribbonOpacity"?: number;
        "sideMargin"?: number;
    }
    interface IntrinsicElements {
        "s-bar": SBar;
        "s-box": SBox;
        "s-parallel-sets": SParallelSets;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "s-bar": LocalJSX.SBar & JSXBase.HTMLAttributes<HTMLSBarElement>;
            "s-box": LocalJSX.SBox & JSXBase.HTMLAttributes<HTMLSBoxElement>;
            "s-parallel-sets": LocalJSX.SParallelSets & JSXBase.HTMLAttributes<HTMLSParallelSetsElement>;
        }
    }
}
