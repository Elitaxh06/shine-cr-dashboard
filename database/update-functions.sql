

CREATE OR REPLACE FUNCTION fn_update_socio(
  p_socio_id INT,
  p_nombre VARCHAR,
  p_porcentaje_participacion DECIMAL(5,2),
  p_email VARCHAR,
  p_telefono VARCHAR,
  p_inversion_inicial DECIMAL(10,2),
  p_ganancia_neta DECIMAL(10,2),
  p_rol_id INT,
  p_ventas_generadas INT,
  p_gastos_generados INT
)
RETURNS TABLE(
  msj_tipo TEXT, 
  msj_texto TEXT
)
AS $$
BEGIN
  IF p_socio_id IS NULL OR p_socio_id <= 0 OR
     p_nombre IS NULL OR LENGTH(TRIM(p_nombre)) = 0 THEN
     
     RETURN QUERY
     SELECT 'warning', 'Debes ingresar los datos obligatorios (ID, nombre)';

  ELSE
    UPDATE t_socios
    SET
      nombre = p_nombre,
      porcentaje_participacion = p_porcentaje_participacion,
      email = p_email,
      telefono = p_telefono,
      inversion_inicial = p_inversion_inicial,
      ganancia_neta = p_ganancia_neta,
      rol_id = p_rol_id,
      ventas_generadas = p_ventas_generadas,
      gastos_generados = p_gastos_generados
    WHERE socio_id = p_socio_id;

    RETURN QUERY
    SELECT 'success', 'Socio actualizado correctamente.';
  END IF;

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
  SELECT 'error', SQLERRM;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_update_venta(
  p_venta_id INT,
  p_cliente_id INT,
  p_servicio_id INT,
  p_monto DECIMAL(10,2),
  p_metodo_pago VARCHAR,
  p_socios INT[]   -- ← ARRAY DE SOCIOS
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
AS $$
BEGIN
  -- Validaciones
  IF p_venta_id IS NULL OR p_venta_id <= 0 THEN
    RETURN QUERY SELECT 'warning', 'Debes enviar un ID de venta válido';
    RETURN;
  END IF;

  -- UPDATE de la venta
  UPDATE t_ventas
  SET
    cliente_id = p_cliente_id,
    servicio_id = p_servicio_id,
    monto = p_monto,
    metodo_pago = p_metodo_pago
  WHERE venta_id = p_venta_id;

  -- Borrar socios anteriores
  DELETE FROM t_ventas_socios
  WHERE venta_id = p_venta_id;

  -- Insertar los nuevos socios
  INSERT INTO t_ventas_socios (venta_id, socio_id)
  SELECT p_venta_id, unnest(p_socios);

  RETURN QUERY
  SELECT 'success', 'Venta y socios actualizados correctamente.';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
  SELECT 'error', SQLERRM;
END;
$$ LANGUAGE plpgsql;

select * from t_categorias_inventario

CREATE OR REPLACE FUNCTION fn_update_venta_socio(
  p_venta_id_old INT,
  p_socio_id_old INT,
  p_venta_id_new INT,
  p_socio_id_new INT
)
RETURNS TABLE(
  msj_tipo TEXT,
  msj_texto TEXT
)
AS $$
BEGIN
  -- Validaciones
  IF p_venta_id_old IS NULL OR p_socio_id_old IS NULL OR
     p_venta_id_new IS NULL OR p_socio_id_new IS NULL THEN

     RETURN QUERY
     SELECT 'warning', 'Debes enviar todos los IDs obligatorios.';
     RETURN;
  END IF;

  -- Primero eliminar la relación vieja
  DELETE FROM t_ventas_socios
  WHERE venta_id = p_venta_id_old
    AND socio_id = p_socio_id_old;

  -- Insertar la nueva relación
  INSERT INTO t_ventas_socios(venta_id, socio_id)
  VALUES(p_venta_id_new, p_socio_id_new);

  RETURN QUERY
  SELECT 'success', 'Relación venta - socio actualizada correctamente.';

EXCEPTION WHEN OTHERS THEN
  RETURN QUERY
  SELECT 'error', SQLERRM;
END;
$$ LANGUAGE plpgsql;
