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
  @Prop() firstSegmentMinValue: number;
  @Prop() firstSegmentMaxValue: number;
  @Prop() secondSegmentMaxValue: number;
  @Prop() thirdSegmentMaxValue: number;

  render() {
    let firstSegmentScale: d3.ScaleLinear<number, number>;
    let secondSegmentScale: d3.ScaleLinear<number, number>;
    let thirdSegmentScale: d3.ScaleLinear<number, number>;
    if (this.firstSegmentMinValue !== undefined && this.thirdSegmentMaxValue !== undefined) {
      firstSegmentScale = d3.scaleLinear()
        .domain([this.firstSegmentMinValue, this.firstSegmentMaxValue])
        .range([0, 100])
        .clamp(true);
      secondSegmentScale = d3.scaleLinear()
        .domain([this.firstSegmentMaxValue, this.secondSegmentMaxValue])
        .range([0, 100])
        .clamp(true);
      thirdSegmentScale = d3.scaleLinear()
        .domain([this.secondSegmentMaxValue, this.thirdSegmentMaxValue])
        .range([0, 100])
        .clamp(true);
    }

    return (
      <Host>
        <svg id="main-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <title>{this.value}</title>
          {
            this.orientation === 'horizontal' ?
              <g>
                {
                  firstSegmentScale &&
                  <rect
                    id="first-segment"
                    x="0"
                    y="0"
                    width={firstSegmentScale(this.value)}
                    height="100"
                    fill="rgb(200,200,200)"></rect>
                }
                {
                  secondSegmentScale &&
                  <rect
                    id="second-segment"
                    x="0"
                    y="15"
                    width={secondSegmentScale(this.value)}
                    height="70"
                    fill="rgb(100,100,100)"></rect>
                }
                {
                  thirdSegmentScale &&
                  <rect
                    id="third-segment"
                    x="0"
                    y="30"
                    width={thirdSegmentScale(this.value)}
                    height="40"
                    fill="rgb(0,0,0)"></rect>
                }
                {
                  this.value > this.thirdSegmentMaxValue &&
                  <line
                    id="exceed-max-line"
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="white"
                  ></line>
                }
              </g> :
              <g>
                {
                  firstSegmentScale &&
                  <rect
                    id="first-segment"
                    x="0"
                    y="0"
                    width="100"
                    height={firstSegmentScale(this.value)}
                    fill="rgb(200,200,200)"></rect>
                }
                {
                  secondSegmentScale &&
                  <rect
                    id="second-segment"
                    x="15"
                    y="0"
                    width="70"
                    height={secondSegmentScale(this.value)}
                    fill="rgb(100,100,100)"></rect>
                }
                {
                  thirdSegmentScale &&
                  <rect
                    id="third-segment"
                    x="30"
                    y="0"
                    width="40"
                    height={thirdSegmentScale(this.value)}
                    fill="rgb(0,0,0)"></rect>
                }
                {
                  this.value > this.thirdSegmentMaxValue &&
                  <line
                    id="exceed-max-line"
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="white"
                  ></line>
                }
              </g>
          }
        </svg>
      </Host>
    );
  }

}
