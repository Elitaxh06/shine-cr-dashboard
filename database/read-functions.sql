CREATE OR REPLACE FUNCTION fn_read_partners()
returns table(
  socio_id INT,
  nombre VARCHAR,
  porcentaje_participacion DECIMAL,
  email VARCHAR,
  telefono VARCHAR,
  inversion_inicial DECIMAL,
  ganancia_neta DECIMAL,
  rol_nombre varchar,
  ventas_generadas int,
  gastos_generados int,
  msj_tipo text,
  msj_texto text
)
language plpgsql
as $$
begin 
  if exists (select 1 from t_socios) then 
    return query 
      select 
        soc.socio_id,
        soc.nombre,
        soc.porcentaje_participacion,
        soc.email,
        soc.telefono,
        soc.inversion_inicial,
        soc.ganancia_neta,
        r.nombre AS rol_nombre,
        soc.ventas_generadas,
        soc.gastos_generados,
        'success' as msj_tipo,
        'Exito al realizar la accion' as msj_texto
      from t_socios soc
      left join t_roles_socios r
        on r.roles_socios_id = soc.rol_id;

  else 
    return query
      select 
        NULL::INT,
        NULL::VARCHAR,
        NULL::DECIMAL,
        NULL::VARCHAR,
        NULL::VARCHAR,
        NULL::DECIMAL,
        NULL::DECIMAL,
        NULL::varchar,
        NULL::INT,
        NULL::INT,
        'warning' as msj_tipo,
        'Actualmente no hay socios registrados.' as msj_texto;
  end if;

exception when others then 
  return query
    select 
      NULL::INT,
      NULL::VARCHAR,
      NULL::DECIMAL,
      NULL::VARCHAR,
      NULL::VARCHAR,
      NULL::DECIMAL,
      NULL::DECIMAL,
      NULL::varchar,
      NULL::INT,
      NULL::INT,
      'error' as msj_tipo,
      sqlerrm as msj_texto;
end
$$;


CREATE OR REPLACE FUNCTION fn_read_ventas()
RETURNS TABLE(
  venta_id INT,
  fecha TIMESTAMP,
  cliente_nombre VARCHAR,
  servicio_nombre VARCHAR,
  monto DECIMAL,
  metodo_pago VARCHAR,
  socios_participantes TEXT,
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM t_ventas) THEN
    RETURN QUERY
  SELECT 
    v.venta_id,
    v.fecha,
    c.nombre AS cliente_nombre,
    s.nombre AS servicio_nombre,
    v.monto,
    mp.nombre AS metodo_pago,
    COALESCE(
      STRING_AGG(so.nombre, ', ' ORDER BY so.nombre),
      'Sin socios'
    ) AS socios_participantes,
    'success' AS msj_tipo,
    'Éxito al realizar la acción' AS msj_texto
  FROM t_ventas v
  LEFT JOIN t_clientes c 
    ON c.cliente_id = v.cliente_id
  LEFT JOIN t_servicios s 
    ON s.servicio_id = v.servicio_id
  LEFT JOIN t_ventas_socios vs 
    ON vs.venta_id = v.venta_id
  LEFT JOIN t_socios so 
    ON so.socio_id = vs.socio_id
  LEFT JOIN t_metodos_pago mp 
    ON mp.metodos_pago_id = v.metodo_pago_id
  GROUP BY 
    v.venta_id, 
    v.fecha, 
    c.nombre, 
    s.nombre, 
    v.monto, 
    mp.nombre;

  ELSE
    RETURN QUERY
      SELECT 
        NULL::INT,
        NULL::TIMESTAMP,
        NULL::VARCHAR,
        NULL::VARCHAR,
        NULL::DECIMAL,
        NULL::VARCHAR,
        NULL::TEXT,
        'warning' AS msj_tipo,
        'Actualmente no hay ventas registradas.' AS msj_texto;
  END IF;

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 
      NULL::INT,
      NULL::TIMESTAMP,
      NULL::VARCHAR,
      NULL::VARCHAR,
      NULL::DECIMAL,
      NULL::VARCHAR,
      NULL::TEXT,
      'error'::TEXT AS msj_tipo,
      sqlerrm::TEXT as msj_texto;
END
$$;



CREATE OR REPLACE FUNCTION fn_read_productos()
returns table(
  producto_id INT,
  nombre VARCHAR,
  stock INT,
  stock_minimo int,
  precio decimal,
  categoria_nombre varchar,
  msj_tipo text,
  msj_texto text
)
language plpgsql
as $$
begin 
  if exists (select 1 from t_socios) then 
    return query 
      select 
        prod.productos_id,
        prod.nombre,
        prod.stock,
        prod.stock_minimo,
        prod.precio,
        cat.nombre as categoria_nombre,
        'success' as msj_tipo,
        'Exito al realizar la accion' as msj_texto
        from t_productos prod
        left join t_categorias_inventario cat
          on cat.categorias_invetario_id = prod.categoria_id;


  else 
    return query
      select 
        NULL::INT,
        NULL::VARCHAR,
        NULL::INT,
        NULL::INT,
        NULL::DECIMAL,
        NULL::VARCHAR,
        'warning' as msj_tipo,
        'Actualmente no hay productos registrados.' as msj_texto;
  end if;

exception when others then 
  return query
    select 
        NULL::INT,
        NULL::VARCHAR,
        NULL::INT,
        NULL::INT,
        NULL::DECIMAL,
        NULL::VARCHAR,
      'error' as msj_tipo,
      sqlerrm as msj_texto;
end
$$;


select * from fn_read_productos()

CREATE OR REPLACE FUNCTION fn_read_gastos()
returns table(
  gastos_id INT,
  fecha date,
  descripcion text,
  monto DECIMAL,
  categoria_nombre varchar,
  metodo_pago varchar,
  socio_nombre varchar,
  msj_tipo text,
  msj_texto text
)
language plpgsql
as $$
begin 
  if exists (select 1 from T_GASTOS) then 
    return query 
      select 
        g.gastos_id,
        g.fecha,
        g.descripcion,
        g.monto,
        cg.nombre as categoria_nombre,
        mp.nombre as metodo_pago,
        soc.nombre as socio_nombre,
        'success' as msj_tipo,
        'Exito al realizar la accion' as msj_texto
        from t_gastos g
        left join T_CATEGORIAS_GASTOS cg on cg.categorias_gastos_id = g.categoria_id
        left join T_METODOS_PAGO mp on mp.metodos_pago_id = g.metodo_pago
        left join T_SOCIOS soc on soc.socio_id = g.socio_id;
  else 
    return query
      select 
        NULL::INT,
        NULL::DATE,
        NULL::TEXT,
        NULL::DECIMAL,
        NULL::VARCHAR,
        NULL::VARCHAR,
        NULL::VARCHAR,

        'warning' as msj_tipo,
        'Actualmente no hay gastos registrados.' as msj_texto;
  end if;

exception when others then 
  return query
    select 
        NULL::INT,
        NULL::DATE,
        NULL::TEXT,
        NULL::DECIMAL,
        NULL::VARCHAR,
        NULL::VARCHAR,
        NULL::VARCHAR,
      'error' as msj_tipo,
      sqlerrm as msj_texto;
end
$$;
select * from fn_read_gastos()

create or replace function fn_read_clientes()
returns table(
  client_id int,
  nombre varchar,
  email varchar,
  telefono varchar,
  vehiculo varchar,
  placa varchar,
  rol_cliente_nombre varchar,
  total_gastado numeric,
  total_visitas bigint,
  ultima_visita timestamp,
  msj_tipo text,
  msj_texto text
)
language plpgsql
as $$
begin
  if exists (select 1 from t_clientes) then
    return query
    select
      c.cliente_id::int,
      c.nombre::varchar,
      c.email::varchar,
      c.telefono::varchar,
      c.vehiculo::varchar,
      c.placa::varchar,
      rc.nombre::varchar,

      coalesce(sum(v.monto), 0)::numeric as total_gastado,
      coalesce(count(v.venta_id), 0)::bigint as total_visitas,
      max(v.fecha)::timestamp as ultima_visita,

      'success'::text as msj_tipo,
      'Exito al realizar la accion'::text as msj_texto
    from t_clientes c
    left join t_roles_clientes rc
      on rc.roles_clientes_id = c.rol_cliente_id
    left join t_ventas v
      on v.cliente_id = c.cliente_id
    group by
      c.cliente_id,
      c.nombre,
      c.email,
      c.telefono,
      c.vehiculo,
      c.placa,
      rc.nombre;

  else
    return query
    select 
      NULL::int,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      0::numeric,
      0::bigint,
      NULL::timestamp,
      'warning'::text,
      'Actualmente no hay clientes registrados.'::text;
  end if;

exception when others then
  return query
    select 
      NULL::int,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      NULL::varchar,
      0::numeric,
      0::bigint,
      NULL::timestamp,
      'error'::text,
      sqlerrm::text; 
end
$$;

select * from fn_read_clientes()