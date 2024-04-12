import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

import useColorFromPallate from '../../../hooks/useColorFromPallate';
import TextBox from '../../Atoms/Textbox/TextBox';
import ErrorBoundary from '../../../classes/ErrorBoundary';

interface IBarcodeScannerWithInputProps {
  onScanValue: (value: string) => void;
  key?: string;
}
const BarcodeScannerWithInput = React.memo((props: IBarcodeScannerWithInputProps) => {
  const { onScanValue } = props;

  const [isCameraReady, setCameraReady] = useState(false);
  const [scanProduct, setScanProduct] = useState('');
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'qr', 'codabar'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        onScanValue(codes[0].value);
        setCameraReady(false);


        setScanProduct(codes[0].value)
      }
    }
  });

  useEffect(() => {

  }, [isCameraReady]);
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {

    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    // You may need to handle camera permissions using @react-native-permissions package
    // For simplicity, we assume camera permissions are granted
   
    if (!hasPermission) requestPermission();

  };



  const activateScaner = useCallback(() => {
    setCameraReady(!isCameraReady);
  }, [isCameraReady]);

  return (
    <ErrorBoundary fallbackUI={<Text>Eroor</Text>}>
      <View style={{ flex: 1 }}>

        {isCameraReady && <Camera
          style={{ flex: 1, height: 100 }}
          device={device}
          isActive={isCameraReady}
          codeScanner={codeScanner}
          focusable
          enableZoomGesture
          zoom={2}
        />}
        <View style={{ borderTopWidth: 1, borderColor: useColorFromPallate('lightGrey') }}>

          {<View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: useColorFromPallate('lightGrey'),
          }}>
            {/* <ImageDisplay  source={'rupee'} /> */}
            <TextBox
              placeholder="Scan Barcode"
              value={scanProduct}
              icon='barcode'
              clickLabel
              label='Scan'
              onChange={(e) => onScanValue(e)}
              onPressLabel={() => activateScaner()}
            />

          </View>}
        </View>
      </View>
    </ErrorBoundary>
  );
});

export default BarcodeScannerWithInput;
