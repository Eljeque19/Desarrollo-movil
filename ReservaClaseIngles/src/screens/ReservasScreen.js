import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing } from "../theme";

export default function ReservasScreen() {
    const [misReservas, setMisReservas] = useState([]);

    const cargarReservas = async () => {
        try {
            const reservasGuardadas = await AsyncStorage.getItem('@mis_reservas');
            if (reservasGuardadas !== null) {
                setMisReservas(JSON.parse(reservasGuardadas));
            }
        } catch (error) {
            console.log("Error cargando reservas");
        }
    };

    const limpiarReservas = async () => {
        await AsyncStorage.removeItem('@mis_reservas');
        setMisReservas([]);
    };

    useEffect(() => {
        cargarReservas();
    }, []);

    return (
        <View style={{ flex: 1, padding: spacing.md }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>Mis Clases Agendadas</Text>

            <TouchableOpacity onPress={cargarReservas} style={{ marginBottom: 15, padding: 10, backgroundColor: '#e6f7ff', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ color: colors.primario, fontWeight: 'bold' }}>🔄 Refrescar Mis Reservas</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                {misReservas.length === 0 ? (
                    <Text style={{ color: colors.textoSuave, textAlign: 'center', marginTop: 50 }}>No tienes clases reservadas aún.</Text>
                ) : (
                    misReservas.map((clase, index) => (
                        <View key={index} style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#bae7ff', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: clase.profesor.foto }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{clase.titulo}</Text>
                                <Text style={{ color: '#555', fontSize: 13 }}>{clase.profesor.nombre} - {clase.modalidad}</Text>
                                <Text style={{ color: colors.primario, marginTop: 5, fontSize: 12, fontWeight: 'bold' }}>
                                    {clase.horarios[0]} {/* Muestra el primer horario sugerido */}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {misReservas.length > 0 && (
                <TouchableOpacity onPress={limpiarReservas} style={{ padding: 15, alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Borrar todas mis reservas</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}