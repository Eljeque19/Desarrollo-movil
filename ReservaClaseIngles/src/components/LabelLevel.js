import React from "react";
import {View, Text, StyleSheet} from "react-native"; 
import {colors, spacing} from "../theme"

export default function LabelLevel({}) {
    return (
        <View Style={[styles.contenedor, {backgroundColor: colors.fondo}]}>
            <Text style= {styles.texto}>{levelx} </Text>
        </View>
    )
}

const styles = styleSheet.create({
    contenedor: {
        alignSelf: "auto",
        paddingvertical: 3,
        paddinghorizontal: spacing.md,
        borderRadius: full,
        borderwidth: 1,
    },
    texto: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3}
})