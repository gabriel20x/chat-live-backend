## Solución:

---

### 1. Instalar NestJS

para empezar debemos instalar nest cli e iniciar nuestro proyecto. esto nos dará las bases necesarias. 

```
$ npm i -g @nestjs/cli
$ nest new project-name
```
nos aseguramos que todo funciona correctamente utilizando el comando:
~~~
npm start
~~~

nos debería de salir en nuestro localhost:3000 (por defecto) un mensaje que dice "hello world"

---

### 2. Limpiar y definir una estructura para nuestro código.

en este repositorio, dividiremos nuestros modulos por carpetas independientes, esto nos permitirá tener un metodo de trabajo limpio.

eliminaremos los archivos app.service.ts y app.controller.ts, que nos proporciona automaticamente el cli. y por cada modulo nuevo que necesitemos crearemos una carpeta. ejemplo:

~~~
src
-nombre_carpeta
    |--nombre_carpeta.module.ts
    |--nombre_carpeta.controller.ts
    |--nombre_carpeta.service.ts
    |--nombre_carpeta.entity.ts
    |--dto
        |--any.dto.ts
~~~

* las **_entity_** nos ayudaran a mantener tipadas y sincronizadas la base de datos con el codigo.
* los **_dto_** nos ayudaran a definir el tipado de las peticiones que se realicen hacia el servidor o envien desde el servidor.

---

### 3. Documentación

Para realizar las pruebas necesarias y tener todas nuestras endpoints listadas a medida que las hacemos, debemos documentar nuestro codigo.
Aquí es donde OpenAPI entra en juego (swagger), lo que nos permitirá de una manera casi automatizada darnos una interfaz para acceder a ella.

para instalarlo, debemos seguir los pasos dados por la propia documentación de nestjs:
* [OpenAPI documentation](https://docs.nestjs.com/openapi/introduction)

Adicionalmente debemos agregar las siguientes configuraciones en nuestro main.ts, justo antes de ejecutar el servidor en el puerto. Agregando el siguiente codigo:

~~~ts
const config = new DocumentBuilder()
  .setTitle('Chat Live Documentation')
  .setDescription('Documentation for the chat live backend')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
~~~
Es importante conocer que el primer parametro en el metodo **`SwaggerModule.setup`** sera la extension de url en la cual se renderizará nuestra documentación.
En el ejemplo de NestJS, viene por defecto 'api', a modo de evitar confusiones lo cambiamos a 'docs'. 

Finalizado esto, podemos ver nuestra documentación en : [localhost:3000/docs](http://localhost:3000/docs)

Por ahora estará vacia, ya que no hemos declarado ningun controlador y/o esquemas. A medida que estes construyendolos utiliza los siguientes decoradores para mantener lo mejor documentado posible nuestra API:

* @ApiTags()
* @ApiBody()
* @ApiParameter()
* @ApiHideParameter()
* @ApiCreatedResponse()
* ... [OpenAPI decorators](https://docs.nestjs.com/openapi/decorators)

---

### 4. Gateway para Socket IO 

---

### 5. Database Connection y CRUD Mensajes

--- 

### 6. (optional) Authorization con JWT

