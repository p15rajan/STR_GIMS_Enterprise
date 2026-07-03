CREATE INDEX idx_range_geom

ON forest_ranges

USING GIST(geom);