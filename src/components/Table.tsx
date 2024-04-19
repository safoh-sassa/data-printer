import React from 'react';
import styled from 'styled-components';
import { MetadataItem } from '../metadata.const';

const TableContainer = styled.div`
  margin: 15px;
`;

const GroupDiv = styled.div`
  margin-bottom: 15px;
  border: 3px solid #007bff;
`;

const TableStyled = styled.table`
  width: 100%;
  margin: 0px;
`;

const Th = styled.th`
  padding: 15px !important;
  border-right: 1px solid #007bff;
  width: 50%;
`;

const Td = styled.td`
  padding: 15px !important;
  width: 50%;
`;

const SelectedNameHeader = styled.h2`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  margin: 0px;
`;

const TableBottomLine = styled.div`
  border-bottom: 1px solid #007bff;
`;

interface TableProps {
    metadata: MetadataItem[];
    selectedChannels: string[];
}

const formatDate = (utcString: string): string => {
    const dateObj = new Date(utcString);
    return dateObj.toLocaleString();
};

const Table: React.FC<TableProps> = ({ metadata, selectedChannels }) => {
    return (
        <TableContainer>
            {selectedChannels.map((selectedName, nameIndex) => {
                const selectedMetadata = metadata.filter((item) => item.name === selectedName);

                return (
                    <GroupDiv key={selectedName}>
                        <center>
                            <SelectedNameHeader>{selectedName}</SelectedNameHeader>
                        </center>
                        {selectedMetadata.map((metadataItem, index) => (
                            <div key={index}>
                                <TableStyled className="table table-striped">
                                    <tbody>
                                        {Object.entries(metadataItem).map(([key, value]) => (
                                            <tr key={key}>
                                                <Th>{key}</Th>
                                                <Td>{key === 'injection_utc' ? formatDate(value as string) : value}</Td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableStyled>
                                {!(index === selectedMetadata.length - 1) && <TableBottomLine />}
                            </div>
                        ))}
                    </GroupDiv>
                );
            })}
        </TableContainer>
    );
};

export default Table;
