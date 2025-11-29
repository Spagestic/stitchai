import type React from "react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DRAWER_HEIGHT = 350;

export type BottomDrawerRef = {
  open: () => void;
  close: () => void;
};

type BottomDrawerProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

interface BottomDrawerWithRefProps extends BottomDrawerProps {
  refProp?: React.Ref<BottomDrawerRef>;
}

function BottomDrawerComponent({
  children,
  onClose,
  refProp,
}: BottomDrawerWithRefProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(DRAWER_HEIGHT + insets.bottom);
  const isOpen = useSharedValue(false);
  const overlayOpacity = useSharedValue(0);

  const open = useCallback(() => {
    isOpen.value = true;
    overlayOpacity.value = withTiming(1, { duration: 200 });
    translateY.value = withSpring(0, {
      damping: 50, // Higher damping for minimal bounce
      stiffness: 200, // Higher stiffness for faster movement
    });
  }, [isOpen, overlayOpacity, translateY]);

  const isClosing = useSharedValue(false);
  const pendingOnClose = useRef(onClose);

  useEffect(() => {
    pendingOnClose.current = onClose;
  }, [onClose]);

  useAnimatedReaction(
    () => isClosing.value,
    (closing) => {
      if (
        closing &&
        translateY.value >= DRAWER_HEIGHT * 0.9 + insets.bottom * 0.9
      ) {
        isClosing.value = false;
        if (pendingOnClose.current) {
          pendingOnClose.current();
        }
      }
    }
  );

  const close = useCallback(() => {
    Keyboard.dismiss();
    isOpen.value = false;
    isClosing.value = true;
    overlayOpacity.value = withTiming(0, { duration: 200 });
    translateY.value = withSpring(DRAWER_HEIGHT + insets.bottom, {
      damping: 20,
      stiffness: 150,
    });
  }, [isOpen, isClosing, overlayOpacity, translateY, insets.bottom]);

  useImperativeHandle(refProp, () => ({
    open,
    close,
  }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > DRAWER_HEIGHT / 3 || event.velocityY > 500) {
        close();
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    pointerEvents: isOpen.value ? "auto" : "none",
  }));

  return (
    <>
      <Animated.View
        className="bg-black/50"
        style={[styles.overlay, overlayStyle]}
      >
        <Pressable onPress={close} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View
          className="border-border border-t bg-background"
          style={[
            styles.drawer,
            animatedStyle,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          <View style={styles.handleContainer}>
            <View className="bg-muted-foreground/30" style={styles.handle} />
          </View>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

// Usage: <BottomDrawer refProp={ref} ... />
const BottomDrawer = (
  props: BottomDrawerProps & { refProp?: React.Ref<BottomDrawerRef> }
) => <BottomDrawerComponent {...props} />;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0,
    zIndex: 101,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default BottomDrawer;
