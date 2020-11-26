import React from "react";
import { View, Text, Image, BackHandler } from "react-native";
import { styles } from "../../Styles/StylesGenerals";
//import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";
import OverlayTermsAndConditions from "../Conditions/OverlayTermsAndConditions";
import AsyncStorage from "@react-native-community/async-storage";
import { notifySuccess, notifyWelcomeConditions } from "../../Utils/UtilsProducts";
import { notifyConditionsShow, notifyConditionsHidden } from '../../Utils/UtilsGenerals'
import { StackActions } from "react-navigation";
export default class Conditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conditions: false,
        };
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: "Condiciones legales",
            headerStyle: styles.headerStyle,
            headerTintColor: 'white',
        };
    };

    handleOverlay = () => {
        this.setState({ conditions: !this.state.conditions })
        if (!this.state.conditions == true) {
            notifyConditionsShow();
        } else {
            notifyConditionsHidden();
        }
    }

    handlePress = () => {

        AsyncStorage.setItem('conditions', 'true').then((value) => {
            this.setState({ conditions: false });
            this.props.navigation.replace("Scanner");
            const resetAction = StackActions.reset({

                key:Escaner,
                newKey: Escaner,
                routeName:Scanner
                
                });
                this.props.navigation.dispatch(resetAction);
        })
    }
    componentDidMount() {
        notifySuccess().then(() => {
            notifyWelcomeConditions();
        })
    }

    render() {
        const { conditions } = this.state;

        return (
            <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
                <Text style={{ color: '#203966', fontSize: 20, fontWeight: 'bold' }}>Debe aceptar las condiciones legales para utilizar la aplicación</Text>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}>
                    <Image source={require("../../../assets/logo-marca-agua.png")} style={{ width: 220, height: 220 }} />
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ textAlign: 'center', color: "#277eff", fontWeight: 'bold', fontSize: 18 }}>Powered by </Text>
                        <Image source={require("../../../assets/logo-ronda.png")} style={{ width: 200, height: 60, marginVertical: 10 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                    <Button buttonStyle={{ height: 50, minWidth: 170 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => this.handleOverlay()} type='outline' title="Ver condiciones" />
                    <Button buttonStyle={{ height: 50, minWidth: 150 }} titleStyle={{ fontWeight: 'bold' }} type="solid" title="Aceptar" onPress={() => this.handlePress()} />
                </View>
                <OverlayTermsAndConditions visible={conditions} handleOverlay={this.handleOverlay} onRejection={this.onRejection} onAcepted={this.handlePress} />
            </View>
        );
    }
}
