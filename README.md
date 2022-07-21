# Proyecto ARSW

## Escuela Colombiana de Ingeniería Julio Garavito

### Autor

- Juan Felipe Monroy Sierra (Equipo de Desarrollo)


## Proyecto final de ARSW (Arquitecturas de Software). Periodo 2022-i



### Docente 

- Luis Daniel Benavides Navarro (Dueño de Producto)

## Pagina en Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://slackarsw.herokuapp.com/)

### Descripción del producto
#### Descripción general

El sistema permite a los estudiantes comunicarse a traves de un chat institucional
que contara con canales de comunicación para cada materia, donde cada estudiante
podra proponer preguntas, y entre todos se podra generar una comunidad que en tiempo real
podran manifestar sus dudas y hablar de temas correspondientes a la materia.
Se enfoca en crear canales de algunas materias y canales dentro de las materias

### Antecedentes

#### Slack

Es una herramienta que provee un chat, en el cual se pueden crear canales de comunicación,
su uso suele ser para la administración de proyectos entre varias personas

![](https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/business/app-integrations/slack/Slack_logo_new.png)

### Manual para el usuario
Al ingresar a [ChatARSW](https://slackarsw.herokuapp.com/)

#### Autenticación

Primero pedira acceder a google como metodo de autenticación para lograr ingresar a la app.

![Pagina Principal](Manual/InicioSesion/AccederConGoogle.png)

El usuario debera ingresar un correo y una contraseña para poder acceder a la aplicación

![Autenticacion](Manual/InicioSesion/gmail.png)

#### Chat

Cuando se realize la autenticación satisfactoriamente, se podra entrar a la app, esta es
la pantalla principal de la aplicación.

![Pantalla Principal](Manual/chat/pantallachat.png)

Dentro de la aplicación existen dos funcionalidades importantes, crear canal y enviar mensajes, para poder 
enviar un mensaje primero tiene que existir un canal creado, lo cual se puede realizar con el simbolo de +
que se encuentra en la parte superior izquierda, donde dice canales de texto.

![Pantalla Chat](Manual/chat/pantallachat.png)

Así se pueden crear los canales, el usuario puede ponerle el nombre que desee

![Canales](Manual/chat/CreacionCanal.png)

Luego de esto, el canal creado aparecera en la parte izquierda, el usuario podrá dar click
y acceder al chat de este canal, donde al escribir en el campo de texto y darle enter, podrá
enviar mensajes al canal, los cuales podrán ver los demas usuarios conectados al canal, o los
que ingresen despues.

![Chat Mensajes](Manual/chat/EnvioMensajes.png)

#### Chat MultiUsuario

Aqui podemos ver una interacción entre dos usuarios.

![Chat Mensajes](Manual/chat/MasEnvioMensajes.png)

Para poder cerrar sesión, el usuario debe dar click en el engranaje que se 
encuentra en la parte inferior izquierda

![Chat Cerrar Sesion](Manual/chat/CerrarSesion.png)

## Base de datos

Como proveedor de base de datos usamos **Firebase**, la cual nos provee la autenticación con google y
la base de datos.

![Pantalla Principal FireBase](Manual/Firebase/Principal.png)

Allí podremos escoger el metodo de autenticación para ingresar a la pagina, para este proyecto se escogió
**Google**.

![Autenticación](Manual/Firebase/Autenticacion.png)

Dentro de **Firebase** para el proyecto, se selecciono la siguiente manera para guardar
los canales y mensajes, existe la colección padre que se llama **Canales**, la cual alberga
los canales creados dentro de este.

![Coleccion Padre](Manual/Firebase/BasedeDatos.png)

Dentro de cada canal se crea una colección llamada **messages**, donde dentro de esta
alberga los mensajes escritos por los usuarios, con un id y el respectivo mensaje

![Coleccion canal](Manual/Firebase/messages.png)

Dentro del mensaje no solo se guarda el ID, tambien la foto, el mensaje y el nombre del
usuario para enviar el mensaje al chat con todos estos componentes.

![Coleccion mensajes](Manual/Firebase/ChatMensaje.png)