import React from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { colors, spacing } from "../theme";

export default function LabelLevel({ levelx }) {
    return (
        <View style={[styles.contenedor, { backgroundColor: colors.fondo }]}>
            <Text style={styles.texto}>{levelx}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        alignSelf: "auto", 
        paddingVertical: 3, 
        paddingHorizontal: spacing.md, 
        borderRadius: 999, // 'full' no es nativo de React Native, 999 hace bordes muy redondos
        borderWidth: 1, 
        borderColor: colors.borde || '#ccc',
    },
    texto: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 }
});