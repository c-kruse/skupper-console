export enum MetricsLabels {
  TrafficSent = 'transmitted',
  TrafficReceived = 'received',
  RequestsPerSecondsSeriesAxisYLabel = 'Request rate',
  ErrorRateSeriesAxisYLabel = 'Error rate',
  FilterAllSourceProcesses = 'All processes',
  FilterAllDestinationProcesses = 'All clients and servers',
  FilterProtocolsDefault = 'All Protocols',
  NoMetricFoundMessage = 'No metrics found. Try adjusting your filter options',
  LatencyMetricAvg = 'Avg latency',
  LatencyMetric50quantile = '50th percentile',
  LatencyMetric90quantile = '90th percentile',
  LatencyMetric99quantile = '99th percentile',
  ByteRateAvgCol = 'avg',
  ByteRateTotalCol = 'total',
  ByteRateCurrentCol = 'current',
  ByteRateMaxCol = 'max',
  MetricFilters = 'Filters',
  MetricDisplayFilters = 'Display',
  RefetchData = 'Data update'
}
