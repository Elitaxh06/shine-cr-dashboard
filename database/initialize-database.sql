CREATE DATABASE shinecr

CREATE TABLE T_ROLES_SOCIOS(
  roles_socios_id SERIAL PRIMARY KEY,
  nombre varchar(100) unique not null,
  descripcion text
)

CREATE TABLE T_SOCIOS(
  socio_id serial primary key,
  nombre varchar(150) not null,
  porcentaje_participacion decimal(5,2) not null,
  email varchar(200) not null,
  telefono varchar(50) not null,
  inversion_inicial DECIMAL(10,2) not null,
  ganancia_neta DECIMAL(10,2) default 0 not null,
  rol_id INT references t_roles_socios(roles_socios_id) on delete set null
)
ALTER TABLE T_SOCIOS 
ADD COLUMN ventas_generadas int not null,
ADD Column gastos_generados int not null


CREATE TABLE T_roles_clientes(
  roles_clientes_id serial primary key,
  nombre varchar(100) not null
)

CREATE TABLE T_CLIENTES(
  cliente_id serial primary key,
  nombre varchar(150) not null,
  email varchar(200) not null,
  telefono varchar(200) not null,
  vehiculo varchar(150) null,
  placa varchar(100) null,
  rol_cliente_id INT references t_roles_clientes(roles_clientes_id) on delete set null
)


CREATE TABLE T_SERVICIOS(
  servicio_id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT not null,
  precio_base DECIMAL(10,2) not null
)

CREATE TABLE T_VENTAS(
  venta_id SERIAL PRIMARY KEY,
  fecha TIMESTAMP DEFAULT NOW(),
  cliente_id INT REFERENCES t_clientes(cliente_id),
  servicio_id INT REFERENCES t_servicios(servicio_id),
  monto DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL
)

CREATE TABLE T_VENTAS_SOCIOS(
  venta_id INT REFERENCES t_ventas(venta_id),
  socio_id INT REFERENCES t_socios(socio_id),
  PRIMARY KEY (venta_id, socio_id)
)