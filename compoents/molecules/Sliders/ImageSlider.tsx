import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const translateX = useSharedValue(0);
    const offsetX = useRef(0);

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.offsetX = translateX.value;
        },
        onActive: (event, ctx) => {
            //@ts-ignore
            translateX.value = ctx.offsetX + event.translationX;
        },
        onEnd: () => {
            translateX.value = withSpring(-width, { damping: 10, stiffness: 100 });
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={panGestureHandler}>
                    <Animated.View style={[styles.slider, animatedStyle]}>
                        {images.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={styles.image} />
                        ))}
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        flexDirection: 'row',
    },
    image: {
        width:Dimensions.get('window').width,
        height: 200,
        resizeMode: 'cover',
    },
});

export default ImageSlider;
