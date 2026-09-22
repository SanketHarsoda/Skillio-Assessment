import * as Haptics from 'expo-haptics';
import { Platform, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;
  haptic?: boolean;
};

export function PressableScale({
  children,
  style,
  onPress,
  haptic = true,
  ...rest
}: Props) {
  return (
    <Pressable
      {...rest}
      onPress={(e) => {
        if (haptic && Platform.OS !== 'web') {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.(e);
      }}
      style={({ pressed }) => [style, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
      {children}
    </Pressable>
  );
}
