import { ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <ActivityIndicator
      style={{position: 'absolute', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0}}
    />
  );
}

export { Loading };