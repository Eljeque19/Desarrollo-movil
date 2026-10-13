@AGENTS.md

## Avances Recientes (Implementación de Pestañas y AsyncStorage)
- **MainScreen:** Se creó una navegación tipo Tab "casera" usando estados de React 
- **InicioScreen:** Se diseñó la vista principal donde se listan las clases disponibles por nivel y se implementó la función de guardar reservas
- **AsyncStorage:** Se uso `@react-native-async-storage/async-storage` para guardar y cargar las reservas de forma local en el dispositivo de forma persistente
- **ReservasScreen:** Pantalla funcional que lee del almacenamiento local y renderiza la lista de clases que el usuario ha agendado
- **PerfilScreen:** Interfaz estática sencilla mostrando la información del usuario logueado en la aplicación