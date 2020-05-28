import { Component, ComponentInterface, Host, h, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import { ParallelSetsDataRecord, compareStrings, ParallelSetsDataNode } from './utils';
import * as d3 from 'd3';

@Component({
  tag: 's-parallel-sets',
  styleUrl: 's-parallel-sets.css',
  shadow: true,
})
export class SParallelSets implements ComponentInterface {

  private dimensionNameList: string[];

  @Element() hostElement: HTMLElement;

  @State() hostElementBoundingClientRect: DOMRect;

  @Prop() data: ParallelSetsDataRecord[] = [];
  @Prop() dimensions: string[];
  @Prop() maxSegmentLimit: number = 10;
  @Prop() mergedSegmentName: string = '*Other*';
  @Prop() mergedSegmentMaxRatio: number = 1;
  @Prop() maxSegmentMarginRatioAllowed: number = .1;
  @Prop() colorScheme: string[] = [...d3.schemeAccent];
  @Prop() axisStrokeWidth: number = 2;
  @Prop() axisBoxWidth: number = 15;
  @Prop() axisBoxFill: string = 'rgb(100,100,100)';
  @Prop() axisTextColor: string = 'rgb(0,0,0)';
  @Prop() minimumRatioToShowAxisText: number = 0;
  @Prop() ribbonOpacity: number = .5;
  @Prop() ribbonHighlightOpacity: number = .8;
  @Prop() sideMargin: number = 2;

  @Event() ribbonClick: EventEmitter<ParallelSetsDataNode>;
  @Event() axisSegmentClick: EventEmitter<ParallelSetsDataNode[]>;

  connectedCallback() {
    const resizeObserver = new ResizeObserver(entryList => {
      for (const entry of entryList) {
        if (entry.target === this.hostElement) {
          this.hostElementBoundingClientRect = entry.target.getBoundingClientRect();
        }
      }
    });
    resizeObserver.observe(this.hostElement);
  }

  render() {
    this.dimensionNameList = (this.dimensions?.length > 0) ?
      this.dimensions : Object.keys((this.data || [{}])[0]);

    const dimensionValuesMap = this.generateDimensionValuesMap();
    const dimensionNodeListMap = this.generateDimensionNodeListMap(dimensionValuesMap);
    this.fillDataRecordListForDimensionNodeListMap(
      dimensionValuesMap,
      dimensionNodeListMap
    );
    this.fillSegmentPositions(dimensionNodeListMap, dimensionValuesMap);

    const { width, height } = this.hostElementBoundingClientRect || {};
    const colorScale = d3.scaleOrdinal(this.colorScheme);

    return (
      <Host>
        {
          width && height &&
          <svg id="main-svg" width={width} height={height}>
            {this.renderRibbons(dimensionNodeListMap, width, height, colorScale)}
            {this.renderAxes(dimensionNodeListMap, width, height)}
          </svg>
        }
      </Host>
    );
  }


  private renderAxes(
    dimensionNodeListMap: Map<string, ParallelSetsDataNode[]>,
    width: number,
    height: number
  ) {
    this.hostElement.style.setProperty("--axis-text-font-size", this.axisBoxWidth * .8 + 'px');
    return this.dimensionNameList.map((dimensionName, i) => {
      const nodeList = dimensionNodeListMap.get(dimensionName);
      const currentSegmentNodeListMap = new Map<string | number, ParallelSetsDataNode[]>();
      for (const node of nodeList) {
        const currentSegmentNodeList = currentSegmentNodeListMap.get(node.valueHistory[i]);
        if (currentSegmentNodeList) {
          currentSegmentNodeList.push(node);
        }
        else {
          currentSegmentNodeListMap.set(node.valueHistory[i], [node]);
        }
      }
      const segmentElementList = [...currentSegmentNodeListMap].map(([currentSegmentValue, currentSegmentNodeList]) => {
        const x = this.obtainDimensionPosition(width, this.sideMargin, i);
        const currentSegmentPosition: [number, number] = [
          currentSegmentNodeList[0].adjustedSegmentPosition[0] || currentSegmentNodeList[0].segmentPosition[0],
          currentSegmentNodeList[currentSegmentNodeList.length - 1].adjustedSegmentPosition[1] || currentSegmentNodeList[currentSegmentNodeList.length - 1].segmentPosition[1]
        ];
        const line = <line
          x1={x}
          y1={currentSegmentPosition[0] * height}
          x2={x}
          y2={currentSegmentPosition[1] * height}
          stroke="black"
          stroke-width={this.axisStrokeWidth}
        ></line>;
        const box = <rect
          x={x}
          y={currentSegmentPosition[0] * height}
          width={this.axisBoxWidth}
          height={(currentSegmentPosition[1] - currentSegmentPosition[0]) * height}
          fill={this.axisBoxFill}
          opacity={0}
          onClick={() => this.axisSegmentClick.emit(currentSegmentNodeList)}
        >
          <title>{
            'Dimension: ' + dimensionName + '\n' +
            'Value: ' + currentSegmentValue.toString() + '\n' +
            'Count: ' + d3.sum(currentSegmentNodeList.map(d => d.dataRecordList.length)) + '\n' +
            'Proportion: ' + (d3.sum(currentSegmentNodeList.map(d => d.segmentPosition[1] - d.segmentPosition[0])) / (1 - this.maxSegmentMarginRatioAllowed) * 100).toFixed(2) + '%'
          }</title>
        </rect>;
        const text = (currentSegmentPosition[1] - currentSegmentPosition[0] >= this.minimumRatioToShowAxisText) ?
          <text
            x={x + this.axisBoxWidth / 2}
            y={currentSegmentPosition[0] * height}
            text-anchor="start"
            writing-mode="tb"
            color={this.axisTextColor}
          >{currentSegmentValue}</text> :
          undefined;
        return { line, box, text };
      });
      return <g class="axis">
        <g class="axis-line">{segmentElementList.map(element => element.line)}</g>
        <g class="axis-box">{segmentElementList.map(element => element.box)}</g>
        <g class="axis-text">{segmentElementList.map(element => element.text)}</g>
      </g>;
    });
  }

  private renderRibbons(
    dimensionNodeListMap: Map<string, ParallelSetsDataNode[]>,
    width: number,
    height: number,
    colorScale: d3.ScaleOrdinal<string, string>
  ) {
    this.hostElement.style.setProperty('--ribbon-highlight-opacity', this.ribbonHighlightOpacity.toString());
    return this.dimensionNameList.map((dimensionName, i) => {
      const nodeList = dimensionNodeListMap.get(dimensionName);
      const nextDimensionName = this.dimensionNameList[i + 1];
      const ribbonList = nodeList.map(node => {
        const x = this.obtainDimensionPosition(width, this.sideMargin, i);
        const childX = this.obtainDimensionPosition(width, this.sideMargin, i + 1);
        const childNodeList = (dimensionNodeListMap.get(nextDimensionName) || [])
          // TODO try to use index calculation for the filter
          .filter(d => d.valueHistory.slice(0, node.valueHistory.length).toString() === node.valueHistory.toString());
        let totalPreviousCountRatio = 0;
        return childNodeList.map(childNode => {
          const childCountRatio = (childNode.segmentPosition[1] - childNode.segmentPosition[0]) *
            (node.valueHistory[i] === this.mergedSegmentName ? (1 - node.mergedSegmentAdjustmentRatio) : 1) /
            node.adjustmentRatio;
          const path = <path
            ref={el => d3.select(el).datum(childNode)}
            d={`M${x},${(node.adjustedSegmentPosition[0] + totalPreviousCountRatio) * height} V${(node.adjustedSegmentPosition[0] + (totalPreviousCountRatio += childCountRatio)) * height} L${childX},${(childNode.adjustedSegmentPosition[1] || childNode.segmentPosition[1]) * height} V${(childNode.adjustedSegmentPosition[0] || childNode.segmentPosition[0]) * height} Z`}
            fill={colorScale(node.valueHistory[0].toString())}
            opacity={this.ribbonOpacity}
            onMouseEnter={() => {
              d3.select(this.hostElement.shadowRoot)
                .selectAll('g.ribbons path')
                .classed('ribbon-highlight', (d: ParallelSetsDataNode) => {
                  const minValueHistoryLenght = d3.min([d.valueHistory.length, childNode.valueHistory.length]);
                  if (d.valueHistory.slice(0, minValueHistoryLenght).toString() === childNode.valueHistory.slice(0, minValueHistoryLenght).toString()) {
                    return true;
                  } else {
                    return false;
                  }
                })
            }}
            onMouseLeave={() => {
              d3.select(this.hostElement.shadowRoot)
                .selectAll('.ribbons path')
                .classed('ribbon-highlight', false)
            }}
            onClick={() => this.ribbonClick.emit(childNode)}
          >
            <title>{
              'Dimension: ' + dimensionName + ' -> ' + nextDimensionName + '\n' +
              'Value History: ' + childNode.valueHistory.join(' -> ') + '\n' +
              'Count: ' + childNode.dataRecordList.length + '\n' +
              'Proportion: ' + (childNode.dataRecordList.length / this.data.length * 100).toFixed(2) + '%'
            }</title>
          </path>;
          return path;
        });
      });
      return <g class="ribbons">{ribbonList.flat()}</g>;
    });
  }

  private fillSegmentPositions(
    dimensionNodeListMap: Map<string, ParallelSetsDataNode[]>,
    dimensionValuesMap: Map<string, (string | number)[]>
  ) {
    for (let i = 0; i < this.dimensionNameList.length; i++) {
      const dimensionName = this.dimensionNameList[i];
      const nodeList = dimensionNodeListMap.get(dimensionName);
      let { mergedSegmentAdjustmentOffset, mergedSegmentAdjustmentOffsetRatio } =
        this.obtainMergedSegmentAdjustmentOffsetAndItsRatio(
          dimensionValuesMap,
          dimensionName,
          nodeList,
          i
        );
      this.fillSegmentPositionsForSingleDimension(
        mergedSegmentAdjustmentOffset,
        mergedSegmentAdjustmentOffsetRatio,
        i,
        dimensionName,
        nodeList,
        dimensionValuesMap
      );
    }
  }

  private fillSegmentPositionsForSingleDimension(
    mergedSegmentAdjustmentOffset: number,
    mergedSegmentAdjustmentOffsetRatio: number,
    dimensionIndex: number,
    dimensionName: string,
    nodeList: ParallelSetsDataNode[],
    dimensionValuesMap: Map<string, (string | number)[]>
  ) {
    const adjustedTotalRecordCount = this.data.length - mergedSegmentAdjustmentOffset;
    let totalMarginRatio = 0;
    for (let j = 0; j < nodeList.length; j++) {
      const node = nodeList[j];
      node.mergedSegmentAdjustmentRatio = mergedSegmentAdjustmentOffsetRatio;
      node.adjustmentRatio = adjustedTotalRecordCount / this.data.length;

      const obtainDataRecordCountAdjustmentRatio = (dataNode: ParallelSetsDataNode) => (dataNode.valueHistory[dimensionIndex] === this.mergedSegmentName) ? (1 - mergedSegmentAdjustmentOffsetRatio) : 1;
      const totalPreviousCount = d3.sum(nodeList.slice(0, j).map(d => d.dataRecordList.length));
      const totalPreviousCountRatio = totalPreviousCount / this.data.length * (1 - this.maxSegmentMarginRatioAllowed);
      const totalCurrentCountRatio = (totalPreviousCount + node.dataRecordList.length) / this.data.length * (1 - this.maxSegmentMarginRatioAllowed);
      const adjustedTotalPreviousCount = d3.sum(nodeList.slice(0, j).map(d => d.dataRecordList.length * obtainDataRecordCountAdjustmentRatio(d)));
      const adjustedTotalPreviousCountRatio = adjustedTotalPreviousCount / adjustedTotalRecordCount * (1 - this.maxSegmentMarginRatioAllowed);
      const adjustedTotalCurrentCountRatio = (adjustedTotalPreviousCount + node.dataRecordList.length * obtainDataRecordCountAdjustmentRatio(node)) / adjustedTotalRecordCount * (1 - this.maxSegmentMarginRatioAllowed);

      const segmentMarginRatio = this.maxSegmentMarginRatioAllowed / dimensionValuesMap.get(dimensionName).length / 2;
      if (nodeList[j].valueHistory[dimensionIndex] !== nodeList[j - 1]?.valueHistory[dimensionIndex]) {
        totalMarginRatio += segmentMarginRatio;
      }

      if (mergedSegmentAdjustmentOffset) {
        node.adjustedSegmentPosition = [
          adjustedTotalPreviousCountRatio + totalMarginRatio,
          adjustedTotalCurrentCountRatio + totalMarginRatio
        ];
      }
      node.segmentPosition = [
        totalPreviousCountRatio + totalMarginRatio,
        totalCurrentCountRatio + totalMarginRatio
      ];

      if (nodeList[j].valueHistory[dimensionIndex] !== nodeList[j + 1]?.valueHistory[dimensionIndex]) {
        totalMarginRatio += segmentMarginRatio;
      }
    }
  }

  private obtainMergedSegmentAdjustmentOffsetAndItsRatio(
    dimensionValuesMap: Map<string, (string | number)[]>,
    dimensionName: string,
    nodeList: ParallelSetsDataNode[],
    dimensionIndex: number
  ) {
    let mergedSegmentAdjustmentOffset = 0;
    let mergedSegmentAdjustmentOffsetRatio = 0;
    if (dimensionValuesMap.get(dimensionName).find(value => value === this.mergedSegmentName)) {
      let mergedSegmentRecordCount = d3.sum(
        nodeList.filter(node =>
          node.valueHistory[dimensionIndex] === this.mergedSegmentName
        )
          .map(node => node.dataRecordList.length)
      );
      if (mergedSegmentRecordCount / this.data.length > this.mergedSegmentMaxRatio) {
        mergedSegmentAdjustmentOffset = (mergedSegmentRecordCount - (this.data.length * this.mergedSegmentMaxRatio)) / (1 - this.mergedSegmentMaxRatio);
        mergedSegmentAdjustmentOffsetRatio = mergedSegmentAdjustmentOffset / mergedSegmentRecordCount;
      }
    }
    return { mergedSegmentAdjustmentOffset, mergedSegmentAdjustmentOffsetRatio };
  }

  private fillDataRecordListForDimensionNodeListMap(
    dimensionValuesMap: Map<string, (string | number)[]>,
    dimensionNodeListMap: Map<string, ParallelSetsDataNode[]>
  ) {
    const nodeList = [...dimensionNodeListMap.values()].flatMap(d => d);
    for (const dataRecord of this.data) {
      for (const node of nodeList) {
        let areAllPropertyMatching = true;
        for (let i = 0; i < node.valueHistory.length; i++) {
          const currentDimensionName = this.dimensionNameList[i];
          const currentValue = dataRecord[currentDimensionName];
          if (
            (node.valueHistory[i] !== this.mergedSegmentName && node.valueHistory[i] !== currentValue) ||
            (node.valueHistory[i] === this.mergedSegmentName && dimensionValuesMap.get(currentDimensionName).find(d => d === currentValue) !== undefined)
          ) {
            areAllPropertyMatching = false;
            continue;
          }
        }
        if (areAllPropertyMatching) {
          node.dataRecordList.push(dataRecord);
        }
      }
    }
  }

  private generateDimensionNodeListMap(dimensionValuesMap: Map<string, (string | number)[]>) {
    const dimensionNodeListMap = new Map<string, ParallelSetsDataNode[]>();
    for (let i = 0; i < this.dimensionNameList.length; i++) {
      const currentDimensionName = this.dimensionNameList[i];
      const previousDimensionName = (i > 0) ? this.dimensionNameList[i - 1] : '';
      const valueHistoryList: ParallelSetsDataNode[] = [];
      const currentDimensionValueList = dimensionValuesMap.get(currentDimensionName);
      const previousDimensionValueHistoryList = dimensionNodeListMap.get(previousDimensionName);
      for (const currentDimensionValue of currentDimensionValueList) {
        if (previousDimensionValueHistoryList) {
          for (const previousDimensionValueHistory of previousDimensionValueHistoryList) {
            valueHistoryList.push(Object.assign(new ParallelSetsDataNode, {
              valueHistory: [...previousDimensionValueHistory.valueHistory, currentDimensionValue]
            }));
          }
        }
        else {
          valueHistoryList.push(Object.assign(new ParallelSetsDataNode, {
            valueHistory: [currentDimensionValue]
          }));
        }
      }
      dimensionNodeListMap.set(currentDimensionName, valueHistoryList);
    }
    return dimensionNodeListMap;
  }

  private generateDimensionValuesMap() {
    const dimensionValuesMapEntryList = this.dimensionNameList.map(dimensionName => {
      const currentDimensionValueList = [...new Set(this.data.map(dataRecord => dataRecord[dimensionName]))]
        .sort((a, b) => {
          switch (typeof a) {
            case 'number':
              return a - (b as number);
            case 'string':
              return compareStrings(a, b as string);
          }
        });
      return [dimensionName, currentDimensionValueList] as [string, (string | number)[]];
    });
    for (const dimensionValuesMapEntry of dimensionValuesMapEntryList) {
      if (dimensionValuesMapEntry[1].length > this.maxSegmentLimit) {
        dimensionValuesMapEntry[1].splice(this.maxSegmentLimit);
        dimensionValuesMapEntry[1].push(this.mergedSegmentName);
      }
    }
    const dimensionValuesMap = new Map(dimensionValuesMapEntryList);
    return dimensionValuesMap;
  }

  private obtainDimensionPosition(width: number, margin: number, index: number) {
    return (width - margin * 2 - this.axisBoxWidth) / (this.dimensionNameList.length - 1) * index + margin;
  }

}
