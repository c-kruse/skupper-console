import { Suspense } from 'react';

import { Page } from '@patternfly/react-core';
import { AnimatePresence } from 'framer-motion';

import SkBreadcrumb from '@core/components/SkBreadcrumb';
import { getThemePreference, reflectThemePreference } from '@core/utils/isDarkTheme';
import SkHeader from '@layout/Header';
import RouteContainer from '@layout/RouteContainer';
import SkSidebar from '@layout/SideBar';
import LoadingPage from '@pages/shared/Loading';
import { routes } from 'routes';

import '@patternfly/react-core/dist/styles/base.css';
import './App.css';

const App = function () {
  reflectThemePreference(getThemePreference());

  return (
    <Page
      header={<SkHeader />}
      sidebar={<SkSidebar />}
      breadcrumb={<SkBreadcrumb />}
      isManagedSidebar
      isBreadcrumbGrouped
      additionalGroupedContent={
        <Suspense fallback={<LoadingPage />}>
          <AnimatePresence mode="wait">
            <RouteContainer>{routes}</RouteContainer>
          </AnimatePresence>
        </Suspense>
      }
    />
  );
};

export default App;
