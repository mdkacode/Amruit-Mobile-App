import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface ImageDisplayProps {
  source: string; // Source of the image: local file path or URL
  width?: number; // Optional width of the image
  height?: number; // Optional height of the image
  rounded?: boolean; // Optional boolean to determine if the image should have rounded corners
  borderColor?: string; // Optional border color of the image
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  source,
  width = 40,
  height = 40,
  rounded = false,
  borderColor = '#000',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    source ? <View style={styles.container}>
      {/* {loading && <ActivityIndicator size="small" color="#0000ff" />} */}
      {error  ? (
        <></>
      ) : (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            { width, height },
            rounded && { borderRadius: 10 }, // Customizable border radius
            { borderColor },
          ]}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View> :<></>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center', // Maintain aspect ratio
    borderWidth: 1, // Add a default border width
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ImageDisplay;
