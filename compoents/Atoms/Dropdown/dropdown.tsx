import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import TextBox from '../Textbox/TextBox';
import { FlashList } from '@shopify/flash-list';
import ImageDisplay from '../ImageDisplay/imageDisplay';
import fontFamily from '../../../constants/fontFamily';

interface SheetContentProps {
    options: dropdownOptions[];
    multiSelect?: boolean;
    onSelect?: (value: dropdownOptions[] | dropdownOptions) => void;
    placeHolder: dropdownOptions
}

interface dropdownOptions {
    label: string;
    value: string;
    image?: string;
    subLabel?: string;
    key?: string | number;
}



const Dropdown: React.FC<SheetContentProps> = (props) => {
   
    const defaultOptionsOnNull = {
        label: "Select", value: '-', subLabel: '--',
        key: 'Select Service',
        image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    }

    const { options = [], multiSelect= false, onSelect = (value) => console.log(value, " Not handled in props"), placeHolder = defaultOptionsOnNull } = props;

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<dropdownOptions[]>([]);

    const onSelectOption = (option: dropdownOptions) => {
        if (multiSelect) {
            if (selectedOptions.includes(option)) {
                setSelectedOptions(selectedOptions.filter((item) => item !== option));
            }  else {
                setSelectedOptions([...selectedOptions, option]);

            }
        } else {

            setSelectedOptions([option]);
            toggleSheet()
        }
    }

    useEffect(() => {
        if (selectedOptions.length > 0) {
            onSelect(selectedOptions);
        }

        if (selectedOptions.length === 1) {
            onSelect(selectedOptions[0]);
        }

    }, [selectedOptions])

    const handleSheetChanges = useCallback((index: number) => {

    }, []);

    const toggleSheet = () => {
        setSheetVisible(!sheetVisible);
        if (!sheetVisible && bottomSheetRef.current) {
            bottomSheetRef.current.expand(); // Expand the bottom sheet
        } else {
            bottomSheetRef.current?.close(); // Close the bottom sheet
        }
    };

    const filterOptions = (searchText: string) => {
        const filteredOptions = options.filter((option) => {
            return option?.label?.toLowerCase()?.includes(searchText.toLowerCase());
        });
        return filteredOptions;
    }


    const renderSingleItem = (item: dropdownOptions) => {
        return <TouchableOpacity style={[styles.listItem, {
            backgroundColor: selectedOptions.includes(item) ? 'rgba(0,0,0,0.1)' : 'white',

        }]} onPress={() => { onSelectOption(item); }}>
            <ImageDisplay rounded source={item.image} />
            <View>
                <Text style={styles.singleItem}>{item.label}</Text>
                <Text style={styles.singleSubItem}>{item.subLabel}</Text>
            </View>
        </TouchableOpacity>
    }
    const renderMultiItem = () => {
       
            return <View style={{display:'flex',flexDirection:'row',flexShrink:2,gap:10, flexWrap:'wrap'}}>
            {selectedOptions.length > 0 && selectedOptions?.reverse().map((e,index)=> {
            
                return <View>
                    <Text style={styles.singleItem}>{e.label}</Text>
                    <Text style={styles.singleSubItem}>{e.subLabel}</Text>
                </View>
           })}
           </View>
      
    }

    return (
        <>
            <TouchableOpacity style={styles.selectedElement} onPress={toggleSheet}>
                {multiSelect && selectedOptions.length > 0 ? renderMultiItem() : <>
                    <View>
                        {!placeHolder.label && <Text style={[fontFamily.semibold,{justifyContent:"center",fontSize:18}]}>{ "Select Options"}</Text>}
                        {placeHolder.label && <Text key={placeHolder.label + "label"} style={styles.singleItem}>{placeHolder.label || "Select"}</Text>}
                        {placeHolder?.subLabel && <Text key={placeHolder.subLabel + "subLabel"} style={styles.singleSubItem}>{placeHolder?.subLabel}</Text>}
                    </View>
                    {placeHolder.image && <ImageDisplay rounded key={placeHolder.image + "image"} source={placeHolder.image} />}
                </>}
            </TouchableOpacity>
            {sheetVisible === true && <View style={[styles.container, { flex: sheetVisible ? 1 : 0, backgroundColor: sheetVisible ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }]}>
                {<BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    onClose={() => setSheetVisible(false)}
                    enablePanDownToClose={true}
                    snapPoints={['90%']}
                    handleComponent={() => (
                        <View style={styles.handleContainer}>
                            <View style={styles.handle} />
                        </View>
                    )}
                    index={sheetVisible ? 0 : -1} // This controls the visibility of the bottom sheet
                >
                    {options.length > 0 && (
                        <View style={styles.dropdownSearch}>
                            <TextBox onChange={(e) => setSearchText(e)} placeholder='Search' />
                        </View>
                    )}
                    <FlashList
                        data={filterOptions(searchText)}
                        keyExtractor={(item) => item.value}
                        bouncesZoom={true}
                        estimatedItemSize={filterOptions(searchText).length > 0 ? filterOptions(searchText).length : 0}
                        renderItem={({ item }) => {

                            return renderSingleItem(item)
                            
                        }}
                    />
                </BottomSheet>}
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        padding: 5
    },
    handleContainer: {
        alignItems: 'center',
    },
    listItem: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        gap: 10,
    },
    singleItem: {
        fontSize: 16,
        fontFamily: fontFamily.semibold.fontFamily,
    },
    singleSubItem: {
        fontSize: 12,
        fontFamily: fontFamily.light.fontFamily,
    },
    selectedElement: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10,
    },
    dropdownSearch: {
        padding: 5,
        backgroundColor: 'white',
    }
});

export default Dropdown;