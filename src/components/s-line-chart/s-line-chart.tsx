import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import * as d3 from 'd3';

export declare type NodeSymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

@Component({
  tag: 's-line-chart',
  styleUrl: 's-line-chart.css',
  shadow: true,
})
export class SLineChart {

  @Element() hostElement: HTMLElement;

  @State() hostElementBoundingClientRect: DOMRect;

  @Prop() data: [number, number][][] = [];
  @Prop() lineColorScheme: string[] = [...d3.schemeAccent];
  @Prop() lineStrokeWidth: number = 2;
  @Prop() nodeColorScheme: string[] = [...d3.schemeAccent];
  @Prop() nodeSize: number = 5;
  @Prop() nodeSymbol: NodeSymbolType | NodeSymbolType[] = 'circle';
  @Prop() minX: number;
  @Prop() maxX: number;
  @Prop() minY: number;
  @Prop() maxY: number;

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
    const margin = {
      left: 50,
      top: 10,
      right: 10,
      bottom: 20
    }
    const { width, height } = this.hostElementBoundingClientRect || {};
    const flatData = this.data.flat();
    const flatXValueList = flatData.map(coordinate => coordinate[0]);
    const flatYValueList = flatData.map(coordinate => coordinate[1]);
    const minX = this.minX !== undefined ? this.minX : d3.min(flatXValueList);
    const maxX = this.maxX !== undefined ? this.maxX : d3.max(flatXValueList);
    const minY = this.minY !== undefined ? this.minY : d3.min(flatYValueList);
    const maxY = this.maxY !== undefined ? this.maxY : d3.max(flatYValueList);
    const scaleX = d3.scaleLinear().domain([minX, maxX]).range([margin.left, width - margin.right]);
    const scaleY = d3.scaleLinear().domain([minY, maxY]).range([height - margin.bottom, margin.top]);

    const yAxis = d3.axisLeft(scaleY);
    const xAxis = d3.axisBottom(scaleX);

    return (
      <Host>
        {
          width && height &&
          <svg
            width={width}
            height={height}
          >
            <g
              id="y-axis"
              ref={el => d3.select(el).call(yAxis)}
              height={height - margin.top - margin.bottom}
              transform={`translate(${margin.left}, 0)`}
            ></g>
            <g
              id="x-axis"
              ref={el => d3.select(el).call(xAxis)}
              width={width - margin.left - margin.right}
              transform={`translate(0, ${height - margin.bottom})`}
            ></g>
            {
              this.data.map((group, i) => {
                let d = '';
                const nodeList = [];
                const nodeSymbolName = Array.isArray(this.nodeSymbol) ? this.nodeSymbol[i] : this.nodeSymbol;
                const symbol = d3.symbol().type(this.obtainSymbol(nodeSymbolName)).size(1)();
                for (const coordinate of group) {
                  const [x, y] = coordinate;
                  const scaledX = scaleX(x);
                  const scaledY = scaleY(y);
                  const node = <path
                    class="node"
                    transform={`translate(${scaledX},${scaledY}) scale(${this.nodeSize})`}
                    d={symbol}
                    fill={this.nodeColorScheme[i]}
                  >
                    <title>{`(${x}, ${y})`}</title>
                  </path>;
                  nodeList.push(node);
                  if (d) {
                    d += `L${scaledX},${scaledY} `;
                  } else {
                    d += `M${scaledX},${scaledY} `;
                  }
                }
                return (
                  <g class="line-container">
                    <path
                      class="line"
                      d={d}
                      stroke={this.lineColorScheme[i]}
                      stroke-width={this.lineStrokeWidth}
                      fill="none"
                    ></path>
                    <g>{nodeList}</g>
                  </g>
                );
              })
            }
          </svg>
        }
      </Host>
    );
  }

  private obtainSymbol(symbolName: NodeSymbolType) {
    switch (symbolName) {
      case 'circle':
        return d3.symbolCircle;
      case 'cross':
        return d3.symbolCross;
      case 'diamond':
        return d3.symbolDiamond;
      case 'square':
        return d3.symbolSquare;
      case 'star':
        return d3.symbolStar;
      case 'triangle':
        return d3.symbolTriangle;
      case 'wye':
        return d3.symbolWye;
    }
  }

}
