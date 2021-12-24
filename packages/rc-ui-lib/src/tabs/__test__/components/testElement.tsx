import React from 'react';
import Tabs from '../..';

const TestElements: React.FC = () => {
  const [insert, setInsert] = React.useState(false);

  return (
    <>
      <Tabs active="a" sticky scrollspy lineHeight="4px">
        <Tabs.TabPane title="title1" name="a">
          Tab
        </Tabs.TabPane>
        {insert && (
          <div>
            <Tabs.TabPane title="title2" name="b">
              Tab
            </Tabs.TabPane>
          </div>
        )}
        <Tabs.TabPane title="title3" name="c">
          Tab
        </Tabs.TabPane>
      </Tabs>
      <button data-testid="button-change" type="button" onClick={() => setInsert(true)}>
        ChangeInsert
      </button>
    </>
  );
};

export default TestElements;
