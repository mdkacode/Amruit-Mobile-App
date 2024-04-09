import React from 'react';
import { Text, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import { rupeeSym } from '../../utils/AppConstants';
import { ScrollView } from 'react-native-gesture-handler';

const Sales = () => {

    return <View >

        <View style={[AppStyles.cardStyle, { height: 100, marginLeft: 10, marginRight: 10 }]}>
            <Text style={[AppStyles.textSemibold, { fontSize: 20, textTransform: 'uppercase' }]}> Daily Sales </Text>
            <Text style={[AppStyles.textBold, { fontSize: 20 }]}>{rupeeSym} 20000</Text>
        </View>
        <ScrollView style={{height:'70%'}} >
            <View key={"listOfLatestTransactions"}
                style={[AppStyles.cardStyle, {
                    height: 100, marginLeft: 10,
                    marginRight: 10,
                    borderBottomColor: "green", borderBottomWidth: 3
                }]}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={[AppStyles.textSemibold, { fontSize: 18 }]}>Mayank Dwivedi</Text>
                        <Text style={[AppStyles.textLight, { fontSize: 14, fontStyle: 'italic' }]}>General Service</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={[AppStyles.textLight, { fontSize: 14 }]}>Date: 12/12/2021</Text>
                        <Text style={[AppStyles.textLight, { fontSize: 14 }]}>{rupeeSym} 2000</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
}
export default Sales;