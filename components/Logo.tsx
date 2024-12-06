import { Icon } from '@/components/Icon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type LogoProps = Omit<IconProps<ComponentProps<typeof MaterialIcons>['name']>, 'name'>

function Logo(props: LogoProps) {
  return <Icon.Material size={28} color="#8B8B8B" name="dashboard" {...props} />;
}

export default Logo;