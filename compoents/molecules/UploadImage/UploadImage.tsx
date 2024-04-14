import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Button, Text, TouchableOpacity, Platform, Dimensions, Modal, Image, StyleSheet, StatusBar } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import { APIENDPOINT } from '../../../utils/AppConstants';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useAppSelector } from '../../../Store/store.index';

interface UploadImageProps {
    onImageListChange: (str:string) => void;
    fetchedImages?: string[];
}
const UploadImageComponent: React.FC<UploadImageProps> = (props) => {

    const userSelector = useAppSelector(state=> state.userSlice.user.phone);
    let { onImageListChange,fetchedImages } = props;
    const camera = useRef<Camera>(null);
    const [isCameraReady, setCameraReady] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);

    const [imagesList, setImagesList] = useState<string[]>([]);
    const device = useCameraDevice('back', {
        physicalDevices: [
            'ultra-wide-angle-camera',
            'telephoto-camera',
            'wide-angle-camera'
        ]
    });

    const openCamera = () => {
        
        setOpenModal(!openModal);
    }
   

    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = useCallback(async () => {
        requestPermission();
    }, [requestPermission]);

    const activateScanner = useCallback(() => {
        setCameraReady(!isCameraReady);
    }, [isCameraReady]);

   

    const takePicture = async () => {
        const photo = await camera.current.takePhoto({
            qualityPrioritization: 'balanced',
            flash: 'off',

            enableShutterSound: true
        })
        console.log(photo);

        const fileData = await RNFS.readFile(photo.path, 'base64');

        const uri = `file://${photo.path}`
        const fileName = photo.path.substring(photo.path.lastIndexOf('/') + 1, photo.path.length)
        const fileType = fileName.split('.')[1]
        // setTempImage(uri);
        const data = new FormData()

        // @ts-ignore
        data.append('upload', {
            name: fileName,
            type: `image/${fileType}`,
            uri: uri
        });

        console.log(userSelector,"UPLAIDINFG IMAGE")
        fetch(`${APIENDPOINT}upload/addFile?fileName=anrag&phone=${userSelector}`, {
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).then(async (res) => {
            let result = await res.json();
            console.log('res',result[0]?.location)
            onImageListChange(result[0]?.location)
            setImagesList([...imagesList, result[0]?.location]);
        }).catch((err) => {
            console.log('err', err)
        })

        openCamera();
    };

    const closeModal = () => {
        setTempImage(null);
        setCameraReady(false);
    };

    return (
        <>
       {showFullScreen && <Modal>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Animated.View   style={{position:'absolute',top:10,right:10,flex:1,zIndex:999}} >
                   <Button title="Close" onPress={()=>setShowFullScreen('')} />
                </Animated.View>
               <Carousel
                    data={[...imagesList,...fetchedImages]}
                    renderItem={({ item }) => (
                        <Image 
                          source={{ uri: item }} 
                          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                           />
                    )}
                  
                    width={Dimensions.get('window').width}    />
                {/* <Image source={{uri:showFullScreen}} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}} /> */}
            </View>
        </Modal>}
        <View style={styles.container}>
            
           
               <Button title="Open Camera" color={"red"} onPress={openCamera} />
            
            <StatusBar hidden barStyle="dark-content" />
            <Modal
                animationType="slide"
                presentationStyle="fullScreen"
                statusBarTranslucent={true}
                transparent={false}
                style={{ flex: 1 }}
                visible={openModal }
                onRequestClose={closeModal}
            >
                {(
                    <>
                        <Camera
                            ref={camera}
                            device={device}
                            style={{  height: Dimensions.get('window').height,width:Dimensions.get('window').width }}
                            isActive={isCameraReady || openModal}
                            focusable
                            photo={true}
                            enableZoomGesture
                            zoom={1}
                            enableHighQualityPhotos
                        />
                        <View style={{ position: 'absolute', bottom: 30, left: '40%' }}>
                            {openModal && (
                                <View style={{display:'flex',flexDirection:'row',gap:40}} >
                                    <Button  color={"red"} title="Take Picture" onPress={takePicture} />
                                    <Button color={"black"} title="Close" onPress={openCamera} />
                                </View>
                            )}
                        </View>
                    </>
                )}


            </Modal>
            <ScrollView style={{

                flexDirection: 'row',
                display: 'flex',
                gap: 10,
            }} horizontal showsHorizontalScrollIndicator={false} >
                {

                    [...imagesList,...fetchedImages].map((image, index) => (
                        <TouchableOpacity key={index} onPress={()=>setShowFullScreen(image)}>
                        <View key={index}  style={{display:'flex',gap:12,borderWidth:4, borderRadius:10, margin:5}}>
                            <Image
                                
                                source={{ uri: image }}
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                            />
                        </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    captureButtonText: {
        color: 'white',
        fontSize: 16,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    cameraControls: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default UploadImageComponent;
