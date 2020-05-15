import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 's-box',
  styleUrl: 's-box.css',
  shadow: true,
})
export class SBox implements ComponentInterface {

  @Prop() values: number[] | string;
  @Prop() scaleMinValue: number;
  @Prop() scaleMaxValue: number;

  render() {
    let values: number[] = [];
    if (Array.isArray(this.values)) {
      values = this.values;
    } else if (typeof this.values === 'string') {
      values = JSON.parse(this.values);
    }

    const sortedData = values.sort(d3.ascending);
    const q1 = d3.quantile(sortedData, .25);
    const median = d3.quantile(sortedData, .5);
    const q3 = d3.quantile(sortedData, .75);
    const minValue = Math.min(...sortedData);
    const maxValue = Math.max(...sortedData);

    const scaleMinValue = (this.scaleMinValue === undefined) ? minValue : this.scaleMinValue;
    const scaleMaxValue = (this.scaleMaxValue === undefined) ? maxValue : this.scaleMaxValue;

    const scale = d3.scaleLinear()
      .domain([scaleMinValue, scaleMaxValue])
      .range([0, 100]);

    return (
      <Host>
        <svg viewBox="0 0 100 10">
          <line
            id="min-line"
            x1={scale(minValue)}
            y1="0"
            x2={scale(minValue)}
            y2="10"
            stroke="black" />
          <line
            id="min-q1-line"
            x1={scale(minValue)}
            y1="5"
            x2={scale(q1)}
            y2="5"
            stroke="black" />
          <rect
            id="box"
            x={scale(q1)}
            y="0"
            width={scale(q3) - scale(q1)}
            height="10"
            stroke="black"
            fill="azure" />
          <line
            id="median-line"
            x1={scale(median)}
            y1="0"
            x2={scale(median)}
            y2="10"
            stroke="black" />
          <line
            id="q1-max-line"
            x1={scale(q3)}
            y1="5"
            x2={scale(maxValue)}
            y2="5"
            stroke="black" />
          <line
            id="max-line"
            x1={scale(maxValue)}
            y1="0"
            x2={scale(maxValue)}
            y2="10"
            stroke="black" />
          <title>{
            'min: ' + minValue + '\n' +
            '25%: ' + q1 + '\n' +
            'median: ' + median + '\n' +
            '75%: ' + q3 + '\n' +
            'max: ' + maxValue
          }</title>
        </svg>
      </Host>
    );
  }

}
