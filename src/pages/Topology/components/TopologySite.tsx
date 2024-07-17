import { ComponentType, FC, useCallback } from 'react';

import { Divider, Stack, StackItem } from '@patternfly/react-core';
import { useNavigate } from 'react-router-dom';

import { GraphReactAdaptorProps } from '@core/components/Graph/Graph.interfaces';
import GraphReactAdaptor from '@core/components/Graph/ReactAdaptor';
import { SitesRoutesPaths } from '@pages/Sites/Sites.enum';

import TopologyToolbar from './TopologyToolbar';
import useTopologySiteData from './useTopologySiteData';
import useTopologyState from './useTopologyState';
import { TopologySiteController } from '../services/topologySiteController';
import {
  displayOptionsForSites,
  SHOW_DATA_LINKS,
  SHOW_LINK_BYTERATE,
  SHOW_LINK_BYTES,
  SHOW_LINK_LATENCY,
  SHOW_INBOUND_METRICS,
  SHOW_ROUTER_LINKS,
  SHOW_LINK_METRIC_VALUE,
  SHOW_DEPLOYMENTS,
  SHOW_LINK_PROTOCOL,
  SHOW_LINK_METRIC_DISTRIBUTION
} from '../Topology.constants';
import { TopologyLabels } from '../Topology.enum';

const TopologySite: FC<{ ids?: string[]; GraphComponent?: ComponentType<GraphReactAdaptorProps> }> = function ({
  ids,
  GraphComponent = GraphReactAdaptor
}) {
  const navigate = useNavigate();

  const {
    idsSelected,
    searchText,
    displayOptionsSelected,
    handleSearchText,

    handleDisplaySelected
  } = useTopologyState({
    ids,
    initDisplayOptionsEnabled: [SHOW_ROUTER_LINKS, SHOW_LINK_METRIC_DISTRIBUTION],
    displayOptionsEnabledKey: 'display-site-options'
  });

  const { sites, routerLinks, sitesPairs, metrics } = useTopologySiteData({
    idsSelected: undefined,
    showDataLink: displayOptionsSelected.includes(SHOW_DATA_LINKS),
    showBytes: displayOptionsSelected.includes(SHOW_LINK_BYTES),
    showByteRate: displayOptionsSelected.includes(SHOW_LINK_BYTERATE),
    showLatency: displayOptionsSelected.includes(SHOW_LINK_LATENCY)
  });

  const handleShowDetails = useCallback(
    (siteId: string) => {
      const site = sites?.find(({ identity }) => identity === siteId);
      navigate(`${SitesRoutesPaths.Sites}/${site?.name}@${siteId}`);
    },
    [navigate, sites]
  );

  const { nodes, edges, nodeIdSelected, nodeIdsToHighLight } = TopologySiteController.siteDataTransformer({
    idsSelected,
    searchText,
    sites,
    sitesPairs,
    routerLinks,
    metrics,
    options: {
      showLinkBytes: displayOptionsSelected.includes(SHOW_LINK_BYTES),
      showLinkLatency: displayOptionsSelected.includes(SHOW_LINK_LATENCY),
      showLinkByteRate: displayOptionsSelected.includes(SHOW_LINK_BYTERATE),
      showLinkProtocol: displayOptionsSelected.includes(SHOW_LINK_PROTOCOL),
      showInboundMetrics: displayOptionsSelected.includes(SHOW_INBOUND_METRICS),
      showMetricDistribution: displayOptionsSelected.includes(SHOW_LINK_METRIC_DISTRIBUTION),
      showMetricValue: displayOptionsSelected.includes(SHOW_LINK_METRIC_VALUE),
      showDeployments: displayOptionsSelected.includes(SHOW_DEPLOYMENTS) // a deployment is a group of processes in the same site that have the same function
    }
  });

  return (
    <Stack>
      <StackItem>
        <TopologyToolbar
          displayOptions={displayOptionsForSites}
          onDisplayOptionSelected={handleDisplaySelected}
          defaultDisplayOptionsSelected={displayOptionsSelected}
          resourcePlaceholder={TopologyLabels.DisplaySitesDefaultLabel}
          onResourceSelected={handleSearchText}
        />
        <Divider />
      </StackItem>

      <StackItem isFilled>
        <GraphComponent
          nodes={nodes}
          edges={edges}
          itemSelected={nodeIdSelected}
          itemsToHighlight={nodeIdsToHighLight}
          onClickNode={handleShowDetails}
        />
      </StackItem>
    </Stack>
  );
};

export default TopologySite;
