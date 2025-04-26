import { useState } from 'react';
import { TabButton } from './TabButton';
import { EXAMPLES, TOPICS } from '../data';
import { Section } from './Section';
import { Tabs } from './Tabs';

export function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  return (
    <Section title='Examples' id='examples'>
      <Tabs
        buttons={TOPICS.map((c) => (
          <TabButton
            key={c}
            isSelected={selectedTopic === c}
            onClick={() => setSelectedTopic(selectedTopic === c ? null : c)}
          >
            {c.toUpperCase()}
          </TabButton>
        ))}
      >
        <div id='tab-content'>
          {!selectedTopic && <p>Please select a topic.</p>}
          {selectedTopic && (
            <div>
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
        </div>
      </Tabs>{' '}
    </Section>
  );
}
