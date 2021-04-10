import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  resetIdCounter,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

export default function AdminTabs({ tabList, contentList }) {
  const B = 'admin-tabs';

  resetIdCounter();

  return (
    <Tabs className={B}>
      <TabList className={`${B}__tab-list react-tabs__tab-list`}>
        {tabList.map((text) => (
          <Tab
            className={`${B}__tab react-tabs__tab`}
            selectedClassName={`${B}__tab_selected react-tabs__tab--selected`}
            key={text}
          >
            {text}
          </Tab>
        ))}
      </TabList>

      {contentList.map(({ key, content }) => (
        <TabPanel className={`${B}__tab-panel react-tabs__tab-panel`} key={key}>
          {content}
        </TabPanel>
      ))}

      <style jsx global>
        {`
        .${B}__tab-list {
          border-color: ${styleVars.colors.green};
        }

        .${B}__tab_selected {
          border-color: ${styleVars.colors.green};
        }

        .${B}__tab-panel {
          padding: 10px 0;
        }
        `}
      </style>
    </Tabs>
  );
}

AdminTabs.propTypes = {
  tabList: proptypes.tabList.isRequired,
  contentList: proptypes.tabContentList.isRequired,
};
