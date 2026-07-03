CREATE INDEX idx_animals_geom

ON animals

USING GIST(geom);