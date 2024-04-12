import { FlashList } from '@shopify/flash-list';
import React, { memo, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import ImageDisplay from '../../compoents/Atoms/ImageDisplay/imageDisplay';
import Button from '../../compoents/Atoms/Buttons/Button';
import AppStyles from '../../genericStles/AppStyles';
import useColorFromPallate from '../../hooks/useColorFromPallate';
import { theme } from '../../Themes/theme';
import { useGetProductListQuery } from '../../Store/Api/searchApi';
import { useAppDispatch } from '../../Store/store.index';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { logoutUserGlobalFunction } from '../../utils/authUtils';
import { rupeeSym } from '../../utils/AppConstants';
import { useDeleteProductMutation } from '../../Store/Api/productApi';




const ProductList = (({navigation}) => {

    const dispatch = useAppDispatch();
   
    const isScreenFocused = useIsFocused();
    const {data,isLoading,isFetching,refetch} = useGetProductListQuery('9839284651');
    const items = data;
    useEffect(()=>{
        if( isFetching) {
            dispatch(enableLoading())
        }
        if( !isFetching){
            dispatch(disableLoading())
        }
    },[isFetching])


    const HeaderComponent = () => {

        return <View style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexGrow: 1,
            width: Dimensions.get('window').width - 20,
            paddingLeft: 10,
            paddingRight: 10,

            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={[AppStyles.textSemibold, { textTransform: 'uppercase' }]}>Product List</Text>
            <Button title="+ Add Product"
                fontColor='white'
                buttonColor='black'
                fontSize={14}
                onPress={() => navigation.push('AddProduct')} />
        </View>
    }

    const [deleteProduct, { isError, isLoading:deleteLoading, isSuccess }] = useDeleteProductMutation();

    useEffect(()=>{
        if(isLoading || deleteLoading) {
            dispatch(enableLoading())
        }
        if(isSuccess){
            dispatch(disableLoading());
            refetch();
        }
        if(isError){
            dispatch(disableLoading());
            alert('Failed to delete product');
        }

    },[isSuccess,isError,deleteLoading])
    useEffect(()=>{
        if(isScreenFocused){
            navigation.setOptions({
                headerLeft: null,
            });
            navigation.setOptions({
                headerTitle: (e:any) => <HeaderComponent />,
            });
            refetch();
        }
    },[isScreenFocused])
    return (
        <View style={{ flex: 1 }}>
            {data && data.length == 0 && <View key="customerView" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height - 100 }}>
                <Text key="noCustumerText" style={[AppStyles.textSemibold, { fontSize: 16 }]}>No Product Found</Text>
                <Button key="logoutBtn" title="+ Add Product" fontColor='white' buttonColor='black' fontSize={14} onPress={() =>  navigation.push('AddProduct')}/>
            </View>}
            <FlashList data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                    return (
                        <View style={[{...styles.listSingleItem,backgroundColor:theme.colors.cardPrimaryBackground}]}>
                          
                            {/* <ImageDisplay source={item.image} /> */}
                            <View style={{ flex: 1, flexDirection: "column",gap:2,marginLeft:8 }}>
                                <Text key={`${item?.car ? `(${item.car})` : ''}`} style={AppStyles.textSemibold}>{item.label} {`${item?.car ? `(${item.car})` : ''}`}</Text>
                                <Text key={item?.qty ? `Q - ${item.qty}` : ''} style={AppStyles.textRegular}> {item.qty ? `Qty - ${item.qty}` : ''}</Text>
                                
                                <View style={{display:'flex', flexDirection:'row',flex:1}}>
                                <Text key={item?.mrp ? `Q - ${item.mrp}` : ''}  style={[AppStyles.textRegular,{color:'red'},{textDecorationLine:'line-through'}]}> {item.mrp ? `MRP -  ${rupeeSym}${item.mrp}` : ''}</Text>
                                <Text key={item?.sellingPrice ? `Q - ${item.sellingPrice}` : ''}  style={[AppStyles.textBold,{color:'green'}]}> {item.sellingPrice ? `SP - ${rupeeSym}${item.sellingPrice}` : ''}</Text>
                                </View>
                            </View>
                            <View style={{display:'flex', flexDirection:'row',flex:1,justifyContent:"flex-end",gap:5}}>
                                <Button title={"Update" }buttonColor={'black'} fontColor='white'
                                    onPress={() => navigation.push('AddProduct', item)} />
                                     {item.id ? <Button title="❌ " buttonColor={'white'} fontColor='white'
                                    onPress={() => deleteProduct(parseInt(item.id))} /> :<></>}
                            </View>
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

export default ProductList;