# Proyecto web

Implementado en [deno](https://deno.com/runtime) utilizando [Oak](https://deno.land/x/oak@v12.2.0), se puede visitar [aqui](https://desarrollo.deno.dev).
Probado en el navegador Edge de Microsotf.

## Pruebas en local

Para realizar pruebas en local sera necesrio instalar deno y MariaDB o MySQL. 

Una vez clonado el repositorio en los archivos db.ts y en api/db.ts se deben añadir las credenciales de la base de datos o incluirlas en un archivo .env

Para introducir los datos la base de datos ejecutar:

    deno task initdb

y para iniciar el servidor:

    deno task start
    