import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function PerfilScreen() {
    return (
        <View style={{ flex: 1, padding: spacing.md, alignItems: 'center', marginTop: 50 }}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={60} color="#fff" />
            </View>
            
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 15 }}>Estudiante Activo</Text>
            <Text style={{ fontSize: 16, color: colors.textoSuave }}>Nivel Actual: B1</Text>
            <Text style={{ fontSize: 16, color: colors.textoSuave }}>Sede: Principal</Text>

            <View style={styles.card}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Información de la App</Text>
                <Text style={{ marginTop: 10, color: '#555' }}>Esta aplicación permite agendar y gestionar clases de inglés usando AsyncStorage para mantener la información local.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 100, 
        height: 100, 
        backgroundColor: colors.primario || '#007bff', 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginTop: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee'
    }
});