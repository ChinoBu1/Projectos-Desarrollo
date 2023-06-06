# Proyecto web

Implementado en [deno](https://deno.com/runtime) utilizando [Oak](https://deno.land/x/oak@v12.2.0), se puede visitar [aqui](https://desarrollo.deno.dev).

## Pruebas en local

Para realizar pruebas en local sera necesrio instalar deno y MariaDB o MySQL, una vez clonado el repositorio.

Para introducir los datos la base de datos se debe modiifcar db.ts y ejecutar:

    deno task initdb

y para iniciar el servidor:

    deno task start
