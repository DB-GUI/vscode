--drop schema [ppz-test];
create schema [ppz-test];

create table [ppz-test].[date] (
  id int primary key,
  date date,
  datetime datetime,
  datetime2 datetime2,
  datetimeoffset datetimeoffset,
  smalldatetime smalldatetime,
  time time
);
insert into [ppz-test].[date] values (
  1,
  '2022-10-3',
  '2022-10-3 22:30:6.123',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.123',
  '22:30:6.1234567'
);

create table [ppz-test].[datetime2] (
  id int primary key,
  datetime2_0 datetime2(0),
  datetime2_1 datetime2(1),
  datetime2_2 datetime2(2),
  datetime2_3 datetime2(3),
  datetime2_4 datetime2(4),
  datetime2_5 datetime2(5),
  datetime2_6 datetime2(6),
  datetime2_7 datetime2(7),
  datetime2 datetime2
);
insert into [ppz-test].[datetime2] values (
  1,
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567'
);

create table [ppz-test].[datetimeoffset] (
  id int primary key,
  datetimeoffset_0 datetimeoffset(0),
  datetimeoffset_1 datetimeoffset(1),
  datetimeoffset_2 datetimeoffset(2),
  datetimeoffset_3 datetimeoffset(3),
  datetimeoffset_4 datetimeoffset(4),
  datetimeoffset_5 datetimeoffset(5),
  datetimeoffset_6 datetimeoffset(6),
  datetimeoffset_7 datetimeoffset(7),
  datetimeoffset datetimeoffset
);
insert into [ppz-test].[datetimeoffset] values (
  1,
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567',
  '2022-10-3 22:30:6.1234567'
);

create table [ppz-test].[time] (
  id int primary key,
  time0 time(0),
  time1 time(1),
  time2 time(2),
  time3 time(3),
  time4 time(4),
  time5 time(5),
  time6 time(6),
  time7 time(7),
  time time
);
insert into [ppz-test].[time] values (
  1,
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567',
  '23:4:6.1234567'
);