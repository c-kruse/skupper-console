import { Brand, PageHeader, PageHeaderTools, Title } from '@patternfly/react-core';

import { brandLogo, brandName, skupperVersion } from '@config/config';

const Header = function () {
  return (
    <PageHeader
      className="sk-header"
      headerTools={
        <PageHeaderTools>
          <Title headingLevel="h4" className="pf-u-pl-md">
            v {skupperVersion}
          </Title>
        </PageHeaderTools>
      }
      logo={
        <>
          <Brand src={brandLogo} alt="logo" heights={{ default: '70px' }}>
            <source srcSet={brandLogo} />
          </Brand>

          {brandName && (
            <Title headingLevel="h1" className="pf-u-pl-md">
              {brandName}
            </Title>
          )}
        </>
      }
      showNavToggle
    />
  );
};

export default Header;
