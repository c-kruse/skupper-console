export enum MetricsLabels {
  TrafficSent = 'transmitted',
  TrafficReceived = 'received',
  ClientErrorRDistributionSeriesAxisYLabel = 'Error distribution',
  ErrorLabel = 'errors',
  ErrorRateSeriesAxisYLabel = 'error rate',
  FilterAllSourceProcesses = 'All processes',
  FilterAllDestinationProcesses = 'All clients or servers',
  FilterProtocolsDefault = 'All protocols',
  NoMetricFoundTitleMessage = 'No metrics found',
  NoMetricFoundDescriptionMessage = 'No metrics are currently accessible or meet the filter criteria. Please modify all filters and the time window, then attempt the operation again.',
  LatencyMetricAvg = 'Avg latency',
  LatencyMetric50quantile = '50th percentile',
  LatencyMetric90quantile = '90th percentile',
  LatencyMetric99quantile = '99th percentile',
  RequestTotalTitle = 'Total requests',
  RequestRateAvgTitle = 'Avg. request rate',
  ByteRateAvgCol = 'avg',
  ByteRateTotalCol = 'total',
  ByteRateCurrentCol = 'current',
  ByteRateMaxCol = 'max',
  RefetchData = 'Data update',
  DataTransferTitle = 'Data transfer',
  LatencyTitle = 'Http latency',
  RequestsTitle = 'Http requests',
  HttpStatus = 'Http response status'
}
