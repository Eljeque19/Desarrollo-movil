import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InicioScreen from "./InicioScreen";
import ReservasScreen from "./ReservasScreen";
import PerfilScreen from "./PerfilScreen";
import { colors } from "../theme";

export default function MainScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [tabActiva, setTabActiva] = useState("Inicio");

    return (
        <View style={{ flex: 1, backgroundColor: colors.fondo, paddingTop: insets.top }}>
            
            <View style={{ flex: 1 }}>
                {tabActiva === "Inicio" && <InicioScreen navigation={navigation} />}
                {tabActiva === "Reservas" && <ReservasScreen />}
                {tabActiva === "Perfil" && <PerfilScreen />}
            </View>

            <View style={[styles.tabBar, { paddingBottom: insets.bottom || 10 }]}>
                <TouchableOpacity style={styles.tabItem} onPress={() => setTabActiva("Inicio")}>
                    <Ionicons name="home" size={24} color={tabActiva === "Inicio" ? colors.primario : colors.textoSuave} />
                    <Text style={{ color: tabActiva === "Inicio" ? colors.primario : colors.textoSuave, fontSize: 12 }}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => setTabActiva("Reservas")}>
                    <Ionicons name="calendar" size={24} color={tabActiva === "Reservas" ? colors.primario : colors.textoSuave} />
                    <Text style={{ color: tabActiva === "Reservas" ? colors.primario : colors.textoSuave, fontSize: 12 }}>Reservas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => setTabActiva("Perfil")}>
                    <Ionicons name="person" size={24} color={tabActiva === "Perfil" ? colors.primario : colors.textoSuave} />
                    <Text style={{ color: tabActiva === "Perfil" ? colors.primario : colors.textoSuave, fontSize: 12 }}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

