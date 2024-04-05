import React from 'react';
import { Text, View } from 'react-native';
import ImageSlider from '../Sliders/ImageSlider';

interface CardProps {
    title: string;
    content: string;
}

const CardComponent: React.FC<CardProps> = ({ title, content }) => {
    return (
        <View >
            <ImageSlider images={[
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'
            ]} />
            <Text>{title}</Text>
            <Text>{content}</Text>
        </View>
    );
};

export default CardComponent;