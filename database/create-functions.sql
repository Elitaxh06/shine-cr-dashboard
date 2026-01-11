CREATE OR REPLACE function fn_create_partners(
  p_nombre varchar,
  p_porcentar_participacion decimal,
  p_email varchar,
  p_telefono varchar,
  p_inversion_inicial decimal,
  p_ganancian_neta decimal,
  p_ventas_generadas int,
  p_gastos_generados int,
  p_rol_id int
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' 
   OR p_porcentar_participacion IS NULL
   OR trim(p_email) = '' 
   OR trim(p_telefono) = ''
   OR p_inversion_inicial IS NULL
   OR p_ganancian_neta IS NULL
   or p_ventas_generadas IS NULL
   or p_gastos_generados IS NULL
   OR p_rol_id IS NULL
    THEN
  return query
    select 'warning', 'Debe completar todos los campos';
  return;
  end if;
  begin
    insert into t_socios (
      nombre, porcentaje_participacion, email, telefono, inversion_inicial, ganancia_neta, ventas_generadas, gastos_generados, rol_id
    )
    values(p_nombre,p_porcentar_participacion,p_email,p_telefono,p_inversion_inicial,p_ganancian_neta, p_ventas_generadas, p_gastos_generados, p_rol_id);
    return query
    select 'success', 'Socio agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;


SELECT * FROM fn_create_partners(
  'Esteban Pizarro',
  35,
  'elias@gmail.com',
  '83745485',
  20000.00,
  0.00,
  0,
  0,
  1
);




select * from fn_read_partners()

CREATE OR REPLACE function fn_create_roles(
  p_nombre varchar,
  p_descripcion text
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' 
   OR trim(p_descripcion) = '' then
  return query
    select 'warning', 'Debe completar todos los campos';
  return;
  end if;
  begin
    insert into t_roles_socios (
      nombre, descripcion
    )
    values(p_nombre,p_descripcion);
    return query
    select 'success', 'Rol de socio agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;

SELECT * FROM t_ventas

select * from fn_read_ventas

DROP FUNCTION fn_create_venta(date,integer,integer,numeric,integer,integer[])


CREATE OR REPLACE FUNCTION fn_create_venta(
  p_fecha DATE,
  p_cliente_id INT,
  p_servicio_id INT,
  p_monto DECIMAL,
  p_metodo_pago_id int,
  p_socios INT[]    
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_venta_id INT;
  v_cantidad_socios INT;
  v_monto_por_socio DECIMAL;
BEGIN
  -- Validar campos obligatorios
  IF p_fecha IS NULL
     OR p_cliente_id IS NULL
     OR p_servicio_id IS NULL
     OR p_monto IS NULL
     OR p_metodo_pago_id IS NULL THEN
    RETURN QUERY
      SELECT 'warning', 'Debe completar todos los campos obligatorios';
    RETURN;
  END IF;

  -- Validar que el cliente exista
  IF NOT EXISTS (SELECT 1 FROM t_clientes WHERE cliente_id = p_cliente_id) THEN
    RETURN QUERY
      SELECT 'warning', 'El cliente seleccionado no existe';
    RETURN;
  END IF;

  -- Validar servicio
  IF NOT EXISTS (SELECT 1 FROM t_servicios WHERE servicio_id = p_servicio_id) THEN
    RETURN QUERY
      SELECT 'warning', 'El servicio seleccionado no existe';
    RETURN;
  END IF;

  IF NOT exists(select 1 from t_metodos_pago where metodos_pago_id = p_metodo_pago_id) then
    return query
      select 'warning', 'El metodo de pago seleccionado no existe'
    return;
  end if;

  -- Validar socios participantes
  IF p_socios IS NULL OR array_length(p_socios, 1) = 0 THEN
    RETURN QUERY
      SELECT 'warning', 'Debe seleccionar al menos un socio para la venta';
    RETURN;
  END IF;

  -- Contar socios
  v_cantidad_socios := array_length(p_socios, 1);

  -- Calcular monto por socio
  v_monto_por_socio := p_monto / v_cantidad_socios;

  -- Crear la venta
  INSERT INTO t_ventas(
    fecha,
    cliente_id,
    servicio_id,
    monto,
    metodo_pago_id
  )
  VALUES(
    p_fecha,
    p_cliente_id,
    p_servicio_id,
    p_monto,
    p_metodo_pago_id
  )
  RETURNING venta_id INTO v_venta_id;

  -- Insertar socios participantes
  INSERT INTO t_ventas_socios(venta_id, socio_id)
  SELECT v_venta_id, unnest(p_socios);

  -- Actualizar ventas generadas correctamente (solo la parte que le toca)
  UPDATE t_socios
  SET ventas_generadas = ventas_generadas + v_monto_por_socio
  WHERE socio_id = ANY(p_socios);

  RETURN QUERY
    SELECT 'success', 'La venta fue registrada con éxito';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 'error', SQLERRM;
END
$$;




SELECT tgname, tgrelid::regclass
FROM pg_trigger
WHERE tgrelid = 't_ventas'::regclass;


CREATE OR REPLACE FUNCTION fn_create_cliente(
  p_nombre VARCHAR,
  p_email VARCHAR,
  p_telefono VARCHAR,
  p_vehiculo VARCHAR,
  p_placa VARCHAR,
  p_rol_cliente_id INT
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validar campos obligatorios
  IF trim(p_nombre) = '' THEN
    RETURN QUERY
      SELECT 'warning', 'Debe ingresar el nombre del cliente';
    RETURN;
  END IF;

  -- Validar rol (opcional)
  IF p_rol_cliente_id IS NOT NULL AND
     NOT EXISTS (SELECT 1 FROM t_roles_clientes WHERE roles_clientes_id = p_rol_cliente_id) THEN
    RETURN QUERY
      SELECT 'warning', 'El rol de cliente no existe';
    RETURN;
  END IF;

  -- Insertar cliente
  INSERT INTO t_clientes(
    nombre,
    email,
    telefono,
    vehiculo,
    placa,
    rol_cliente_id
  )
  VALUES(
    p_nombre,
    p_email,
    p_telefono,
    p_vehiculo,
    p_placa,
    p_rol_cliente_id
  );

  RETURN QUERY
    SELECT 'success', 'Cliente registrado con éxito';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 'error', SQLERRM;
END
$$;




CREATE OR REPLACE FUNCTION fn_create_servicio(
  p_nombre VARCHAR,
  p_descripcion TEXT,
  p_precio_base DECIMAL
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validar campos obligatorios
  IF trim(p_nombre) = '' THEN
    RETURN QUERY
      SELECT 'warning', 'Debe ingresar el nombre del servicio';
    RETURN;
  END IF;

  IF p_precio_base IS NULL OR p_precio_base < 0 THEN
    RETURN QUERY
      SELECT 'warning', 'Debe ingresar un precio base válido';
    RETURN;
  END IF;

  -- Insertar servicio
  INSERT INTO t_servicios(
    nombre,
    descripcion,
    precio_base
  )
  VALUES(
    p_nombre,
    p_descripcion,
    p_precio_base
  );

  RETURN QUERY
    SELECT 'success', 'Servicio registrado con éxito';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 'error', SQLERRM;
END
$$;

select * from fn_create_servicio('Premium', 'Todo lo del Lavado Completo (Popular)|Encerado y pulido exterior|Limpieza profunda de asientos y alfombras|Aspirado completo del interior|Limpieza y protección de plásticos y paneles internos|Tratamiento especial de llantas y neumáticos|Limpieza de motor|Desinfección completa|Aromatizante premium dentro del vehículo|Protección UV', 15000)
select * from t_servicios


CREATE OR REPLACE FUNCTION fn_create_role_client(
  p_nombre varchar
)
returns table(
  msj_tipo text,
  msj_texto text
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validar campos obligatorios
  IF trim(p_nombre) = '' THEN
    RETURN QUERY
      SELECT 'warning', 'Debe ingresar el nombre del rol';
    RETURN;
  END IF;

  -- Insertar servicio
  INSERT INTO t_roles_clientes(
    nombre
  )
  VALUES(
    p_nombre
  );

  RETURN QUERY
    SELECT 'success', 'Rol registrado con éxito';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 'error', SQLERRM;
END
$$;

SELECT * FROM fn_create_role_client('Genérico')


CREATE OR REPLACE function fn_create_categoria_inventario(
  p_nombre varchar
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' then
  return query
    select 'warning', 'Debes completar el nombre.';
  return;
  end if;
  begin
    insert into T_CATEGORIAS_INVENTARIO (
      nombre
    )
    values(p_nombre);
    return query
    select 'success', 'Categoria de inventario agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;

CREATE OR REPLACE function fn_create_productos(
  p_nombre varchar,
  p_stock int,
  p_stock_minimo int,
  p_precio_decimal decimal,
  p_categoria_inventario_id int
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' 
    OR p_stock IS NULL
    OR p_stock_minimo is null
    or p_precio_decimal is null
    or p_categoria_inventario_id is null
    THEN
  return query
    select 'warning', 'Debe completar todos los campos';
  return;
  end if;
  begin
    insert into T_PRODUCTOS
    (nombre, stock, stock_minimo, precio, categoria_id)

    values(p_nombre, p_stock, p_stock_minimo, p_precio_decimal, p_categoria_inventario_id);
    return query
    select 'success', 'Producto agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;

select * from t_categorias_inventario
select * from t_clientes


CREATE OR REPLACE function fn_create_categoria_gastos(
  p_nombre varchar
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' then
  return query
    select 'warning', 'Debes completar el nombre.';
  return;
  end if;
  begin
    insert into T_CATEGORIAS_GASTOS (
      nombre
    )
    values(p_nombre);
    return query
    select 'success', 'Categoria de inventario agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;


CREATE OR REPLACE function fn_create_metodos_pago(
  p_nombre varchar
)
returns table(
  msj_tipo text,
  msj_texto text
)

as $$
begin
  -- validar campos obligatorios 
  IF trim(p_nombre) = '' then
  return query
    select 'warning', 'Debes completar el nombre.';
  return;
  end if;
  begin
    insert into T_METODOS_PAGO (
      nombre
    )
    values(p_nombre);
    return query
    select 'success', 'Categoria de inventario agregado correctamente.';
    return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;


CREATE OR REPLACE FUNCTION fn_create_gastos(
  p_fecha DATE,
  p_descripcion TEXT,
  p_monto DECIMAL,
  p_categoria_id INT,
  p_metodo_pago_id INT,
  p_socio_id INT
)
RETURNS TABLE(
  msj_texto TEXT,
  msj_tipo TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_cantidad_socios INT;
BEGIN
  -- validar campos obligatorios
  IF p_fecha IS NULL
     OR trim(p_descripcion) = ''
     OR p_monto IS NULL
     OR p_categoria_id IS NULL
     OR p_metodo_pago_id IS NULL
     OR p_socio_id IS NULL THEN
    RETURN QUERY
      SELECT 'warning', 'Debe completar todos los campos obligatorios';
    RETURN;
  END IF;

  SELECT COUNT(*)
  INTO v_cantidad_socios
  FROM t_socios;

  IF v_cantidad_socios = 0 THEN
    RETURN QUERY
      SELECT 'error', 'No hay socios registrados';
    RETURN;
  END IF;

  -- insertar gasto
  INSERT INTO t_gastos(
    fecha,
    descripcion,
    monto,
    categoria_id,
    metodo_pago,
    socio_id
  )
  VALUES (
    p_fecha,
    p_descripcion,
    p_monto,
    p_categoria_id,
    p_metodo_pago_id,
    p_socio_id
  );

  -- repartir gasto entre todos los socios
  UPDATE t_socios
  SET gastos_generados =
    COALESCE(gastos_generados, 0) + (p_monto / v_cantidad_socios)
  WHERE socio_id IS NOT NULL;

  RETURN QUERY
    SELECT 'success', 'Gasto registrado correctamente';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 'error', 'Error al insertar: ' || SQLERRM;
END;
$$;

