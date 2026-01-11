
CREATE OR REPLACE FUNCTION fn_read_with_id_partners(
    p_socio_id INT
)
RETURNS TABLE(
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
LANGUAGE plpgsql
AS $$
BEGIN

  -- Validación del ID
  IF p_socio_id IS NULL OR p_socio_id <= 0 THEN
    RETURN QUERY
    SELECT
      NULL::INT, NULL::VARCHAR, NULL::DECIMAL, NULL::VARCHAR, NULL::VARCHAR,
      NULL::DECIMAL, NULL::DECIMAL, NULL::VARCHAR,
      NULL::INT, NULL::INT,
      'warning'::text, 'Debes ingresar un ID válido.'::text;
    RETURN;
  END IF;

  -- Comprobar existencia (columna calificada)
  IF EXISTS (SELECT 1 FROM t_socios t WHERE t.socio_id = p_socio_id) THEN
    RETURN QUERY
      SELECT
        t.socio_id,
        t.nombre,
        t.porcentaje_participacion,
        t.email,
        t.telefono,
        t.inversion_inicial,
        t.ganancia_neta,
        r.nombre AS rol_nombre,
        t.ventas_generadas,
        t.gastos_generados,
        'success'::text,
        'Socio encontrado correctamente.'::text
      FROM t_socios t
      LEFT JOIN t_roles_socios r
        ON r.roles_socios_id = t.rol_id
      WHERE t.socio_id = p_socio_id;  -- calificado
  ELSE
    RETURN QUERY
    SELECT
      NULL::INT, NULL::VARCHAR, NULL::DECIMAL, NULL::VARCHAR, NULL::VARCHAR,
      NULL::DECIMAL, NULL::DECIMAL, NULL::VARCHAR,
      NULL::INT, NULL::INT,
      'warning'::text, 'No se encontró ningún socio con ese ID.'::text;
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY
    SELECT
      NULL::INT, NULL::VARCHAR, NULL::DECIMAL, NULL::VARCHAR, NULL::VARCHAR,
      NULL::DECIMAL, NULL::DECIMAL, NULL::VARCHAR,
      NULL::INT, NULL::INT,
      'error'::text, 'Error inesperado: ' || SQLERRM;
END
$$;
