import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabList, TabTrigger, TabPanels, TabPanel } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function RenderTabs(args: { defaultIndex?: number }) {
  const tabTriggerClasses =
    'px-3 py-2 text-sm border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-white';

  return (
    <Tabs {...args}>
      <TabList className="flex gap-2 border-b border-gray-200">
        <TabTrigger className={tabTriggerClasses}>Overview</TabTrigger>
        <TabTrigger className={tabTriggerClasses}>Cast</TabTrigger>
        <TabTrigger className={tabTriggerClasses}>Crew</TabTrigger>
      </TabList>
      <TabPanels className="pt-4">
        <TabPanel>Overview content </TabPanel>
        <TabPanel>Cast content </TabPanel>
        <TabPanel>Crew content </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export const Default: Story = {
  args: {
    defaultIndex: 0,
  },
  render: (args) => <RenderTabs {...args} />,
};

export const WithDefaultIndex: Story = {
  args: {
    defaultIndex: 1,
  },
  render: (args) => <RenderTabs {...args} />,
};
