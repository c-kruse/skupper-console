import { FC, useCallback, useMemo, useState, MouseEvent, ChangeEvent, memo } from 'react';

import { Button, Toolbar, ToolbarContent, ToolbarItem, ToolbarGroup, Tooltip } from '@patternfly/react-core';
import { Select, SelectOption, SelectOptionObject } from '@patternfly/react-core/deprecated';
import { OutlinedClockIcon, SyncIcon } from '@patternfly/react-icons';
import { useQuery } from '@tanstack/react-query';

import { IntervalTimeProp } from '@API/Prometheus.interfaces';
import { RESTApi } from '@API/REST.api';
import { AvailableProtocols } from '@API/REST.enum';
import { timeIntervalMap } from '@config/prometheus';

import { displayIntervalMap, filterOptionsDefault, filterToggleDefault } from './Metrics.constants';
import { MetricsLabels } from './Metrics.enum';
import { MetricFilterProps, FilterProps } from './Metrics.interfaces';

const MetricFilters: FC<MetricFilterProps> = memo(
  ({
    sourceProcesses,
    processesConnected,
    availableProtocols = [AvailableProtocols.Http, AvailableProtocols.Http2, AvailableProtocols.Tcp],
    customFilterOptions,
    initialFilters,
    startTime = 0, // indicates the beginning point for computing the duration of the time interval.
    isRefetching = false,
    forceDisableRefetchData = false,
    onRefetch,
    onSelectFilters
  }) => {
    const filterOptions = { ...filterOptionsDefault, ...customFilterOptions };

    const { data: collector } = useQuery(['app-getPrometheusURL'], () => RESTApi.fetchCollectors());
    // filter the display interval items that are less than startTime
    // ie: if the flow collector restart we don't want start from the beginning
    const timeIntervalMapWindow = useMemo(() => {
      if (collector?.startTime) {
        return Object.values(timeIntervalMap).filter(
          ({ seconds }) =>
            new Date().getTime() - seconds * 1000 > Math.max(collector?.startTime / 1000, startTime / 1000)
        );
      }

      return Object.values(timeIntervalMap);
    }, [collector?.startTime, startTime]);

    const [selectedFilterIsOpen, setSelectedFilterIsOpen] = useState(filterToggleDefault);
    const [selectedFilter, setSelectedFilter] = useState<FilterProps>(initialFilters);

    const handleRefetchMetrics = useCallback(() => {
      if (onRefetch) {
        onRefetch();
      }
    }, [onRefetch]);

    // Handler for toggling the open and closed states of a Select element.
    function handleToggleSourceProcessMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, processIdSource: isOpen });
    }

    function handleToggleDestinationProcessMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, processIdDest: isOpen });
    }

    function handleToggleProtocol(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, protocol: isOpen });
    }

    function handleToggleTimeIntervalMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, timeInterval: isOpen });
    }

    function handleToggleDisplayInterval(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, displayInterval: isOpen });
    }

    function handleSelectSource(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const processIdSource = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, processIdSource });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, processIdSource: false });

      if (onSelectFilters) {
        // sourceID is mandatory. if the element selected is a placeholder use  the default value passed to the filter
        onSelectFilters({ ...selectedFilter, processIdSource: processIdSource || initialFilters.processIdSource });
      }
    }

    function handleSelectDestination(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const processIdDest = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, processIdDest });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, processIdDest: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, processIdDest });
      }
    }

    function handleSelectProtocol(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const protocol = selection as AvailableProtocols | undefined;

      setSelectedFilter({ ...selectedFilter, protocol });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, protocol: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, protocol });
      }
    }

    function handleSelectTimeIntervalMenu(_: MouseEvent | ChangeEvent, selection: SelectOptionObject) {
      const timeIntervalKey = selection as IntervalTimeProp['key'];

      setSelectedFilter({ ...selectedFilter, timeInterval: timeIntervalMap[timeIntervalKey] });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, timeInterval: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, timeInterval: timeIntervalMap[timeIntervalKey] });
      }
    }

    function handleSelectDisplayInterval(_: MouseEvent | ChangeEvent, selection: SelectOptionObject) {
      const keySelected = selection as string;
      const displayInterval = displayIntervalMap.find(({ key }) => key === keySelected)?.key;

      setSelectedFilter({ ...selectedFilter, displayInterval });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, displayInterval: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, displayInterval });
      }
    }

    // process sources select options
    const optionsProcessSourcesWithDefault = useMemo(
      () =>
        (sourceProcesses || []).map(({ destinationName }, index) => (
          <SelectOption key={index} value={destinationName} />
        )),
      [sourceProcesses]
    );

    // process connected select options
    const optionsProcessConnectedWithDefault = useMemo(
      () =>
        (processesConnected || []).map(({ destinationName }, index) => (
          <SelectOption key={index} value={destinationName} />
        )),
      [processesConnected]
    );

    // protocol select options
    const optionsProtocolsWithDefault = useMemo(
      () => availableProtocols.map((option, index) => <SelectOption key={index} value={option} />),
      [availableProtocols]
    );

    // time interval select options
    const optionsTimeIntervalWithDefault = useMemo(
      () =>
        timeIntervalMapWindow.map((interval, index) => (
          <SelectOption key={index} value={interval.key}>
            {interval.label}
          </SelectOption>
        )),
      [timeIntervalMapWindow]
    );

    // displayInterval select options
    const optionsDisplayIntervalWithDefault = useMemo(
      () =>
        displayIntervalMap.map(({ label, key }, index) => (
          <SelectOption key={index} value={key}>
            {label}
          </SelectOption>
        )),
      []
    );

    return (
      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup>
            <ToolbarItem>
              <Select
                selections={selectedFilter.processIdSource}
                placeholderText={filterOptions.sourceProcesses.placeholder}
                isOpen={selectedFilterIsOpen.processIdSource}
                isDisabled={filterOptions.sourceProcesses.disabled}
                onSelect={handleSelectSource}
                onClear={
                  optionsProcessSourcesWithDefault.length > 1 && !filterOptions.sourceProcesses.disabled
                    ? handleSelectSource
                    : undefined
                }
                onToggle={(_, isOpen) => handleToggleSourceProcessMenu(isOpen)}
              >
                {optionsProcessSourcesWithDefault}
              </Select>
            </ToolbarItem>

            <ToolbarItem>
              {!filterOptions.destinationProcesses.hide && (
                <Select
                  selections={selectedFilter.processIdDest}
                  placeholderText={filterOptions.destinationProcesses.placeholder}
                  isDisabled={filterOptions.destinationProcesses.disabled}
                  isOpen={selectedFilterIsOpen.processIdDest}
                  onSelect={handleSelectDestination}
                  onClear={
                    optionsProcessConnectedWithDefault.length > 1 && !filterOptions.destinationProcesses.disabled
                      ? handleSelectDestination
                      : undefined
                  }
                  onToggle={(_, isOpen) => handleToggleDestinationProcessMenu(isOpen)}
                >
                  {optionsProcessConnectedWithDefault}
                </Select>
              )}
            </ToolbarItem>

            <ToolbarItem>
              <Select
                selections={selectedFilter.protocol}
                placeholderText={MetricsLabels.FilterProtocolsDefault}
                isOpen={selectedFilterIsOpen.protocol}
                isDisabled={filterOptions.protocols.disabled}
                onSelect={handleSelectProtocol}
                onClear={
                  optionsProtocolsWithDefault.length > 1 && !filterOptions.protocols.disabled
                    ? handleSelectProtocol
                    : undefined
                }
                onToggle={(_, isOpen) => handleToggleProtocol(isOpen)}
              >
                {optionsProtocolsWithDefault}
              </Select>
            </ToolbarItem>
          </ToolbarGroup>

          {/* Display filters */}
          <ToolbarGroup variant={'filter-group'} align={{ default: 'alignRight' }}>
            <ToolbarItem>
              <Select
                selections={selectedFilter.timeInterval?.label}
                isOpen={selectedFilterIsOpen.timeInterval}
                isDisabled={filterOptions.timeIntervals.disabled}
                onSelect={handleSelectTimeIntervalMenu}
                toggleIcon={<OutlinedClockIcon />}
                onToggle={(_, isOpen) => handleToggleTimeIntervalMenu(isOpen)}
              >
                {optionsTimeIntervalWithDefault}
              </Select>
            </ToolbarItem>

            <ToolbarItem>
              <Select
                selections={selectedFilter.displayInterval}
                isOpen={selectedFilterIsOpen.displayInterval}
                onSelect={handleSelectDisplayInterval}
                onToggle={(_, isOpen) => handleToggleDisplayInterval(isOpen)}
              >
                {optionsDisplayIntervalWithDefault}
              </Select>
            </ToolbarItem>

            <ToolbarItem>
              <Tooltip content={MetricsLabels.RefetchData}>
                <Button
                  variant="primary"
                  isLoading={isRefetching}
                  isDisabled={
                    isRefetching ||
                    forceDisableRefetchData ||
                    (!!selectedFilter.displayInterval && selectedFilter.displayInterval !== displayIntervalMap[0].key)
                  }
                  onClick={handleRefetchMetrics}
                  icon={<SyncIcon />}
                />
              </Tooltip>
            </ToolbarItem>
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>
    );
  }
);

export default MetricFilters;
