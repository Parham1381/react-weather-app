import * as React from 'react';

interface WeatherIconProps {
  icon: string;
  size?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size }: WeatherIconProps) => {
  const defaultSize = !size ? '1rem' : size;

  const renderIcon = () => {
    const iconUrl: string = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
    <img 
      src={iconUrl}
      alt="new"
    /> 
    );
  };

  return <span style={{ fontSize: defaultSize }}>{renderIcon()}</span>;
};
