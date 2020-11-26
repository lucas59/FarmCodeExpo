import React from 'react'
import { View, Text, Dimensions, StyleSheet, Platform, BackHandler } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import { notifyConditionsFail } from '../../Utils/UtilsSession';

export default function OverlayTermsAndConditions(props) {

    const width = Dimensions.get('window').width;
    const heigth = Dimensions.get('window').height;

    const closeApp = () => {
        if (Platform.OS = 'android') {
            notifyConditionsFail().then(() => {
                BackHandler.exitApp()
            })
        }
    }

    return (
        <Overlay visible={props.visible} overlayStyle={{ width: width - 20, height: heigth - 80 }} onBackdropPress={props.handleOverlay} >
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Icon name="text-document" color={"#6aa6ff"} size={60} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Términos y Condiciones</Text>
                        <Text style={styles.subtitle}>Actualizado 10 Noviembre, 2020</Text>
                    </View>
                </View>
                <ScrollView indicatorStyle="black" style={styles.body}>
                    <Text style={styles.conditions}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quae quo asperiores earum corrupti excepturi consectetur neque harum eligendi ratione at dolorem accusamus dolor, illo nobis et eveniet nulla quod?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, doloribus nesciunt. Est minus nobis non, cumque iste numquam fugiat et dignissimos debitis similique dolore ad reiciendis beatae assumenda fuga! In.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error atque, corrupti praesentium repudiandae aspernatur assumenda sit? Ipsa minima excepturi et vero tempore, dolores tempora sed magni nobis eius, dolor reprehenderit!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error culpa voluptatum eius, earum cumque beatae doloremque repudiandae excepturi, necessitatibus aut explicabo? Doloremque eius accusamus nihil pariatur nisi eos, saepe id.
                    </Text>
                </ScrollView>
                <View style={styles.footer}>
                    <Button style={{ minWidth: 170 }} buttonStyle={{ height: 50 }} titleStyle={{ fontWeight: 'bold' }} type='outline' title="Rechazar" onPress={() => closeApp()} />
                    <Button style={{ minWidth: 150 }} buttonStyle={{ height: 50 }} titleStyle={{ fontWeight: 'bold' }} type="solid" title="Aceptar" onPress={props.onAcepted.bind(this)} />
                </View>
            </View>
        </Overlay>

    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#595959',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#bfbfbf',
        textAlign: 'center'
    },
    body: {
        marginHorizontal: 20,
        marginVertical: 10,
        overflow: 'scroll',
    },
    conditions: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row', justifyContent: "space-around", alignItems: 'center',
        marginVertical: 20
    }
})
