import Animated, { FadeInDown, type AnimatedProps } from 'react-native-reanimated';
import type { ViewProps } from 'react-native';

type Props = AnimatedProps<ViewProps> & {
  index?: number;
};

export function FadeIn({ children, index = 0, style, ...rest }: Props) {
  return (
    <Animated.View
      entering={FadeInDown.springify()
        .damping(18)
        .stiffness(160)
        .delay(index * 70)}
      style={style}
      {...rest}>
      {children}
    </Animated.View>
  );
}
