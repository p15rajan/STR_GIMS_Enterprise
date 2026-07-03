SET search_path TO str_gims,public;

CREATE TABLE login_history
(
    login_id BIGSERIAL PRIMARY KEY,

    user_id UUID
        REFERENCES users(user_id),

    login_time TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    logout_time TIMESTAMP,

    ip_address VARCHAR(50),

    browser VARCHAR(200),

    success BOOLEAN
);