import React, { useState } from 'react';
import clsx from 'clsx';

// reach ui components
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

const PortfolioTab: React.FC<{ index: number; active: number }> = ({
  index,
  active,
  children,
}) => (
  <Tab
    className={clsx(
      'p-3 transition-all outline-none border-none active:bg-transparent focus-visible:ring-2  ring-slate-900 dark:ring-slate-50 rounded-md',
      index === active
        ? 'text-slate-50 dark:text-slate-900'
        : 'text-slate-900 dark:text-slate-50'
    )}
  >
    {children}
  </Tab>
);

export const PortfolioTabs: React.FC = ({ children }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <Tabs onChange={(index) => setIndex(index)}>
      <div className="flex items-center justify-center mb-6 lg:mb-10 relative">
        <TabList
          className={clsx(
            'p-1 text-lg rounded-lg relative z-10 grid grid-cols-2 overflow-hidden shadow-lg bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-all ',
            'after:transition-all after:absolute after:top-2 after:bottom-2 after:bg-slate-900 after:rounded-md after:dark:bg-slate-50 after:-z-10 after:w-[calc(50%-0.75rem)]',
            index === 0 ? 'after:left-2' : 'after:left-[calc(50%+0.25rem)]'
          )}
        >
          <PortfolioTab index={0} active={index}>
            Websites
          </PortfolioTab>
          <PortfolioTab index={1} active={index}>
            Apps
          </PortfolioTab>
        </TabList>
      </div>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
};

export const PortfolioTabPanel: React.FC = ({ children }) => {
  return (
    <TabPanel className="rounded-lg focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:dark:ring-slate-50 outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-800">
      {children}
    </TabPanel>
  );
};
