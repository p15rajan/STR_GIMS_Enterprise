CREATE TABLE forest_ranges
(
    range_id SERIAL PRIMARY KEY,
    range_name VARCHAR(100) NOT NULL,
    division VARCHAR(100),
    district VARCHAR(100),
    geom geometry(MultiPolygon, 4326),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
