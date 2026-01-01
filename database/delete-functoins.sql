CREATE OR REPLACE FUNCTION fn_delete_venta(
  p_venta_id INT
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_monto DECIMAL;
  v_cantidad_socios INT;
  v_monto_por_socio DECIMAL;
  v_socios INT[];
BEGIN
  -- Validar que la venta exista
  IF NOT EXISTS (SELECT 1 FROM t_ventas WHERE venta_id = p_venta_id) THEN
    RETURN QUERY
      SELECT 
        'warning'::TEXT,
        'No se encontró la venta con ID ' || p_venta_id;
    RETURN;
  END IF;

  -- Obtener monto y socios de la venta
  SELECT monto INTO v_monto
  FROM t_ventas
  WHERE venta_id = p_venta_id;

  SELECT ARRAY(SELECT socio_id FROM t_ventas_socios WHERE venta_id = p_venta_id)
  INTO v_socios;

  v_cantidad_socios := array_length(v_socios, 1);

  IF v_cantidad_socios IS NOT NULL AND v_cantidad_socios > 0 THEN
    v_monto_por_socio := v_monto / v_cantidad_socios;

    -- Restar la parte correspondiente a cada socio
    UPDATE t_socios
    SET ventas_generadas = ventas_generadas - v_monto_por_socio
    WHERE socio_id = ANY(v_socios);
  END IF;

  -- Eliminar relaciones de socios
  DELETE FROM t_ventas_socios
  WHERE venta_id = p_venta_id;

  -- Eliminar la venta
  DELETE FROM t_ventas
  WHERE venta_id = p_venta_id;

  RETURN QUERY
    SELECT 
      'success'::TEXT,
      'La venta con ID ' || p_venta_id || ' fue eliminada exitosamente.';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 
      'error'::TEXT,
      'Ocurrió un error al intentar eliminar la venta: ' || sqlerrm;
END
$$;



CREATE OR REPLACE FUNCTION fn_delete_gasto(
  p_gasto_id INT
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_monto DECIMAL;
  v_socio_id INT;
BEGIN
  -- Validar que el gasto exista
  IF NOT EXISTS (SELECT 1 FROM t_gastos WHERE gastos_id = p_gasto_id) THEN
    RETURN QUERY
      SELECT 
        'warning'::TEXT,
        'No se encontró el gasto con ID ' || p_gasto_id;
    RETURN;
  END IF;

  -- Obtener monto y socios del gasto
  SELECT monto INTO v_monto
  into v_monto, v_socio_id
  FROM t_gastos
  WHERE gastos_id = p_gasto_id;

    if v_socio_id is not null THEN
        update t_socios
        set gastos_generados = gastos_generados - v_monto
        where socio_id = v_socio_id;

    end if;

    -- eliminar el gasto
    delete from t_gastos
    where gastos_id = p_gasto_id;
    return QUERY
      SELECT 
        'success'::TEXT,
        'El gasto con ID ' || p_gasto_id || ' fue eliminado exitosamente.';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 
      'error'::TEXT,
      'Ocurrió un error al intentar eliminar la venta: ' || sqlerrm;
END
$$;




CREATE OR REPLACE FUNCTION fn_delete_cliente(
  p_cliente_id INT
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validar que el cliente exista
  IF NOT EXISTS (SELECT 1 FROM t_clientes WHERE cliente_id = p_cliente_id) THEN
    RETURN QUERY
      SELECT 
        'warning'::TEXT,
        'No se encontró el cliente con ID ' || p_cliente_id;
    RETURN;
  END IF;

  -- Eliminar el cliente
  DELETE FROM t_clientes
  WHERE cliente_id = p_cliente_id;

  RETURN QUERY
    SELECT 
      'success'::TEXT,
      'El cliente con ID ' || p_cliente_id || ' fue eliminado exitosamente.';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
    SELECT 
      'error'::TEXT,
      'Ocurrió un error al intentar eliminar el cliente: ' || sqlerrm;
END
$$;
