CREATE TABLE animals
(
    animal_id UUID
        PRIMARY KEY
        DEFAULT uuid_generate_v4(),

    species_id INTEGER
        REFERENCES species(species_id),

    range_id INTEGER
        REFERENCES forest_ranges(range_id),

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    geom geometry(Point,4326),

    population INTEGER,

    observed_on DATE,

    observed_by UUID
        REFERENCES users(user_id),

    remarks TEXT,

    created_on TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);