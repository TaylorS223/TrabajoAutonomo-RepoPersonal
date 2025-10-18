Trabajo autonomo

#Integrantes
- Taylor Steven Alava Gresely 
- David Alejandro Vilañez Palma
- Pedro Alexandre Zambrano Pino 

para realizar este trabajo se utilizo NestJS que se inicio con el comando 

- npm i -g @nestjs/cli
- nest new gestor-empleo

se crearon varias las entidades, las cuales realice de momento Usuario (David Vilañez) para aplicar las practicas que hemos realizados en las otras practicas, aplicando el CRUD con los callbacks, promise y el async/await

para crear la entidad se realizo el siguiente comando en la terminal

- nest g resource

dentro se define el nombre de la entidad
y se utilizando los demás comando en la terminal para la base de datos en este caso vamos a utilizar mysql 

- npm install --save @nestjs/typeorm typeorm mysql2

y se configuro en el app.module.ts el comando de configuracion

el siguiente comando fue 

- npm i --save class-validator class-transformer


las entidades que tiene que realizar cada uno de los integrantes son

Taylor steven Alava Gresely 
- servico
- vacante 
- negociacion

David Alejandro Vilañez Palma 
- Usuario
- postulacion 

Pedro Alexandre Zambrano Pino 
- Contrato 
- categoria_trabajo 
- HojaVida

durante el plazo de esta semana cada integrante ira subiendo un commit del desarrollo de sus entidades que tienen que realizar


# compilar el codigo 

de momento solo tenemos la entidad Usuario adaptado, y ya funciona con NestJS, pero al no contar todavia con una base de datos de mysql no se puede ver la conexion. 

pero para compilar el codigo ejecutamos 

- npm run start:dev