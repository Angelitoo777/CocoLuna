<p align="center">
<img src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/100/external-markdown-a-lightweight-markup-language-with-plain-text-formatting-syntax-logo-duo-tal-revivo.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">COCOLUNA</h1></p>
<p align="center">
<em><code>❯ Una API escalable para la gestión de productos y usuarios.</code></em>
</p>
<p align="center">
</p>
<p align="center">Construido con las siguientes tecnologías:</p>
<p align="center">
<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=express,md,redis,sequelize,nodejs">
</a></p>
<br>

🔗 Tabla de Contenidos
📍 Visión General

👾 Características

📁 Estructura del Proyecto
  - 📂 Índice del Proyecto

🚀 Empezando
  - ☑️ Prerrequisitos
  - ⚙️ Instalación
  - 🤖 Uso
  - 🧪 Pruebas

📌 Hoja de Ruta

🔰 Contribuciones

🎗 Licencia

🙌 Agradecimientos

📍 Visión General
CocoLuna es una API RESTful robusta y escalable diseñada para gestionar productos, usuarios y procesos de compra. La arquitectura del proyecto está orientada a microservicios, utilizando un sistema de mensajería (RabbitMQ) para desacoplar procesos como la notificación por correo y la gestión de inventario, lo que garantiza una alta disponibilidad y un rendimiento óptimo.

👾 Características
Autenticación de Usuarios: Sistema de autenticación JWT para proteger las rutas y gestionar los permisos de administrador y usuario.

Gestión de Productos: Endpoints para crear, leer, actualizar y eliminar productos.

Gestión de Inventario: Servicio de consumidor (consumer) que actualiza el stock de productos de manera asíncrona tras una compra.

Notificaciones por Email: Servicio de consumidor que envía notificaciones por correo electrónico a los usuarios.

Múltiples Bases de Datos: Integración con ElasticSearch, MongoDB, MySQL y Redis para diferentes tipos de datos (búsquedas, datos no estructurados, datos relacionales y caché).

📁 Estructura del Proyecto
Bash

└── CocoLuna/
    ├── README.md
    ├── app.js
    ├── consumer/             # Manejadores de eventos y consumidores de RabbitMQ
    ├── controllers/          # Lógica de la API para las rutas
    ├── db/                   # Configuración y conexión a las diferentes bases de datos
    ├── middlewares/          # Funciones middleware (autenticación, permisos, etc.)
    ├── models/               # Definiciones de los modelos de datos (Sequelize y Mongoose)
    ├── package.json
    ├── routes/               # Rutas de la API (endpoints)
    ├── services/             # Lógica de negocio y servicios externos (RabbitMQ, etc.)
    └── validations/          # Lógica de validación de datos para los endpoints
    
📂 Índice del Proyecto

<details open>
<summary><b><code>COCOLUNA/</code></b></summary>
<details> <summary><b>root</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/app.js'>app.js</a></b></td>
<td>Punto de entrada de la aplicación, configura Express y los middlewares globales.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/package-lock.json'>package-lock.json</a></b></td>
<td>Define las dependencias exactas del proyecto.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/package.json'>package.json</a></b></td>
<td>Configuración del proyecto, scripts, dependencias.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>middlewares</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/middlewares/authMiddleware.js'>authMiddleware.js</a></b></td>
<td>Middleware para verificar tokens de autenticación (JWT).</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/middlewares/admin.middleware.js'>admin.middleware.js</a></b></td>
<td>Middleware para restringir el acceso a rutas solo para administradores.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>controllers</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/controllers/user.controller.js'>user.controller.js</a></b></td>
<td>Maneja la lógica de las peticiones relacionadas con los usuarios.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/controllers/product.controller.js'>product.controller.js</a></b></td>
<td>Maneja la lógica de las peticiones relacionadas con los productos.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>consumer</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/orderEmail.consumer.js'>orderEmail.consumer.js</a></b></td>
<td>Consume mensajes de la cola de RabbitMQ para enviar correos de confirmación de compra.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/orderStock.consumer.js'>orderStock.consumer.js</a></b></td>
<td>Consume mensajes de la cola para actualizar el inventario de productos.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/registerAndNotify.consumer.js'>registerAndNotify.consumer.js</a></b></td>
<td>Consume mensajes para notificar sobre nuevos registros de usuarios.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>models</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/models/user.model.js'>user.model.js</a></b></td>
<td>Definición del modelo de datos para los usuarios (Sequelize).</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/models/products.model.js'>products.model.js</a></b></td>
<td>Definición del modelo de datos para los productos (Sequelize).</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>routes</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/routes/product.routes.js'>product.routes.js</a></b></td>
<td>Define los endpoints de la API para la gestión de productos.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/routes/user.routes.js'>user.routes.js</a></b></td>
<td>Define los endpoints de la API para la gestión de usuarios.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>services</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/rabbitmq.services.js'>rabbitmq.services.js</a></b></td>
<td>Servicio para la conexión y publicación de mensajes en RabbitMQ.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/buyProducts.services.js'>buyProducts.services.js</a></b></td>
<td>Lógica de negocio para el proceso de compra de productos.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/registenAndNotify.services.js'>registenAndNotify.services.js</a></b></td>
<td>Lógica de negocio para el registro de usuarios y notificación.</td>
</tr>
</table>
<blockquote>
</details>
<details> <summary><b>validations</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/order.validation.js'>order.validation.js</a></b></td>
<td>Esquema de validación para las peticiones de compra.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/user.validation.js'>user.validation.js</a></b></td>
<td>Esquema de validación para los datos de usuario.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/product.validation.js'>product.validation.js</a></b></td>
<td>Esquema de validación para los datos de producto.</td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>db</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/elastic.db.js'>elastic.db.js</a></b></td>
<td>Configuración de la conexión a la base de datos de ElasticSearch.</td>
</tr>
<tr>
<td><b><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/mysql.db.js'>mysql.db.js</a></b></td>
<td>Configuración de la conexión a la base de datos de MySQL.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/redis.db.js'>redis.db.js</a></b></td>
<td>Configuración de la conexión a la base de datos de Redis.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/mongo.db.js'>mongo.db.js</a></b></td>
<td>Configuración de la conexión a la base de datos de MongoDB.</td>
</tr>
</table>
</blockquote>
</details>
</details>

🚀 Empezando
☑️ Prerrequisitos
Asegúrate de tener instalados los siguientes componentes:

Node.js: Versión 18.x o superior.

npm: Gestor de paquetes de Node.js (viene incluido con la instalación de Node.js).

Docker (Opcional): Para levantar las bases de datos y RabbitMQ de forma sencilla.

⚙️ Instalación
Clona el repositorio:

Bash

git clone https://github.com/Angelitoo777/CocoLuna
Navega al directorio del proyecto:

Bash

cd CocoLuna
Instala las dependencias del proyecto:

Bash

npm install
🤖 Uso
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

Bash

npm start
El servidor se ejecutará en el puerto 3000 por defecto. Puedes acceder a los endpoints de la API en http://localhost:3000.

🧪 Pruebas
Para ejecutar las pruebas del proyecto, utiliza el siguiente comando:

Bash

npm test
📌 Hoja de Ruta
[X] Task 1: Implementar la lógica inicial del core de la API.

[ ] Task 2: Agregar autenticación con JWT para las rutas de usuario.

[ ] Task 3: Implementar los servicios de RabbitMQ para las notificaciones y el inventario.

🔰 Contribuciones
¡Tu ayuda es bienvenida! Si quieres contribuir, puedes hacerlo de las siguientes maneras:

💬 Participa en las Discusiones: Comparte ideas, da feedback o haz preguntas.

🐛 Reporta Errores: Envía bugs encontrados o solicita nuevas funcionalidades.

💡 Envía Pull Requests: Revisa los PRs abiertos y envía los tuyos.

<details closed>
<summary>Guía de Contribución</summary>

Haz un Fork: Primero, haz un fork del repositorio a tu cuenta de GitHub.

Clona el Repositorio: Clona tu fork a tu máquina local.

Bash

git clone https://github.com/Angelitoo777/CocoLuna
Crea una Nueva Rama: Trabaja siempre en una nueva rama con un nombre descriptivo.

Bash

git checkout -b nueva-funcionalidad-x
Haz tus Cambios: Desarrolla y prueba tus cambios localmente.

Haz el Commit: Confirma tus cambios con un mensaje claro y conciso.

Bash

git commit -m 'Implementada nueva funcionalidad X.'
Sube los Cambios: Sube los cambios a tu repositorio forkeado.

Bash

git push origin nueva-funcionalidad-x
Crea un Pull Request: Crea un PR contra el repositorio original. Describe claramente los cambios que has hecho.

Revisión: Una vez que tu PR sea revisado y aprobado, se fusionará con la rama principal. ¡Gracias por tu contribución!

</details>

<details closed>
<summary>Gráfico de Contribuidores</summary>
<br>
<p align="left">
<a href="https://github.com{/Angelitoo777/CocoLuna/}graphs/contributors">
<img src="https://contrib.rocks/image?repo=Angelitoo777/CocoLuna">
</a>
</p>
</details>

🎗 Licencia
Este proyecto está protegido bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

🙌 Agradecimientos
Skill Icons: por la generación de los iconos de tecnologías.

Readme.so: por la plantilla inicial del README.

RabbitMQ: por el sistema de mensajería que hace posible la escalabilidad del proyecto.
