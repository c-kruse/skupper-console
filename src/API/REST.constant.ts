import { BASE_URL, BASE_URL_COLLECTOR } from 'config';

// APIs PATHS
export const DATA_URL = `${BASE_URL}/DATA`;

// SITES
const API_VERSION = '/api/v1alpha1';
const API_URL = `${BASE_URL_COLLECTOR}${API_VERSION}`;

export const SITES_PATH = `${API_URL}/sites/`;

export const getSitePATH = (id: string) => `${SITES_PATH}${id}`;
export const getProcessesBySitePATH = (id: string) => `${SITES_PATH}${id}/processes`;
export const getRoutersBySitePATH = (id: string) => `${SITES_PATH}${id}/routers`;
export const getLinksBySitePATH = (id: string) => `${SITES_PATH}${id}/links`;
export const getHostsBySitePATH = (id: string) => `${SITES_PATH}${id}/hosts`;

// HOSTS
export const HOSTS_PATH = `${API_URL}/hosts/`;

export const getHostPATH = (id: string) => `${HOSTS_PATH}${id}`;

// ROUTERS
export const ROUTERS_PATH = `${API_URL}/routers/`;

export const getRouterPATH = (id: string) => `${ROUTERS_PATH}${id}`;

// LINKS
export const LINKS_PATH = `${API_URL}/links/`;

export const getLinkPATH = (id: string) => `${LINKS_PATH}${id}`;

// CONNECTORS
export const CONNECTORS_PATH = `${API_URL}/connectors/`;

// LISTENERS
export const LISTENERS_PATH = `${API_URL}/listeners/`;
export const getListenerPATH = (id: string) => `${LISTENERS_PATH}${id}`;

// PROCESSES
export const PROCESSES_PATH = `${API_URL}/processes/`;

export const geProcessPATH = (id: string) => `${PROCESSES_PATH}${id}`;
export const getFlowsByProcessPATH = (id: string) => `${PROCESSES_PATH}${id}/flows`;
export const getConnectorByProcessPATH = (id: string) => `${PROCESSES_PATH}${id}/connector`;

// PROCESS_GROUPS
export const PROCESS_GROUPS_PATH = `${API_URL}/processgroups/`;

export const getProcessGroupPATH = (id: string) => `${PROCESS_GROUPS_PATH}${id}`;
export const getProcessesByProcessGroupPATH = (id: string) =>
    `${PROCESS_GROUPS_PATH}${id}/processes`;

// FLOW AGGREGATES
const FLOW_AGGREGATES_PATH = `${API_URL}/flowaggregates/`;

export const FLOW_AGGREGATES_SITE_PAIRS_PATH = `${FLOW_AGGREGATES_PATH}sitepairs`;
export const FLOW_AGGREGATES_PROCESS_GROUP_PAIRS_PATH = `${FLOW_AGGREGATES_PATH}processgrouppairs`;
export const FLOW_AGGREGATES_PROCESS_PAIRS_PATH = `${FLOW_AGGREGATES_PATH}processpairs`;

// ADDRESSES
export const ADDRESSES_PATH = `${API_URL}/addresses/`;

export const getFlowsPairsByAddressPATH = (id: string) => `${ADDRESSES_PATH}${id}/flowpairs`;
export const getProcessesByAddressPATH = (id: string) => `${ADDRESSES_PATH}${id}/processes`;

// FLOWPAIRS
export const FLOWPAIRS_PATH = `${API_URL}/flowpairs/`;
