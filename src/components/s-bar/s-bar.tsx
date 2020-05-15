import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 's-bar',
  styleUrl: 's-bar.css',
  shadow: true,
})
export class SBar implements ComponentInterface {

  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() value: number;
  @Prop() minValue: number;
  @Prop() maxValue: number;
  @Prop() secondLevelMaxValue: number;
  @Prop() thirdLevelMaxValue: number;

  render() {
    let firstLevelScale: d3.ScaleLinear<number, number>;
    let secondLevelScale: d3.ScaleLinear<number, number>;
    let thirdLevelScale: d3.ScaleLinear<number, number>;
    if (this.minValue !== undefined) {
      if (this.maxValue !== undefined) {
        firstLevelScale = d3.scaleLinear()
          .domain([this.minValue, this.maxValue])
          .range([0, 100])
          .clamp(true);
      }
      if (this.secondLevelMaxValue !== undefined) {
        secondLevelScale = d3.scaleLinear()
          .domain([this.maxValue, this.secondLevelMaxValue])
          .range([0, 100])
          .clamp(true);
      }
      if (this.thirdLevelMaxValue !== undefined) {
        thirdLevelScale = d3.scaleLinear()
          .domain([this.secondLevelMaxValue, this.thirdLevelMaxValue])
          .range([0, 100])
          .clamp(true);
      }
    }

    return (
      <Host>
        <svg id="main-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <title>{this.value}</title>
          {
            this.orientation === 'horizontal' ?
              <g>
                {
                  firstLevelScale &&
                  <rect
                    id="first-segment"
                    x="0"
                    y="0"
                    width={firstLevelScale(this.value)}
                    height="100"
                    fill="rgb(200,200,200)"></rect>
                }
                {
                  secondLevelScale &&
                  <rect
                    id="second-segment"
                    x="0"
                    y="15"
                    width={secondLevelScale(this.value)}
                    height="70"
                    fill="rgb(100,100,100)"></rect>
                }
                {
                  thirdLevelScale &&
                  <rect
                    id="third-segment"
                    x="0"
                    y="30"
                    width={thirdLevelScale(this.value)}
                    height="40"
                    fill="rgb(0,0,0)"></rect>
                }
                {
                  (
                    (this.value > this.thirdLevelMaxValue) ||
                    (!thirdLevelScale && this.value > this.secondLevelMaxValue) ||
                    (!thirdLevelScale && !secondLevelScale && this.value > this.maxValue)
                  ) &&
                  <line
                    id="exceed-max-line"
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="white"
                    stroke-width="5"
                  ></line>
                }
              </g> :
              <g>
                {
                  firstLevelScale &&
                  <rect
                    id="first-segment"
                    x="0"
                    y="0"
                    width="100"
                    height={firstLevelScale(this.value)}
                    fill="rgb(200,200,200)"></rect>
                }
                {
                  secondLevelScale &&
                  <rect
                    id="second-segment"
                    x="15"
                    y="0"
                    width="70"
                    height={secondLevelScale(this.value)}
                    fill="rgb(100,100,100)"></rect>
                }
                {
                  thirdLevelScale &&
                  <rect
                    id="third-segment"
                    x="30"
                    y="0"
                    width="40"
                    height={thirdLevelScale(this.value)}
                    fill="rgb(0,0,0)"></rect>
                }
                {
                  (
                    (this.value > this.thirdLevelMaxValue) ||
                    (!thirdLevelScale && this.value > this.secondLevelMaxValue) ||
                    (!thirdLevelScale && !secondLevelScale && this.value > this.maxValue)
                  ) &&
                  <line
                    id="exceed-max-line"
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="white"
                    stroke-width="5"
                  ></line>
                }
              </g>
          }
        </svg>
      </Host>
    );
  }

}
