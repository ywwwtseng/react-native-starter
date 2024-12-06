// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

const Icon = {
  Ionicons(props: IconProps<ComponentProps<typeof Ionicons>['name']>) {
    return <Ionicons size={28} {...props} />;
  },
  FontAwesome(props: IconProps<ComponentProps<typeof FontAwesome>['name']>) {
    return <FontAwesome size={28} {...props} />;
  },
  Material(props: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
    return <MaterialIcons size={28} {...props} />;
  },
  AntDesign(props: IconProps<ComponentProps<typeof AntDesign>['name']>) {
    return <AntDesign size={28} {...props} />;
  },
};

export { Icon };
