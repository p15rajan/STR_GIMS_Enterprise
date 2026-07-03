SET search_path TO str_gims,public;

CREATE OR REPLACE FUNCTION get_animals()

RETURNS TABLE
(
    animal_id UUID,

    scientific_name VARCHAR,

    common_name VARCHAR,

    range_name VARCHAR,

    population INTEGER,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION
)

LANGUAGE SQL

AS
$$

SELECT

a.animal_id,

s.scientific_name,

s.common_name,

r.range_name,

a.population,

a.latitude,

a.longitude

FROM animals a

JOIN species s

ON s.species_id=a.species_id

JOIN forest_ranges r

ON r.range_id=a.range_id;

$$;