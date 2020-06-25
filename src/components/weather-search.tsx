import * as React from 'react';
import { ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';


interface WeatherSearchProps {
  onSearch: any;
  isDisabled: boolean;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = (props: WeatherSearchProps) => {
  const [location, setLocation] = React.useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    // console.log(value);
    setLocation(value);
  };

  const handleSubmit = () => {

    // e.preventDefault();
    props.onSearch(location);
  };

  return (

    <div className="w-50 mx-auto p-2 wrapper container" >
      <form onSubmit={handleSubmit} className="form-inline justify-content-center"  >
        <div className="input-group w-100">
          <input className="form-control rounded m-1"
            style={{ fontSize: "1.2em" }}
            placeholder="City"
            onChange={handleChange}
            type="text"
          />
          <Button
            type='submit'
            variant='primary'
            size='lg'
            className=" btn btn-lg bg-transparent fa fa-search text-light"
            style={{ fontSize: "1.5em", border: "0px" }}
          />
        </div>
      </form>
    </div>
  );
};
