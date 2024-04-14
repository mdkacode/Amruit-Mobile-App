import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import { rupeeSym } from '../../utils/AppConstants';
import { ScrollView } from 'react-native-gesture-handler';
import { ICustomerOutputParams, filterType, iSalesReport, useSaleReportMutation } from '../../Store/Api/customerApi';
import { useAppDispatch, useAppSelector } from '../../Store/store.index';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import Button from '../../compoents/Atoms/Buttons/Button';
import fontFamily from '../../constants/fontFamily';
import { FlashList } from '@shopify/flash-list';
import moment from 'moment';

const filters = ['today', 'month', 'year', 'overall', 'progress', 'completed'];
const Sales = () => {
    const userSelector = useAppSelector(state=> state.userSlice.user.phone);
    const garageumber = userSelector;
    const dispatch = useAppDispatch();
    const [getSalesReport, {data, isError, isLoading, isSuccess }] = useSaleReportMutation();
    const [selectedFilter, setSelectedFilter] = React.useState('today');
    const [salesData, setSalesData] = React.useState<iSalesReport>({
        completedOrders: 0,
        ordersList: [],
        pendingOrders: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
   
    useEffect(() => {
        if (isLoading) {
            dispatch(enableLoading())
        }
        else {
            dispatch(disableLoading())
        }
    }, [isLoading, isSuccess, isError]);

    useEffect(() => {
        getSalesReport({ type: 'today', garageNumber: garageumber })
    }, [])

    const buttons = () => {
        return filters.map((e: filterType, index) => {
            return <Button title={e.toUpperCase()} key={index} buttonColor={selectedFilter === e ? 'primary' : 'black'} fontColor='white' onPress={() => {
                setSelectedFilter(e);
                getSalesReport({ type: e, garageNumber: garageumber })
            }} />
        })
    }

    const renderSingleOrder = (order: ICustomerOutputParams) => {
        return <View key={"listOfLatestTransactions"}
        style={[AppStyles.cardStyle, {
            height: 100, marginLeft: 10,
            marginRight: 10,
            borderBottomColor: order.isCompleted  ? "green": "red", borderBottomWidth: 3
        }]}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding:10 }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={[AppStyles.textSemibold, { fontSize: 18 }]}>{order?.serviceName}</Text>
                <Text style={[AppStyles.textBold, fontFamily.regular, { fontSize: 14, fontStyle: 'italic' }]}>{order?.serviceType}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={[AppStyles.textBold, { fontSize: 14 }]}>Date: {moment(order?.updatedAt).format('DD-MM-YYYY')}</Text>
                <Text style={[AppStyles.textBold, { fontSize: 25,color:'black' }]}>{rupeeSym} {order?.estimatedCost}</Text>
            </View>
        </View>
    </View>
    }
    return <View >
        <View style={[AppStyles.transparentCardStyle]}>
            <Text style={[fontFamily.light, { textTransform: "uppercase", fontSize: 18, marginBottom: 1, left: 10 }]}>Select Filter</Text>
            <View style={{ borderWidth: 0.4, margin: 10, borderColor: "rgba(0,0,0,0.2)" }}></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[{ display: "flex", flexDirection: "row", gap: 5 }]}>
                    {buttons()}
                </View>
            </ScrollView>
        </View>
        <View style={[AppStyles.cardStyle, { height: 100, marginLeft: 10, marginRight: 10,padding:10 }]}>
            <Text style={[AppStyles.textSemibold, { fontSize: 20, textTransform: 'uppercase' }]}> {`${selectedFilter} Sales`} </Text>
            <Text style={[AppStyles.textBold, { fontSize: 20 }]}>{rupeeSym} {data?.totalRevenue || 0} </Text>
        </View>
        <ScrollView style={{ height: '75%',marginBottom:500 }} >
            <FlashList
                data={data?.ordersList}
                estimatedItemSize={data?.ordersList.length}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return renderSingleOrder(item);
                }}
            />
        </ScrollView>
    </View>
}
export default Sales;