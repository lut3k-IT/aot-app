/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactComponent as CloseIcon } from 'src/assets/icons/x.svg';

export type IconNames = 'close';

interface IconProps extends Partial<HTMLAnchorElement> {
  name: IconNames;
  // link?: string;
  small?: boolean; //or change to size
  svgProps?: object;
}

const Icon = (props: IconProps) => {
  const { name, svgProps } = props;

  const iconProps = {
    // className:, // allow to add various tailwind variants
    ...svgProps
  };

  const Icons: Record<IconProps['name'], any> = {
    close: CloseIcon
  };
  const IconComponent = Icons[name];

  return <IconComponent {...iconProps} />;
};

export default Icon;
