create schema "ppz-test";

CREATE TABLE "ppz-test"."test-date" (
	id int primary key,
	timestamp timestamp,
	-- timestamptz 是 timestamp with time zone 的缩写，没有任何区别
	timestamptz timestamptz,
	date date,
	time time,
	timetz timetz,
	interval interval
);

insert into "ppz-test"."test-date" values (1,
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '20:38:6.123456',
  '20:38:6.123456',
  '20:38:6.123456'
);

create table "ppz-test"."timestamp" (
	id int primary key,
	timestamp timestamp,
	timestamp0 timestamp(0),
	timestamp1 timestamp(1),
	timestamp2 timestamp(2),
	timestamp3 timestamp(3),
	timestamp4 timestamp(4),
	timestamp5 timestamp(5),
	timestamp6 timestamp(6)
);
insert into "ppz-test"."timestamp" values (1,
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456'
);

create table "ppz-test"."timestamptz" (
	id int primary key,
	timestamptz timestamptz,
	timestamptz0 timestamptz(0),
	timestamptz1 timestamptz(1),
	timestamptz2 timestamptz(2),
	timestamptz3 timestamptz(3),
	timestamptz4 timestamptz(4),
	timestamptz5 timestamptz(5),
	timestamptz6 timestamptz(6)
);
insert into "ppz-test"."timestamptz" values (1,
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456',
  '2022-10-4 20:38:6.123456'
);