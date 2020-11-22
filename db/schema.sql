BEGIN;

DROP TABLE IF EXISTS tortoise_sessions, organisations, users, participants, messages_temp, messages CASCADE; 


CREATE TABLE organisations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    organisation INTEGER REFERENCES organisations(id),
    title VARCHAR(225) NOT NULL
    -- piano_id // not sure what is this
);

CREATE TABLE tortoise_sessions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    -- organisation INTEGER REFERENCES organisations(id), 
    description text,
    start_date TIMESTAMP,
    duration integer,
    moderator_code VARCHAR(255),
    publisher_code VARCHAR(255),
    session_id VARCHAR(225) NOT NULL UNIQUE
--  profile_questions[{}] 
--  is_chat_moderated?
);
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(225) REFERENCES tortoise_sessions(session_id),
    user_id INTEGER REFERENCES users(id),
    role VARCHAR(10),
    -- “Chat host”, “Editor”, “Guest”, “Member”, “Host”
    -- -invite_token not sure if this is nedded
    joined_at TIMESTAMP,
    left_at TIMESTAMP,
    mode VARCHAR(20),
    device VARCHAR(20)
);
-- CREATE TABLE clips (
    -- we might not need this table since most of the data about the clip is stored by tokbox anyway
-- )

-- temporary table for sessions which will get deleted after the meeting
CREATE TABLE messages_temp (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES tortoise_sessions(session_id),
    author VARCHAR(20),
    message text,
    timestamp TIMESTAMP
);

-- persisting table for messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES tortoise_sessions(session_id),
    chat json NOT NULL
);


COMMIT;
