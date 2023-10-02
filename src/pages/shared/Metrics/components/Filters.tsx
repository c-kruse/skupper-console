import { FC, useMemo, useState, MouseEvent, ChangeEvent, memo, useCallback } from 'react';

import { Toolbar, ToolbarContent, ToolbarItem, ToolbarGroup, Card } from '@patternfly/react-core';
import { Select, SelectOption, SelectOptionObject } from '@patternfly/react-core/deprecated';
import { OutlinedClockIcon } from '@patternfly/react-icons';
import { useQuery } from '@tanstack/react-query';

import { IntervalTimeProp } from '@API/Prometheus.interfaces';
import { RESTApi } from '@API/REST.api';
import { AvailableProtocols } from '@API/REST.enum';
import { CollectorsResponse } from '@API/REST.interfaces';
import { siteNameAndIdSeparator, timeIntervalMap } from '@config/prometheus';

import UpdateMetricsButton from './UpdateMetricsButton';
import { filterOptionsDefault, filterToggleDefault } from '../Metrics.constants';
import { MetricsLabels } from '../Metrics.enum';
import { MetricFiltersProps, SelectedFilters } from '../Metrics.interfaces';

const MetricFilters: FC<MetricFiltersProps> = memo(
  ({
    sourceSites,
    destSites,
    sourceProcesses,
    processesConnected,
    availableProtocols = [AvailableProtocols.Http, AvailableProtocols.Http2, AvailableProtocols.Tcp],
    customFilterOptions,
    initialFilters,
    refreshDataInterval,
    startTime = 0, // indicates the beginning point for computing the duration of the time interval.
    isRefetching = false,
    onRefetch = () => null,
    onSelectFilters
  }) => {
    const filterOptions = { ...filterOptionsDefault, ...customFilterOptions };
    const { data: collector } = useQuery(['app-getPrometheusURL'], () => RESTApi.fetchCollectors()) as {
      data: CollectorsResponse;
    };
    // filter the display interval items that are less than startTime
    // ie: if the flow collector restart we don't want start from the beginning
    const timeIntervalMapWindow = useMemo(
      () =>
        Object.values(timeIntervalMap).filter(
          ({ seconds }) =>
            new Date().getTime() - seconds * 1000 > Math.max((collector?.startTime || 0) / 1000, startTime / 1000)
        ),
      [collector?.startTime, startTime]
    );

    const [selectedFilterIsOpen, setSelectedFilterIsOpen] = useState(filterToggleDefault);
    const [selectedFilter, setSelectedFilter] = useState<SelectedFilters>({ ...initialFilters, refreshDataInterval });

    // Handler for toggling the open and closed states of a Select element.
    function handleToggleSourceSiteMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, sourceSite: isOpen });
    }

    function handleToggleDestSiteMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, destSite: isOpen });
    }

    function handleToggleSourceProcessMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, sourceProcess: isOpen });
    }

    function handleToggleDestinationProcessMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, destProcess: isOpen });
    }

    function handleToggleProtocol(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, protocol: isOpen });
    }

    function handleToggleTimeIntervalMenu(isOpen: boolean) {
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, timeInterval: isOpen });
    }

    function handleSelectSiteSource(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const sourceSite = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, sourceSite, sourceProcess: undefined });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, sourceSite: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, sourceSite });
      }
    }

    function handleSelectSource(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const sourceProcess = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, sourceProcess });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, sourceProcess: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, sourceProcess });
      }
    }

    function handleSelectSiteDest(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const destSite = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, destSite, destProcess: undefined });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, destSite: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, destSite });
      }
    }

    function handleSelectDestination(_: MouseEvent | ChangeEvent, selection?: SelectOptionObject) {
      const destProcess = selection as string | undefined;

      setSelectedFilter({ ...selectedFilter, destProcess });
      setSelectedFilterIsOpen({ ...selectedFilterIsOpen, destProcess: false });

      if (onSelectFilters) {
        onSelectFilters({ ...selectedFilter, destProcess });
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

    const handleSelectDisplayInterval = useCallback(
      (selection: string | undefined) => {
        if (onSelectFilters) {
          onSelectFilters(selectedFilter, selection);
        }
      },
      [onSelectFilters, selectedFilter]
    );

    //  source site select options
    const optionsSourceSitesWithDefault = useMemo(
      () =>
        (sourceSites || []).map(({ name }, index) => (
          <SelectOption key={index} value={name}>
            {name.split(siteNameAndIdSeparator)[0]}
          </SelectOption>
        )),
      [sourceSites]
    );

    // dest sites select options
    const optionsDestinationSitesWithDefault = useMemo(
      () =>
        (destSites || []).map(({ name }, index) => (
          <SelectOption key={index} value={name}>
            {name.split(siteNameAndIdSeparator)[0]}
          </SelectOption>
        )),
      [destSites]
    );

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
        timeIntervalMapWindow.map(({ key, label }, index) => (
          <SelectOption key={index} value={key}>
            {label}
          </SelectOption>
        )),
      [timeIntervalMapWindow]
    );

    return (
      <Card>
        <Toolbar>
          <ToolbarContent>
            <ToolbarGroup>
              <ToolbarItem>
                {!!optionsSourceSitesWithDefault.length && !filterOptions.sourceSites.hide && (
                  <Select
                    selections={
                      selectedFilter.sourceSite && selectedFilter.sourceSite.split('|').length > 1
                        ? undefined
                        : selectedFilter.sourceSite
                    }
                    placeholderText={filterOptions.sourceSites.placeholder}
                    isOpen={selectedFilterIsOpen.sourceSite}
                    isDisabled={filterOptions.sourceSites.disabled}
                    onSelect={handleSelectSiteSource}
                    onClear={!filterOptions.sourceSites.disabled ? handleSelectSiteSource : undefined}
                    onToggle={(_, isOpen) => handleToggleSourceSiteMenu(isOpen)}
                  >
                    {optionsSourceSitesWithDefault}
                  </Select>
                )}

                {!filterOptions.sourceProcesses.hide && (
                  <Select
                    selections={
                      selectedFilter.sourceProcess && selectedFilter.sourceProcess.split('|').length > 1
                        ? undefined
                        : selectedFilter.sourceProcess
                    }
                    placeholderText={filterOptions.sourceProcesses.placeholder}
                    isOpen={selectedFilterIsOpen.sourceProcess}
                    isDisabled={filterOptions.sourceProcesses.disabled}
                    onSelect={handleSelectSource}
                    onClear={!filterOptions.sourceProcesses.disabled ? handleSelectSource : undefined}
                    onToggle={(_, isOpen) => handleToggleSourceProcessMenu(isOpen)}
                  >
                    {optionsProcessSourcesWithDefault}
                  </Select>
                )}
              </ToolbarItem>

              <ToolbarItem>
                {!!optionsDestinationSitesWithDefault.length && !filterOptions.destSites.hide && (
                  <Select
                    selections={
                      selectedFilter.destSite && selectedFilter.destSite.split('|').length > 1
                        ? undefined
                        : selectedFilter.destSite
                    }
                    placeholderText={filterOptions.destSites.placeholder}
                    isOpen={selectedFilterIsOpen.destSite}
                    isDisabled={filterOptions.destSites.disabled}
                    onSelect={handleSelectSiteDest}
                    onClear={!filterOptions.destSites.disabled ? handleSelectSiteDest : undefined}
                    onToggle={(_, isOpen) => handleToggleDestSiteMenu(isOpen)}
                  >
                    {optionsDestinationSitesWithDefault}
                  </Select>
                )}

                {!filterOptions.destinationProcesses.hide && (
                  <Select
                    selections={
                      selectedFilter.destProcess && selectedFilter.destProcess.split('|').length > 1
                        ? undefined
                        : selectedFilter.destProcess
                    }
                    placeholderText={filterOptions.destinationProcesses.placeholder}
                    isDisabled={filterOptions.destinationProcesses.disabled}
                    isOpen={selectedFilterIsOpen.destProcess}
                    onSelect={handleSelectDestination}
                    onClear={!filterOptions.destinationProcesses.disabled ? handleSelectDestination : undefined}
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
            <ToolbarGroup align={{ default: 'alignRight' }}>
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
            </ToolbarGroup>

            <ToolbarGroup variant={'filter-group'}>
              <ToolbarItem>
                <UpdateMetricsButton
                  isLoading={isRefetching}
                  onRefreshIntervalSelected={handleSelectDisplayInterval}
                  onClick={onRefetch}
                />
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </Card>
    );
  }
);

export default MetricFilters;
