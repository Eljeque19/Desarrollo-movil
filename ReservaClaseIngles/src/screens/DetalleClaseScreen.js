import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing } from "../theme";
import { formatearPrecio } from "../data/clases";

export default function DetalleClaseScreen({ route, navigation }) {
    // Se recibe la información de la clase que el usuario selecciono
    const { clase } = route.params;

    const reservarClase = async () => {
        try {
            const reservas = await AsyncStorage.getItem('@mis_reservas');
            let lista = reservas ? JSON.parse(reservas) : [];
            lista.push(clase);
            await AsyncStorage.setItem('@mis_reservas', JSON.stringify(lista));
            Alert.alert("¡Éxito!", `Has reservado la clase: ${clase.titulo}`);
            navigation.goBack(); // Regresa al menú anterior automáticamente
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la reserva");
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.fondo }}>
            <Image source={{ uri: clase.imagen }} style={{ width: '100%', height: 250 }} />
            
            <View style={{ padding: spacing.md }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{clase.titulo}</Text>
                <Text style={{ color: colors.primario, fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>
                    {formatearPrecio(clase.precio)}
                </Text>
                
                <Text style={{ fontSize: 16, color: '#444', lineHeight: 24 }}>{clase.descripcion}</Text>

                <View style={{ marginTop: 25, padding: 15, backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#eee' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Tu Profesor</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: clase.profesor.foto }} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{clase.profesor.nombre}</Text>
                            <Text style={{ color: '#666', marginTop: 3 }}>📍 {clase.profesor.pais}</Text>
                            <Text style={{ color: '#e6a800', marginTop: 3 }}>⭐ {clase.rating} de calificación</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20, padding: 15, backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#eee' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Horarios Disponibles</Text>
                    {clase.horarios.map((horario, index) => (
                        <Text key={index} style={{ color: '#555', marginBottom: 8, fontSize: 15 }}>🕒 {horario}</Text>
                    ))}
                </View>

                <TouchableOpacity onPress={reservarClase} style={{ backgroundColor: colors.primario, padding: 15, borderRadius: 10, marginTop: 30, marginBottom: 40, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Reservar Cupo ({clase.cupos} disponibles)</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}