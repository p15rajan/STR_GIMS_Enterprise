CREATE INDEX idx_plants_geom

ON plants

USING GIST(geom);