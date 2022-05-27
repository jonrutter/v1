import React, { useState } from 'react';
import clsx from 'clsx';

// reach ui components
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

// components
import { Icon } from '@/components';

// skills
import { JavaScript, TypeScript } from '@content/portfolio/skills';
import { SkillType } from '@/types';

/* ~~~ Code Tab ~~~ */

type TabProps = {
  index: number;
  active: number;
  children: string;
};

/**
 * Internal component to render a styled skill icon
 */
const Skill = ({ skill }: { skill: SkillType }) =>
  skill.icon ? (
    <Icon name={skill.icon} className="mr-2" style={{ color: skill.color }} />
  ) : null;

/**
 * Internal component to avoid reusing styling between tabs
 */
const CodeTab: React.FC<TabProps> = ({ index, active, children }) => {
  let content = null;
  if (
    children.toLowerCase() === 'jsx' ||
    children.toLowerCase() === 'javascript'
  ) {
    content = (
      <div className="flex items-center">
        <Skill skill={JavaScript} />
        {children}
      </div>
    );
  } else if (
    children.toLowerCase() === 'tsx' ||
    children.toLowerCase() === 'typescript'
  ) {
    content = (
      <div className="flex items-center">
        <Skill skill={TypeScript} />
        {children}
      </div>
    );
  } else {
    content = children;
  }
  return (
    <Tab
      className={clsx(
        'px-4 py-2 text-sm block border-[1px] [border-style:_solid] border-b-0 border-[#282c34] first-of-type:rounded-tl-md last-of-type:rounded-tr-md font-bold',
        index === active
          ? 'bg-[#282c34] active:bg-[#282c34] text-slate-50'
          : 'bg-transparent active:bg-transparent'
      )}
    >
      {content}
    </Tab>
  );
};

/* ~~~ Code Tabs ~~~ */

type Props = {
  one: string;
  two: string;
};

/**
 * A component for rendering code blocks that can tab between related languages (e.g., javascript/typescript) in MDX
 *
 * Usage: pass props.one and props.two to name the tabs, and compose two `<CodePanel>`s as direct children of `<CodeTabs>`.
 *
 * @param props.one - The name of the first tab
 * @param props.two - The name of the second tab
 *
 */
export const CodeTabs: React.FC<Props> = ({ one, two, children }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <Tabs className="code-tabs" onChange={(index) => setActive(index)}>
      <TabList className="bg-transparent">
        <CodeTab index={0} active={active}>
          {one}
        </CodeTab>
        <CodeTab index={1} active={active}>
          {two}
        </CodeTab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
};

/**
 * Renders the a tabpanel within `<CodeTabs>`.
 *
 * Should directly wrap a `<CodeBlock>` component.
 */
export const CodePanel: React.FC = ({ children }) => {
  return <TabPanel>{children}</TabPanel>;
};
