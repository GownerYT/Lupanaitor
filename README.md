# Lupanaitor

Lupa digital para Android creada con React Native, Expo y TypeScript. La vista previa de la cámara se muestra dentro de la lente del diseño y los botones controlan el zoom digital disponible en el dispositivo.

## Desarrollo

```sh
npm install
npx expo start
```

Abre el proyecto en un dispositivo Android con Expo Go o en un emulador. Para usar la cámara se necesita conceder el permiso solicitado al iniciar la aplicación.

## Build Android

La configuración EAS incluye un perfil `preview` que genera un APK instalable y un perfil `production` para el Android App Bundle:

```sh
npx eas-cli build --platform android --profile preview
```

El build de EAS requiere iniciar sesión con una cuenta de Expo.
