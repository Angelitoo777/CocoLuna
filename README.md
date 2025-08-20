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
		<img src="https://skillicons.dev/icons?i=express,md,redis,sequelize,nodejs,mysql,rabbitmq,elasticsearch">
	</a></p>
<br>

## 🔗 Tabla de Contenidos

- [📍 Visión General](#-visión-general)
- [👾 Características](#-características)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [📂 Índice del Proyecto](#-índice-del-proyecto)
- [🚀 Empezando](#-empezando)
  - [☑️ Prerrequisitos](#️-prerrequisitos)
  - [⚙️ Instalación](#️-instalación)
  - [🤖 Uso](#-uso)
  - [🧪 Pruebas](#-pruebas)
- [📌 Hoja de Ruta](#-hoja-de-ruta)
- [🔰 Contribuciones](#-contribuciones)
- [🎗 Licencia](#-licencia)
- [🙌 Agradecimientos](#-agradecimientos)

---

## 📍 Visión General

CocoLuna es una API RESTful robusta y escalable diseñada para gestionar productos, usuarios y procesos de compra. La arquitectura del proyecto está orientada a microservicios, utilizando un sistema de mensajería (RabbitMQ) para desacoplar procesos como la notificación por correo y la gestión de inventario, lo que garantiza una alta disponibilidad y un rendimiento óptimo.

---

## 👾 Características

* **Autenticación de Usuarios**: Sistema de autenticación JWT para proteger las rutas y gestionar los permisos de administrador y usuario.
* **Gestión de Productos**: Endpoints para crear, leer, actualizar y eliminar productos.
* **Gestión de Inventario**: Servicio de consumidor (consumer) que actualiza el stock de productos de manera asíncrona tras una compra.
* **Notificaciones por Email**: Servicio de consumidor que envía notificaciones por correo electrónico a los usuarios.
* **Múltiples Bases de Datos**: Integración con ElasticSearch, MongoDB, MySQL y Redis para diferentes tipos de datos (búsquedas, datos no estructurados, datos relacionales y caché).

---

## 📁 Estructura del Proyecto

```sh
└── CocoLuna/
    ├── README.md
    ├── app.js
    ├── consumer/             # Manejadores de eventos y consumidores de RabbitMQ
    ├── controllers/          # Lógica de la API para las rutas
    ├── db/                   # Configuración y conexión a las diferentes bases de datos
    ├── middlewares/          # Funciones middleware (autenticación, permisos, etc.)
    ├── models/               # Definiciones de los modelos de datos (Sequelize y Mongoose)
    ├── package.json
    ├── routes/               # Rutas de la API (endpoints)
    ├── services/             # Lógica de negocio y servicios externos (RabbitMQ, etc.)
    └── validations/          # Lógica de validación de datos para los endpoints
    
```
📂 Índice del Proyecto
<details open>
		<summary><b><code>COCOLUNA/</code></b></summary>
		<details>
				<summary><b>root</b></summary>
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
		<details> 
				<summary><b>middlewares</b></summary>
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
</blockquote>
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
	
---

## 🚀 Empezando

### ☑️ Prerrequisitos

Asegúrate de tener instalados los siguientes componentes:

- **Node.js:** Versión 18.x o superior.

- **npm:** Gestor de paquetes de Node.js (viene incluido con la instalación de Node.js).

- **Docker (Opcional):** Para levantar las bases de datos y RabbitMQ de forma sencilla.

### ⚙️ Instalación

Instale CocoLuna utilizando uno de los siguientes métodos:

**Construir desde la fuente:**

1. Clonar el repositorio CocoLuna:
```sh
❯ git clone https://github.com/Angelitoo777/CocoLuna
```

2. Navegue hasta el directorio del proyecto:
```sh
❯ cd CocoLuna
```

3. Instalar las dependencias del proyecto:


**Usando `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




### 🤖 Uso
Ejecute CocoLuna usando el siguiente comando:
**Usando `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run dev
```

---


## 🎗 Licencia
Este proyecto está protegido bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

---

## 🙌 Agradecimientos
Skill Icons - por la generación de los iconos de tecnologías.

Readme.so - por la plantilla inicial del README.

RabbitMQ - por el sistema de mensajería que hace posible la escalabilidad del proyecto.

---
