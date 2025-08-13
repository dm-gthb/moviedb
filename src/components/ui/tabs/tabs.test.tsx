import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, TabTrigger, TabPanels, TabPanel } from './tabs';

describe('tabs', () => {
  const renderBasicTabs = (defaultIndex?: number) => {
    return render(
      <Tabs defaultIndex={defaultIndex}>
        <TabList>
          <TabTrigger>Tab 1</TabTrigger>
          <TabTrigger>Tab 2</TabTrigger>
          <TabTrigger>Tab 3</TabTrigger>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </Tabs>,
    );
  };

  describe('basic', () => {
    it('should render tabs and activate the first tab by default', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab2).toHaveAttribute('data-state', 'inactive');
      expect(tab3).toHaveAttribute('data-state', 'inactive');

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('should respect defaultIndex prop', () => {
      renderBasicTabs(1);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      expect(tab1).toHaveAttribute('data-state', 'inactive');
      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(tab3).toHaveAttribute('data-state', 'inactive');

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('should switch tabs when clicked', () => {
      renderBasicTabs();

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      fireEvent.click(tab2);
      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

      fireEvent.click(tab3);
      expect(tab3).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 3')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('should call custom onClick handler when provided', () => {
      const mockClick = vi.fn();

      render(
        <Tabs>
          <TabList>
            <TabTrigger onClick={mockClick}>Tab 1</TabTrigger>
            <TabTrigger>Tab 2</TabTrigger>
          </TabList>
          <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      fireEvent.click(tab1);

      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('a11y', () => {
    it('should have proper ARIA attributes', () => {
      renderBasicTabs();

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      // Check aria-selected
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(tab3).toHaveAttribute('aria-selected', 'false');

      // Check aria-controls
      expect(tab1).toHaveAttribute('aria-controls', 'tabPanel-0');
      expect(tab2).toHaveAttribute('aria-controls', 'tabPanel-1');
      expect(tab3).toHaveAttribute('aria-controls', 'tabPanel-2');

      // Check tabpanel has proper id
      const panel1 = screen.getByRole('tabpanel');
      expect(panel1).toHaveAttribute('id', 'tabPanel-0');
    });

    it('should manage tabindex correctly', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      // Active tab should be focusable
      expect(tab1).toHaveAttribute('tabIndex', '0');
      expect(tab2).toHaveAttribute('tabIndex', '-1');
      expect(tab3).toHaveAttribute('tabIndex', '-1');

      // After switching tabs
      fireEvent.click(tab2);
      expect(tab1).toHaveAttribute('tabIndex', '-1');
      expect(tab2).toHaveAttribute('tabIndex', '0');
      expect(tab3).toHaveAttribute('tabIndex', '-1');
    });

    it('should update aria-selected when tabs change', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      fireEvent.click(tab2);

      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('keyboard navigation', () => {
    it('should navigate to next tab with ArrowRight', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(tab2).toHaveFocus();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should navigate to previous tab with ArrowLeft', () => {
      renderBasicTabs(1); // Start with tab 2 active

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab2.focus();
      fireEvent.keyDown(tab2, { key: 'ArrowLeft' });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap to first tab when pressing ArrowRight on last tab', () => {
      renderBasicTabs(2); // Start with tab 3 active

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab3.focus();
      fireEvent.keyDown(tab3, { key: 'ArrowRight' });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab1).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      renderBasicTabs(); // Start with tab 1 active

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'ArrowLeft' });

      expect(tab3).toHaveAttribute('data-state', 'active');
      expect(tab3).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('should ignore other keys', () => {
      renderBasicTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });

      tab1.focus();
      fireEvent.keyDown(tab1, { key: 'Enter' });
      fireEvent.keyDown(tab1, { key: 'Space' });
      fireEvent.keyDown(tab1, { key: 'Tab' });

      // Tab 1 should still be active
      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });
});
