-- drop database `test-ppz`;
create database `test-ppz`;
use `test-ppz`;

create table date (
  id int primary key,
  date date,
  time time,
  datetime datetime,
  timestamp timestamp
);
insert into date values (1, '2022-10-3', '16:37:8', '2022-10-3 16:37:8', '2022-10-3 16:37:8');

create table `datetime` (
  id int primary key,
  
  datetime datetime,
  datetime1 datetime(1),
  datetime2 datetime(2),
  datetime3 datetime(3),
  datetime4 datetime(4),
  datetime5 datetime(5),
  datetime6 datetime(6)
);
insert into `datetime` values (1, '2022-10-3 16:37:8.123456',
  '2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456',
  '2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456'
);

create table timestamp (
  id int primary key,
  timestamp timestamp null,
  timestamp1 timestamp(1) null,
  timestamp2 timestamp(2) null,
  timestamp3 timestamp(3) null,
  timestamp4 timestamp(4) null,
  timestamp5 timestamp(5) null,
  timestamp6 timestamp(6) null
);
insert into `timestamp` values (1, '2022-10-3 16:37:8.123456',
  '2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456',
  '2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456'
);