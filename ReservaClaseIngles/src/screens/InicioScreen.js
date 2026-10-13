import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 
import { Ionicons } from "@expo/vector-icons";

import NivelChip from "../components/NivelChip";
import { colors, spacing } from "../theme";
import { CLASES, NIVELES, formatearPrecio } from "../data/clases";

export default function InicioScreen({ navigation }) {
    const [nivelActivo, setNivelActivo] = useState("Todos");
    const [idsReservados, setIdsReservados] = useState([]);

    // Esta funcion lee la memoria de las reservas para saber que clases ya reservaste
    const cargarReservas = async () => {
        try {
            const reservas = await AsyncStorage.getItem('@mis_reservas');
            if (reservas) {
                const lista = JSON.parse(reservas);
                // Se hace con el id de las clases para que quede mas facil filtrarlas
                setIdsReservados(lista.map(clase => clase.id));
            } else {
                setIdsReservados([]); // Si no hay reservas, la lista está vacía
            }
        } catch (error) {
            console.log("Error leyendo reservas", error);
        }
    };

    // useFocusEffect ejecuta "cargarReservas" cada vez que miras esta pantalla
    useFocusEffect(
        useCallback(() => {
            cargarReservas();
        }, [])
    );

    // PASO 1: Filtramos por el nivel que tocaste o se muestran todos, depende cual seleccione
    const clasesPorNivel = nivelActivo === "Todos" 
        ? CLASES 
        : CLASES.filter(c => c.nivel === nivelActivo);
    
    // PASO 2: dejamos las clases que no están en la lista de los id reservados
    const clasesDisponibles = clasesPorNivel.filter(c => !idsReservados.includes(c.id));

    return (
        <View style={{ flex: 1, padding: spacing.md }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>Catálogo de Clases</Text>
            
            <View style={{ height: 50, marginBottom: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {NIVELES.map((item, index) => (
                        <NivelChip
                            key={index}
                            etiqueta={item}
                            activo={nivelActivo === item}
                            onPress={() => setNivelActivo(item)}                    
                        />
                    ))}
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {clasesDisponibles.length === 0 ? (
                    <Text style={{ marginTop: 20, color: colors.textoSuave, textAlign: 'center' }}>
                        No hay clases nuevas disponibles para este nivel.
                    </Text>
                ) : (
                    clasesDisponibles.map((clase) => (
                        <TouchableOpacity 
                            key={clase.id} 
                            onPress={() => navigation.navigate("Detalle", { clase })}
                            style={{ backgroundColor: '#fff', borderRadius: 15, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}
                        >
                            <Image 
                                source={{ uri: clase.imagen }} 
                                style={{ width: '100%', height: 120 }} 
                            />
                            
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>{clase.titulo}</Text>
                                    <Text style={{ color: colors.primario, fontWeight: 'bold' }}>{formatearPrecio(clase.precio)}</Text>
                                </View>
                                
                                <Text style={{ color: colors.textoSuave, marginTop: 5, fontSize: 12 }}>{clase.descripcion}</Text>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Image source={{ uri: clase.profesor.foto }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
                                    <Text style={{ color: '#555', fontSize: 13 }}>{clase.profesor.nombre} ({clase.profesor.pais})</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}