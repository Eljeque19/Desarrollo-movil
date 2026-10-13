import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function PerfilScreen() {
    const [editando, setEditando] = useState(false);
    
    // Estados para guardar tu información
    const [nombre, setNombre] = useState("Estudiante Activo");
    const [nivel, setNivel] = useState("B1");
    const [sede, setSede] = useState("Sede Principal");

    // Cargar la información cuando entras a la pantalla
    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const perfilGuardado = await AsyncStorage.getItem('@mi_perfil');
                if (perfilGuardado) {
                    const datos = JSON.parse(perfilGuardado);
                    setNombre(datos.nombre);
                    setNivel(datos.nivel);
                    setSede(datos.sede);
                }
            } catch (e) {
                console.log("Error cargando perfil");
            }
        };
        cargarPerfil();
    }, []);

    // Guardar la información en el celular
    const guardarPerfil = async () => {
        try {
            const datos = { nombre, nivel, sede };
            await AsyncStorage.setItem('@mi_perfil', JSON.stringify(datos));
            setEditando(false);
            Alert.alert("¡Listo!", "Tu perfil ha sido actualizado");
        } catch (e) {
            Alert.alert("Error", "No se pudo guardar");
        }
    };

    return (
        <View style={{ flex: 1, padding: spacing.md, alignItems: 'center', marginTop: 50 }}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={60} color="#fff" />
            </View>
            
            {editando ? (
                // editar
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={styles.label}>Tu Nombre:</Text>
                    <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
                    
                    <Text style={styles.label}>Tu Nivel de Inglés:</Text>
                    <TextInput style={styles.input} value={nivel} onChangeText={setNivel} />
                    
                    <Text style={styles.label}>Sede de Estudio:</Text>
                    <TextInput style={styles.input} value={sede} onChangeText={setSede} />
                    
                    <TouchableOpacity onPress={guardarPerfil} style={styles.btnGuardar}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>💾 Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // MODO LECTURA
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 15 }}>{nombre}</Text>
                    <Text style={{ fontSize: 16, color: colors.textoSuave, marginTop: 5 }}>Nivel Actual: {nivel}</Text>
                    <Text style={{ fontSize: 16, color: colors.textoSuave }}>Sede: {sede}</Text>

                    <TouchableOpacity onPress={() => setEditando(true)} style={styles.btnEditar}>
                        <Text style={{ color: colors.primario, fontWeight: 'bold' }}>✏️ Editar Perfil</Text>
                    </TouchableOpacity>

                    <View style={styles.card}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Información de la App</Text>
                        <Text style={{ marginTop: 10, color: '#555' }}>Esta aplicación permite agendar clases de inglés y personalizar el perfil. Todo se guarda localmente en el celular del usuario.</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: { width: 100, height: 100, backgroundColor: colors.primario || '#007bff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginTop: 40, width: '100%', borderWidth: 1, borderColor: '#eee' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 15, width: '100%' },
    label: { fontWeight: 'bold', marginBottom: 5, color: '#444' },
    btnEditar: { marginTop: 20, padding: 10, backgroundColor: '#e6f7ff', borderRadius: 8, width: 150, alignItems: 'center' },
    btnGuardar: { marginTop: 10, padding: 15, backgroundColor: colors.primario || '#007bff', borderRadius: 8, alignItems: 'center' }
});