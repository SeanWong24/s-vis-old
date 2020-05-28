# s-parallel-sets



<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute                          | Description | Type                       | Default                |
| ------------------------------ | ---------------------------------- | ----------- | -------------------------- | ---------------------- |
| `axisBoxFill`                  | `axis-box-fill`                    |             | `string`                   | `'rgb(100,100,100)'`   |
| `axisBoxWidth`                 | `axis-box-width`                   |             | `number`                   | `15`                   |
| `axisStrokeWidth`              | `axis-stroke-width`                |             | `number`                   | `2`                    |
| `axisTextColor`                | `axis-text-color`                  |             | `string`                   | `'rgb(0,0,0)'`         |
| `colorScheme`                  | --                                 |             | `string[]`                 | `[...d3.schemeAccent]` |
| `data`                         | --                                 |             | `ParallelSetsDataRecord[]` | `[]`                   |
| `dimensions`                   | --                                 |             | `string[]`                 | `undefined`            |
| `maxSegmentLimit`              | `max-segment-limit`                |             | `number`                   | `10`                   |
| `maxSegmentMarginRatioAllowed` | `max-segment-margin-ratio-allowed` |             | `number`                   | `.1`                   |
| `mergedSegmentMaxRatio`        | `merged-segment-max-ratio`         |             | `number`                   | `1`                    |
| `mergedSegmentName`            | `merged-segment-name`              |             | `string`                   | `'*Other*'`            |
| `minimumRatioToShowAxisText`   | `minimum-ratio-to-show-axis-text`  |             | `number`                   | `0`                    |
| `ribbonHighlightOpacity`       | `ribbon-highlight-opacity`         |             | `number`                   | `.8`                   |
| `ribbonOpacity`                | `ribbon-opacity`                   |             | `number`                   | `.5`                   |
| `sideMargin`                   | `side-margin`                      |             | `number`                   | `2`                    |


## Events

| Event              | Description | Type                                  |
| ------------------ | ----------- | ------------------------------------- |
| `axisSegmentClick` |             | `CustomEvent<ParallelSetsDataNode[]>` |
| `ribbonClick`      |             | `CustomEvent<ParallelSetsDataNode>`   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
