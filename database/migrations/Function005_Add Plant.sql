CREATE OR REPLACE FUNCTION add_plant(

p_species INTEGER,

p_range INTEGER,

p_lat DOUBLE PRECISION,

p_lon DOUBLE PRECISION,

p_date DATE,

p_user UUID,

p_remarks TEXT

)

RETURNS UUID

LANGUAGE plpgsql

AS

$$

DECLARE

v_id UUID;

BEGIN

INSERT INTO plants
(
species_id,
range_id,
latitude,
longitude,
geom,
observed_on,
observed_by,
remarks
)

VALUES
(
p_species,
p_range,
p_lat,
p_lon,

ST_SetSRID(
ST_Point(
p_lon,
p_lat
),
4326
),

p_date,

p_user,

p_remarks
)

RETURNING plant_id

INTO v_id;

RETURN v_id;

END;

$$;