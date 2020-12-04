import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CardPreview({ name, onSubmit, gtin, image }) {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    {image ? (
                        <Image style={styles.logo} source={image} />
                    ):(
                        <Image style={styles.logo} source={require("../../../assets/product-not-found.png")} />
                    )}

                </View>
                <View style={styles.body}>
                    <Text style={styles.label}>{name}</Text>
                    <TouchableOpacity onPress={() => onSubmit(gtin)} style={styles.buttonShow}>
                        <Text style={styles.textButton}>Ver Producto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        height: 150,
        backgroundColor: '#F2F2F2',
        padding: 10,
    },
    content: {
        backgroundColor: 'white',
        flexDirection: "row",
        flex: 1,
        flexDirection: 'row'
    },
    logoContainer: {
        width: 150,
    },
    logo: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginRight: "auto",
        marginLeft: "auto",
    },
    body: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 0,
    },
    label: {
        fontSize: 24,
        color: '#132060',
        fontWeight: 'bold'
    },
    buttonShow: {
        marginTop: 20,
        marginBottom: 10,
        width: 150,
        backgroundColor: '#3971C3',
        color: 'white',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textButton: {
        color: 'white',
        fontSize: 22
    }
})
