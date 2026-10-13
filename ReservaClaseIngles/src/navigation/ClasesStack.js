import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import DetalleClaseScreen from "../screens/DetalleClaseScreen"; // Importamos la nueva pantalla

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}} 
            />
            {/* Se agrega la pantalla de detalle y se pone un boton arriba para volver atrás */}
            <Stack.Screen
                name="Detalle"
                component={DetalleClaseScreen}
                options={{ title: "Detalles de la Clase" }}
            />
        </Stack.Navigator>
    )
}