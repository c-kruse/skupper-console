export enum QuerySite {
  GetSiteMenu = 'get-site-menu',
  GetSiteId = 'get-siteId-query',
  GetSiteInfo = 'get-site-info-query',
  GetSites = 'get-sites-query',
  GetServices = 'get-site-services-query',
  GetOverview = 'get-overview-query',
  GetDeployments = 'get-deployments-query',
  GetDeploymentLinks = 'get-deployment-links-query',
  GetLinks = 'get-links-query',
  GetTokens = 'get-tokens-query',
}

export enum SiteLabels {
  RouteOverview = 'Overview',
  RouteDeployments = 'Deployments',
  RouteLinks = 'Links',
}

export enum SiteRoutesPaths {
  Site = '/site',
  Links = 'links',
  Overview = 'overview',
  Deployments = 'deployments',
}
