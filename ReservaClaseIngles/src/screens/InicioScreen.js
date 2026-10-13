import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import NivelChip from "../components/NivelChip";
import { colors, spacing } from "../theme";
import { CLASES, NIVELES, formatearPrecio } from "../data/clases";

export default function InicioScreen() {
    // Empezamos con 'Todos' para que se muestren todas las clases al inicio
    const [nivelActivo, setNivelActivo] = useState("Todos");

    const reservarClase = async (clase) => {
        try {
            const reservasGuardadas = await AsyncStorage.getItem('@mis_reservas');
            let listaReservas = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
            listaReservas.push(clase);
            await AsyncStorage.setItem('@mis_reservas', JSON.stringify(listaReservas));
            Alert.alert("¡Éxito!", `Has reservado: ${clase.titulo}`);
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la reserva");
        }
    };

    // Se filtra con TODOS pero sino se filtra con el nivel
    const clasesFiltradas = nivelActivo === "Todos" 
        ? CLASES 
        : CLASES.filter(c => c.nivel === nivelActivo);

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
                {clasesFiltradas.length === 0 ? (
                    <Text style={{ marginTop: 20, color: colors.textoSuave }}>No hay clases para este nivel.</Text>
                ) : (
                    clasesFiltradas.map((clase) => (
                        <View key={clase.id} style={{ backgroundColor: '#fff', borderRadius: 15, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}>
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

                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    <Ionicons name="time-outline" size={16} color="#555" />
                                    <Text style={{ color: '#555', fontSize: 12, marginLeft: 5 }}>{clase.duracion} min  |  {clase.modalidad}</Text>
                                </View>
                                
                                <TouchableOpacity 
                                    onPress={() => reservarClase(clase)}
                                    style={{ backgroundColor: colors.primario, padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' }}
                                >
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Agendar ({clase.cupos} cupos)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}