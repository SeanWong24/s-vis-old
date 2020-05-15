import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 's-bar',
  styleUrl: 's-bar.css',
  shadow: true,
})
export class SBar implements ComponentInterface {

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
        <svg viewBox="0 0 100 10">
          <title>{this.value}</title>
          {
            firstSegmentScale &&
            <rect
              id="first-segment"
              x="0"
              y="0"
              width={firstSegmentScale(this.value)}
              height="10"
              fill="rgb(200,200,200)"></rect>
          }
          {
            secondSegmentScale &&
            <rect
              id="second-segment"
              x="0"
              y="1.5"
              width={secondSegmentScale(this.value)}
              height="7"
              fill="rgb(100,100,100)"></rect>
          }
          {
            thirdSegmentScale &&
            <rect
              id="third-segment"
              x="0"
              y="3"
              width={thirdSegmentScale(this.value)}
              height="4"
              fill="rgb(0,0,0)"></rect>
          }
          {
            this.value > this.thirdSegmentMaxValue &&
            <line
              id="exceed-max-line"
              x1="0"
              y1="5"
              x2="100"
              y2="5"
              stroke="white"
            ></line>
          }
        </svg>
      </Host>
    );
  }

}
