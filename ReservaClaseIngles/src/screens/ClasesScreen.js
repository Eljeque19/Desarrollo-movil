import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import LabelLevel from "../components/LabelLevel";
import NivelChip from "../components/NivelChip";
import { colors, radius, spacing, typography } from "../theme";
import { formatearPrecio, CLASES } from "../data/clases";

// Hay que tener NIVELES definidos en cualquier parte ya sea exportado o acá mismo 
const NIVELES = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState("");

    return (
        <View style>

            <View> 
                <Text>Aplicacion para clases de ingles</Text>
                <Ionicons name="search" size={10} color={colors.textoSuave} />
                <TextInput
                    placeholder="Buscar por nivel"
                    value={nivel}
                    onChangeText={setBusqueda}
                    autoCorrect={false}
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.textoSuave}
                            onPress={() => setBusqueda("")}
                        />
                    )
                }
            </View>
            <ScrollView
                style={{ flexGrow: 0 }}
                horizontal 
            >
                {
                    NIVELES.map((item, index) => (
                        <NivelChip
                            key={index}
                            etiqueta={item}
                            activo={item}
                            onPress={() => setNivel(item)}                    
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}