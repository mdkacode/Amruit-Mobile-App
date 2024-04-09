import { FlashList } from '@shopify/flash-list';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageDisplay from '../../compoents/Atoms/ImageDisplay/imageDisplay';
import Button from '../../compoents/Atoms/Buttons/Button';
import AppStyles from '../../genericStles/AppStyles';
import useColorFromPallate from '../../hooks/useColorFromPallate';
import { theme } from '../../Themes/theme';




const List = memo(() => {
    const items = [
        {
            label: 'carborator',
            value: "carborater",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            subLabel: "sublabel",
            key: "1"
        },
        {
            label: 'carborator1',
            value: "carborater1",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            subLabel: "sublabel1",
            key: "2"
        },
    ]

    return (
        <View style={{ flex: 1 }}>
            <FlashList data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                    return (
                        <View style={[{...styles.listSingleItem,backgroundColor:theme.colors.cardPrimaryBackground}]}>
                            <ImageDisplay source={item.image} />
                            <View style={{ flex: 1, flexDirection: "column",gap:2,marginLeft:8 }}>
                                <Text style={AppStyles.textSemibold}>{item.label}</Text>
                                <Text style={AppStyles.textRegular}>{item.subLabel}</Text>
                            </View>
                            <Button title="Update" buttonColor={'black'} fontColor='white' onPress={() => console.log("Add")} />
                        </View>
                    )

                }}
                estimatedItemSize={1}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    listSingleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.1)'
    }
});

export default List;