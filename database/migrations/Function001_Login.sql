SET search_path TO str_gims,public;

CREATE OR REPLACE FUNCTION login_user
(
    p_username TEXT,
    p_password TEXT
)

RETURNS TABLE
(
    user_id UUID,
    username TEXT,
    full_name TEXT,
    role_name TEXT
)

LANGUAGE SQL
SECURITY DEFINER

AS
$$

SELECT

u.user_id,
u.username,
u.full_name,
r.role_name

FROM users u

JOIN roles r
ON r.role_id=u.role_id

WHERE

u.username=p_username

AND

u.password_hash=crypt
(
p_password,
u.password_hash
)

AND

u.active=true;

$$;