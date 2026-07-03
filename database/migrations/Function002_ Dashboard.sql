SET search_path TO str_gims,public;

CREATE OR REPLACE FUNCTION get_dashboard()

RETURNS TABLE
(
    total_plants BIGINT,
    total_animals BIGINT,
    plant_species BIGINT,
    animal_species BIGINT,
    forest_ranges BIGINT,
    active_users BIGINT
)

LANGUAGE SQL

AS
$$

SELECT

(SELECT COUNT(*) FROM plants),

(SELECT COUNT(*) FROM animals),

(SELECT COUNT(*) FROM species
 WHERE category='Plant'),

(SELECT COUNT(*) FROM species
 WHERE category='Animal'),

(SELECT COUNT(*) FROM forest_ranges),

(SELECT COUNT(*) FROM users
 WHERE active=true);

$$;