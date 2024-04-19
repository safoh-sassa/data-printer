import React, { useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import { metadata } from '../src/metadata.const';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const AppHeading = styled.h2`
  margin: 15px;
`;

const App: React.FC = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleFormSubmit = (selectedChannels: string[]) => {
    setSelectedChannels(selectedChannels);
  };

  return (
    <Container className="App">
      <AppHeading>Select Channels</AppHeading>
      <Form metadata={metadata} onSubmit={handleFormSubmit} />
      {selectedChannels.length > 0 &&
        <Table metadata={metadata} selectedChannels={selectedChannels} />}
    </Container>
  );
};

export default App;
