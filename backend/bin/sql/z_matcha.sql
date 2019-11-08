create extension "uuid-ossp";

create table person (
	person_id serial primary key,
	email text not null,
	username text not null,
	firstname text not null,
	lastname text not null,
	password text not null,
	gender text,
	orientation text default 'bisexual',
	bio text,
	age smallint,
	popularity smallint default 100,
	tag text,
	is_profile_completed boolean default false,
	latitude double precision,
	longitude double precision,
	localization text,
	geo geography(Point),
	is_online boolean default false,
	date_creation date default now(),
	uuid uuid default uuid_generate_v4(),
	is_account_verified boolean default false
);

create table person_picture (
	picture_id serial primary key,
	person_id int references person on delete cascade,
	index int not null,
	filename text not null,
	date_creation date default now(),
	constraint person_id_index_uq UNIQUE (person_id, index)
);

-- create table person_like (
-- 	person_id int references person on delete cascade,
-- 	date_creation date default now(),
-- 	is_person_notified boolean default false
-- );

create table person_visit (
	person_id int references person on delete cascade,
	person_visited_id int references person on delete cascade,
	date_creation timestamptz default now() not null,
	is_person_notified boolean default false
);

-- CREATE TABLE persons_Blocks (
-- 	person_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	person_blocked_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	date_creation DATE DEFAULT NOW(),
-- 	PRIMARY KEY (person_id, person_blocked_id)
-- );

-- CREATE TABLE persons_Reports (
-- 	person_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	person_reported_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	date_creation DATE DEFAULT NOW(),
-- 	PRIMARY KEY (person_id, person_reported_id)
-- );

-- CREATE TABLE Rooms (
-- 	room_id SERIAL PRIMARY KEY,
-- 	date_creation DATE DEFAULT NOW()
-- );

-- CREATE TABLE persons_Rooms (
-- 	person_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	room_id SERIAL REFERENCES Rooms ON DELETE CASCADE,
-- 	PRIMARY KEY (person_id, room_id)
-- );

-- CREATE TABLE Messages (
-- 	person_id SERIAL REFERENCES persons ON DELETE CASCADE,
-- 	room_id SERIAL REFERENCES Rooms ON DELETE CASCADE,
-- 	content TEXT,
-- 	date_creation DATE DEFAULT NOW(),
-- 	is_person_notified BOOLEAN DEFAULT FALSE,
-- 	PRIMARY KEY (person_id, room_id)
-- );

--Add loc GEOMETRY(Point, 2154) to TABLE Geo for postgis
--Insert loc with ST_GeomFromText('POINT(48.896609 2.318499)', 2154)
