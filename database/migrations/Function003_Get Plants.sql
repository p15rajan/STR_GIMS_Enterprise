SET search_path TO str_gims,public;

CREATE OR REPLACE FUNCTION get_plants()

RETURNS TABLE
(
    plant_id UUID,

    scientific_name VARCHAR,

    common_name VARCHAR,

    range_name VARCHAR,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    observed_on DATE
)

LANGUAGE SQL

AS
$$

SELECT

p.plant_id,

s.scientific_name,

s.common_name,

r.range_name,

p.latitude,

p.longitude,

p.observed_on

FROM plants p

JOIN species s

ON s.species_id=p.species_id

JOIN forest_ranges r

ON r.range_id=p.range_id;

$$;