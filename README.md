<p align="center">
    <img src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/100/external-markdown-a-lightweight-markup-language-with-plain-text-formatting-syntax-logo-duo-tal-revivo.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">COCOLUNA</h1></p>
<p align="center">
<em><code>❯ Una API escalable para la gestión de productos y usuarios.</code></em>
</p>
<p align="center">
</p>
<p align="center">Built with the tools and technologies:</p>
<p align="center">
<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=express,md,redis,sequelize">
</a></p>
<br>

🔗 Table of Contents
📍 Overview

👾 Features

📁 Project Structure
  - 📂 Project Index

🚀 Getting Started
  - ☑️ Prerequisites
  - ⚙️ Installation
  - 🤖 Usage
  - 🧪 Testing

📌 Project Roadmap

🔰 Contributing

🎗 License

🙌 Acknowledgments

📍 Overview
<code>❯ CocoLuna es una API RESTful robusta y escalable diseñada para gestionar productos, usuarios y procesos de compra. La arquitectura del proyecto está orientada a microservicios, utilizando un sistema de mensajería (RabbitMQ) para desacoplar procesos como la notificación por correo y la gestión de inventario, lo que garantiza una alta disponibilidad y un rendimiento óptimo.</code>

👾 Features
<code>❯

Autenticación de Usuarios: Sistema de autenticación JWT para proteger las rutas y gestionar los permisos de administrador y usuario.

Gestión de Productos: Endpoints para crear, leer, actualizar y eliminar productos.

Gestión de Inventario: Servicio de consumidor (consumer) que actualiza el stock de productos de manera asíncrona tras una compra.

Notificaciones por Email: Servicio de consumidor que envía notificaciones por correo electrónico a los usuarios.

Múltiples Bases de Datos: Integración con ElasticSearch, MongoDB, MySQL y Redis para diferentes tipos de datos (búsquedas, datos no estructurados, datos relacionales y caché).</code>

📁 Project Structure
Bash
```
└── CocoLuna/
    ├── README.md
    ├── app.js
    ├── consumer
    │   ├── orderEmail.consumer.js
    │   ├── orderStock.consumer.js
    │   └── registerAndNotify.consumer.js
    ├── controllers
    │   ├── product.controller.js
    │   └── user.controller.js
    ├── db
    │   ├── elastic.db.js
    │   ├── mongo.db.js
    │   ├── mysql.db.js
    │   └── redis.db.js
    ├── middlewares
    │   ├── admin.middleware.js
    │   └── authMiddleware.js
    ├── models
    │   ├── products.model.js
    │   └── user.model.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── product.routes.js
    │   └── user.routes.js
    ├── services
    │   ├── buyProducts.services.js
    │   ├── rabbitmq.services.js
    │   └── registenAndNotify.services.js
    └── validations
        ├── order.validation.js
        ├── product.validation.js
        └── user.validation.js
```
📂 Project Index
<details open>
<summary><b><code>COCOLUNA/</code></b></summary>
<details> <summary><b>root</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/app.js'>app.js</a></b></td>
<td><code>❯ Punto de entrada de la aplicación, configura Express y los middlewares globales.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/package-lock.json'>package-lock.json</a></b></td>
<td><code>❯ Define las dependencias exactas del proyecto.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/package.json'>package.json</a></b></td>
<td><code>❯ Configuración del proyecto, scripts, dependencias.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>middlewares</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/middlewares/authMiddleware.js'>authMiddleware.js</a></b></td>
<td><code>❯ Middleware para verificar tokens de autenticación (JWT).</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/middlewares/admin.middleware.js'>admin.middleware.js</a></b></td>
<td><code>❯ Middleware para restringir el acceso a rutas solo para administradores.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>controllers</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/controllers/user.controller.js'>user.controller.js</a></b></td>
<td><code>❯ Maneja la lógica de las peticiones relacionadas con los usuarios.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/controllers/product.controller.js'>product.controller.js</a></b></td>
<td><code>❯ Maneja la lógica de las peticiones relacionadas con los productos.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>consumer</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/orderEmail.consumer.js'>orderEmail.consumer.js</a></b></td>
<td><code>❯ Consume mensajes de la cola de RabbitMQ para enviar correos de confirmación de compra.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/orderStock.consumer.js'>orderStock.consumer.js</a></b></td>
<td><code>❯ Consume mensajes de la cola para actualizar el inventario de productos.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/consumer/registerAndNotify.consumer.js'>registerAndNotify.consumer.js</a></b></td>
<td><code>❯ Consume mensajes para notificar sobre nuevos registros de usuarios.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>models</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/models/user.model.js'>user.model.js</a></b></td>
<td><code>❯ Definición del modelo de datos para los usuarios (Sequelize).</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/models/products.model.js'>products.model.js</a></b></td>
<td><code>❯ Definición del modelo de datos para los productos (Sequelize).</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>routes</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/routes/product.routes.js'>product.routes.js</a></b></td>
<td><code>❯ Define los endpoints de la API para la gestión de productos.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/routes/user.routes.js'>user.routes.js</a></b></td>
<td><code>❯ Define los endpoints de la API para la gestión de usuarios.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>services</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/rabbitmq.services.js'>rabbitmq.services.js</a></b></td>
<td><code>❯ Servicio para la conexión y publicación de mensajes en RabbitMQ.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/buyProducts.services.js'>buyProducts.services.js</a></b></td>
<td><code>❯ Lógica de negocio para el proceso de compra de productos.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/services/registenAndNotify.services.js'>registenAndNotify.services.js</a></b></td>
<td><code>❯ Lógica de negocio para el registro de usuarios y notificación.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>validations</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/order.validation.js'>order.validation.js</a></b></td>
<td><code>❯ Esquema de validación para las peticiones de compra.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/user.validation.js'>user.validation.js</a></b></td>
<td><code>❯ Esquema de validación para los datos de usuario.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/validations/product.validation.js'>product.validation.js</a></b></td>
<td><code>❯ Esquema de validación para los datos de producto.</code></td>
</tr>
</table>
</blockquote>
</details>
<details> <summary><b>db</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/elastic.db.js'>elastic.db.js</a></b></td>
<td><code>❯ Configuración de la conexión a la base de datos de ElasticSearch.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/mysql.db.js'>mysql.db.js</a></b></td>
<td><code>❯ Configuración de la conexión a la base de datos de MySQL.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/redis.db.js'>redis.db.js</a></b></td>
<td><code>❯ Configuración de la conexión a la base de datos de Redis.</code></td>
</tr>
<tr>
<td><b><a href='https://github.com/Angelitoo777/CocoLuna/blob/master/db/mongo.db.js'>mongo.db.js</a></b></td>
<td><code>❯ Configuración de la conexión a la base de datos de MongoDB.</code></td>
</tr>
</table>
</blockquote>
</details>
</details>

🚀 Getting Started
☑️ Prerequisites
Before getting started with CocoLuna, ensure your runtime environment meets the following requirements:

Programming Language: JavaScript

Package Manager: Npm

⚙️ Installation
Install CocoLuna using one of the following methods:

Build from source:

Clone the CocoLuna repository:

Bash

❯ git clone https://github.com/Angelitoo777/CocoLuna
Navigate to the project directory:

Bash

❯ cd CocoLuna
Install the project dependencies:

Using npm   <img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />

Bash

❯ npm install
🤖 Usage
Run CocoLuna using the following command:
Using npm   <img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />

Bash

❯ npm start
🧪 Testing
Run the test suite using the following command:
Using npm   <img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />

Bash

❯ npm test
📌 Project Roadmap
[X] Task 1: <strike>Implementar la lógica inicial del core de la API.</strike>

[ ] Task 2: Agregar autenticación con JWT para las rutas de usuario.

[ ] Task 3: Implementar los servicios de RabbitMQ para las notificaciones y el inventario.

🔰 Contributing
💬 Join the Discussions: Comparte ideas, da feedback o haz preguntas.

🐛 Report Issues: Envía bugs encontrados o solicita nuevas funcionalidades.

💡 Submit Pull Requests: Revisa los PRs abiertos y envía los tuyos.

<details closed>
<summary>Contributing Guidelines</summary>

Fork the Repository: Primero, haz un fork del repositorio a tu cuenta de GitHub.

Clone Locally: Clona tu fork a tu máquina local.
   sh    git clone https://github.com/Angelitoo777/CocoLuna    

Create a New Branch: Trabaja siempre en una nueva rama con un nombre descriptivo.
   sh    git checkout -b nueva-funcionalidad-x    

Make Your Changes: Desarrolla y prueba tus cambios localmente.

Commit Your Changes: Confirma tus cambios con un mensaje claro y conciso.
   sh    git commit -m 'Implementada nueva funcionalidad X.'    

Push to github: Sube los cambios a tu repositorio forkeado.
   sh    git push origin nueva-funcionalidad-x    

Submit a Pull Request: Crea un PR contra el repositorio original. Describe claramente los cambios que has hecho.

</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Angelitoo777/CocoLuna/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Angelitoo777/CocoLuna">
   </a>
</p>
</details>

🎗 License
This project is protected under the MIT License. For more details, refer to the LICENSE file.

🙌 Acknowledgments
Skill Icons: por la generación de los iconos de tecnologías.

Readme.so: por la plantilla inicial del README.

RabbitMQ: por el sistema de mensajería que hace posible la escalabilidad del proyecto.
