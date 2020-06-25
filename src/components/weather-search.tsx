import * as React from 'react';
import { ChangeEvent } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Input from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface WeatherSearchProps {
  onSearch: any;
  isDisabled: boolean;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = (props: WeatherSearchProps) => {
  const [location, setLocation] = React.useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleSubmit = () => {
    props.onSearch(location);
  };

  return (
    <Form>
      <Form.Row style={{ verticalAlign: 'middle', width: '100%' }}>
        <Input>
            <Input.Prepend>
              <Input.Text id="basic-addon1"></Input.Text>
            </Input.Prepend>
            <FormControl
              placeholder="City"
              aria-label="City"
              aria-describedby="basic-addon1"
              onChange={handleChange}/>
        </Input>

        <Button 
          type='button'
          variant='primary'
          size='lg'
          onClick={handleSubmit}
          >
            Search
        </Button>
      </Form.Row>
    </Form>
  );
};
