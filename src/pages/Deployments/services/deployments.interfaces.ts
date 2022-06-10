import {
    DataServicesResponse,
    DataSiteResponse,
    DeploymentTopologyResponse,
    ServiceConnection,
    ServiceRequestReceivedResponse,
} from 'API/REST.interfaces';

type Service = DataServicesResponse;

export interface Traffic extends ServiceConnection {
    site: DeploymentSite;
}

export type DeploymentSite = DataSiteResponse;

export type Deployment = DeploymentTopologyResponse;

export interface HttpRequest {
    id: string;
    name: string;
    requestsCountSent: number | null;
    requestsCountReceived: number | null;
    maxLatencySent: number | null;
    maxLatencyReceived: number | null;
    bytesOut: number | null;
    bytesIn: number | null;
}

export interface TCPRequest {
    id: string;
    name: string;
    ip: string;
    bytesOut: number | null;
    bytesIn: number | null;
}

export interface DeploymentDetails {
    service: Service;
    site: DeploymentSite;
    tcpConnectionsIn: Traffic[];
    tcpConnectionsOut: Traffic[];
    httpRequestsSent: Traffic[];
    httpRequestsReceived: Traffic[];
}

export interface ServiceRequestReceived extends ServiceRequestReceivedResponse {
    address: string;
    site: DeploymentSite;
}
