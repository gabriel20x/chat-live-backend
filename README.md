# challenge: Chat en Vivo || NestJS, Socket.io, Next.js y RTK Query

## Parte 1: Configuración del Backend y Pruebas

### Objetivo:
Configurar un servidor backend utilizando NestJS y Socket.io para habilitar un chat en tiempo real. Crear endpoints para autenticación de usuarios, gestión de mensajes y la posibilidad de crear canales de presencia. Probar exhaustivamente la funcionalidad utilizando herramientas como Postman.

### Pasos a seguir:

1. Configuración del Proyecto Backend:

Crear un proyecto NestJS con las dependencias necesarias.
Establecer la autenticación de usuarios utilizando JWT (JSON Web Tokens) para asegurar el acceso a las funcionalidades del chat.

2. Comunicación en Tiempo Real:

Integrar Socket.io para gestionar la comunicación en tiempo real entre los usuarios.
Implementar endpoints para autenticación de usuarios (registro, inicio de sesión, etc.) utilizando controladores de NestJS.

3. Gestión de Mensajes y Canales de Presencia:

Crear un sistema de envío y recepción de mensajes utilizando websockets.
Agregar la funcionalidad para crear canales de presencia, permitiendo a los usuarios unirse a grupos específicos de chat.

4. Base de Datos:

Utilizar bases de datos como PostgreSQL o MongoDB para almacenar información de usuarios y mensajes.
Configurar las conexiones y modelos necesarios para interactuar con la base de datos.

5. Documentación:

Documentar todos los endpoints, funciones y modelos utilizando herramientas como Swagger para una referencia clara y concisa.
Realizar pruebas exhaustivas utilizando Postman para asegurarse de que el backend funcione correctamente en todas las situaciones.

## Parte 2: Construcción del Frontend con Next.js y RTK Query

- Objetivo:
Utilizar Next.js y RTK Query para construir una interfaz de usuario intuitiva y receptiva para el chat en tiempo real. Mostrar la lista de usuarios conectados, historial de mensajes y permitir enviar nuevos mensajes.

### Pasos a seguir:

1. Configuración del Proyecto Frontend:

Crear un proyecto Next.js con las dependencias necesarias.
Configurar RTK Query para manejar las solicitudes al backend, incluyendo la autenticación de usuarios.

2. Diseño de la Interfaz:

Diseñar una interfaz atractiva y receptiva que muestre la lista de usuarios conectados y el historial de mensajes.
Utilizar estilos CSS o librerías como Styled Components para dar formato a la interfaz.

3. Funcionalidad en Tiempo Real:

Implementar la capacidad de enviar y recibir mensajes en tiempo real utilizando websockets.


## EXTRAS:

- Agregar características adicionales según sea necesario, como la capacidad de eliminar mensajes, usar emojis, o cambiar el color del nombre de usuario.

- Implementación de la creación de canales de presencia. Si decides incluir esta característica, asegúrate de asignar un nombre claro y breve en inglés a cada canal.

### Documentación y Entrega:

Documentar el código de manera clara, explicando el propósito de cada componente y función.
Crear un repositorio Git (por ejemplo, en GitHub) con el código fuente completo del backend y frontend.
Proporcionar instrucciones claras para configurar y ejecutar tanto el backend como el frontend.
Incluir un breve documento explicando las decisiones de diseño y las tecnologías utilizadas en cada parte del proyecto.








