import react, { useState, useEffect } from "react";
import {View, Text, Image, Pressable, StyleSheet, TextInput} from "react-native";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";

import LabelLevel  from "./LabelLevel";
import NivelChip from "../components/NivelChip";
import {colors, radius, spacing, typography} from "../theme";
import {formatearPrecio, CLASES} from "../data/clases";

export default function ClasesScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState("");

    return (
        <view style>

            <view> 
                <text>Aplicacion para clases de ingles</text>
                <Ionicons name="Search" size={10} color={colors.textoSuave}/>
                <Textinput
                    placeholder = "Buscar por nivel"
                    value = {nivel}
                    onChangeText = {setbusqueda}
                    autoCorrect = {false}
                    />
                    {
                        busqueda.length > 0 && (
                            <Ionicons
                                name= "close-circle"
                                size={18}
                                color={colors.textoSuave}
                                onPress={() =>setBusqueda("")}
                                />
                        )
                    }
            </view>
            <ScrollView
                style = {{flewGrow: 0}}
                horizontal 
            >
                {
                    NIVELES.map((item) =>(
                        <NivelChip
                            etiqueta = {item}
                            activo = {item}
                            onPress ={() => setNivel(item)}                    
                        />
                    ))
                }


            </ScrollView>
        </view>
    )
}