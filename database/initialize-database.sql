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

INSERT INTO t_clientes (cliente_id, nombre, email, telefono, vehiculo, placa, rol_cliente_id)
VALUES (0, 'Cliente eliminado', NULL, NULL, NULL, NULL, 4);




ALTER TABLE t_ventas
DROP CONSTRAINT t_ventas_cliente_id_fkey,
ADD CONSTRAINT t_ventas_cliente_id_fkey
FOREIGN KEY (cliente_id)
REFERENCES t_clientes(cliente_id)
ON DELETE SET DEFAULT;

ALTER TABLE t_ventas ALTER COLUMN cliente_id SET DEFAULT 0;


ALTER TABLE t_clientes
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN telefono DROP NOT NULL,
ALTER COLUMN placa DROP NOT NULL;



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
)
ALTER TABLE t_ventas
ADD COLUMN metodo_pago_id INT;
ALTER TABLE t_ventas
ADD CONSTRAINT fk_ventas_metodo_pago
FOREIGN KEY (metodo_pago_id)
REFERENCES t_metodos_pago(metodos_pago_id);




CREATE TABLE T_VENTAS_SOCIOS(
  venta_id INT REFERENCES t_ventas(venta_id),
  socio_id INT REFERENCES t_socios(socio_id),
  PRIMARY KEY (venta_id, socio_id)
)


CREATE TABLE T_CATEGORIAS_INVENTARIO (
  categorias_invetario_id SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL
);


CREATE TABLE T_PRODUCTOS(
  productos_id serial primary key,
  nombre varchar(200) not null,
  stock int not null,
  stock_minimo int default 0,
  precio decimal(10,2) not null,
  categoria_id INT REFERENCES T_CATEGORIAS_INVENTARIO(categorias_invetario_id)
)

create table T_METODOS_PAGO(
  metodos_pago_id serial primary key,
  nombre varchar(200) not null
)

create table T_CATEGORIAS_GASTOS(
  categorias_gastos_id serial primary key,
  nombre varchar(200) not null
)


CREATE TABLE T_GASTOS(
  gastos_id serial primary key,
  fecha date not null,
  descripcion text not null,
  monto decimal(10,2) not null,
  categoria_id int not null references t_categorias_gastos(categorias_gastos_id),
  metodo_pago int not null references t_metodos_pago(metodos_pago_id),
  socio_id int references t_socios(socio_id)
)
