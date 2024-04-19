import React from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';
import { MetadataItem } from '../metadata.const';
import { Alert } from 'react-bootstrap';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;

  .form-group {
    display: flex;
    margin-bottom: 10px;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  max-width :100px ;
  max-height: 40px;
  margin-left: 8px;
`;

const AlertContainer = styled.div`
  max-width: 200px;
`;

// Custom styles for the Select component
const selectStyles: StylesConfig<OptionType, true> = {
    control: (provided) => ({
        ...provided,
        minWidth: '250px',
        maxWidth: '245px',
    }),
};

interface FormProps {
    onSubmit: (selectedChannels: string[]) => void;
    metadata: MetadataItem[];
}

interface OptionType {
    value: string;
    label: string;
}

const Form: React.FC<FormProps> = ({ metadata, onSubmit }) => {
    // Extract unique channel names from metadata
    const uniqueChannelNames = Array.from(new Set(metadata.map(item => item.name)));

    // Create options from unique names
    const options: OptionType[] = uniqueChannelNames.map(name => ({ value: name, label: name }));

    const [selectedChannels, setSelectedChannels] = React.useState<OptionType[]>([]);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);

    const handleSelectChange = (selectedOptions) => {
        setSelectedChannels(selectedOptions as OptionType[]);
        // Hide warning when channels are selected
        setShowWarning(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedChannels.length === 0) {
            // Show warning if no channel is selected
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);
            }, 2500);
            onSubmit([]);
            return;
        }
        const selectedChannelValues = selectedChannels.map(option => option.value);
        onSubmit(selectedChannelValues);
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Select
                        options={options}
                        isMulti
                        onChange={handleSelectChange}
                        value={selectedChannels}
                        className="select-input"
                        styles={selectStyles}
                    />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </div>
            </form>
            {showWarning && (
                <AlertContainer>
                    <br />
                    <Alert variant="warning">No channel selected</Alert>
                </AlertContainer>
            )}
        </FormContainer>
    );
};

export default Form;
