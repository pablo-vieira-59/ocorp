CREATE TABLE "EstablishmentStatus" (
    "Id" INT NOT null primary KEY,
    "Name" TEXT NOT NULL
);

CREATE TABLE "Profiles" (
    "Id" INT not null primary KEY,
    "Name" TEXT NOT NULL
);

CREATE TABLE "Permissions" (
    "Id" INT NOT null primary KEY,
    "Name" TEXT NOT NULL
);

CREATE TABLE "UserStatus" (
    "Id" INT NOT null primary KEY,
    "Name" VARCHAR(255) NOT NULL
);

CREATE TABLE "Categories" (
    "Id" SERIAL NOT null primary KEY,
    "Name" TEXT NOT NULL
);

CREATE TABLE "Users" (
    "Id" BIGSERIAL NOT null primary KEY,
    "ProfileId" INT NOT null ,
    "UserStatusId" INT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "DocumentNumber" TEXT NOT NULL,
    "Guid" UUID NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    "LastLogin" TIMESTAMP,
    FOREIGN key ("ProfileId") references "Profiles" ("Id"),
    FOREIGN key ("UserStatusId") references "UserStatus" ("Id")
);

CREATE TABLE "Establishments" (
    "Id" BIGSERIAL NOT null primary KEY,
    "EstablishmentStatusId" INT NOT NULL,
    "CorporateName" TEXT NOT NULL,
    "FantasyName" TEXT NOT NULL,
    "DocumentNumber" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Url" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    FOREIGN key ("EstablishmentStatusId") references "EstablishmentStatus" ("Id")
);

CREATE TABLE "Addresses" (
    "Id" BIGSERIAL NOT null primary KEY,
    "Number" TEXT NOT NULL,
    "AddressName" TEXT NOT NULL,
    "Neighborhood" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "Country" TEXT NULL,
    "ZipCode" TEXT NOT NULL
);

CREATE TABLE "Permission_Profiles" (
    "Id" INT NOT null primary KEY,
    "ProfileId" INT NOT NULL,
    "PermissionId" INT NOT NULL,
    FOREIGN key ("ProfileId") references "Profiles" ("Id"),
    FOREIGN key ("PermissionId") references "Permissions" ("Id")
);

CREATE TABLE "SubCategories" (
    "Id" SERIAL NOT null primary KEY,
    "CategoryId" INT NOT NULL,
    "Name" TEXT NOT NULL,
    FOREIGN key ("CategoryId") references "Categories" ("Id")
);

CREATE TABLE "UserAccesses" (
    "Id" BIGSERIAL NOT null primary KEY,
    "UserId" BIGINT NOT NULL,
    "Token" UUID NOT NULL,
    "TokenValidUntil" TIMESTAMP,
    FOREIGN key ("UserId") references "Users" ("Id")
);

CREATE TABLE "Address_Users" (
    "Id" BIGSERIAL NOT null primary KEY,
    "UserId" BIGINT NOT NULL,
    "AddressId" BIGINT NOT NULL,
    FOREIGN key ("UserId") references "Users" ("Id"),
    FOREIGN key ("AddressId") references "Addresses" ("Id")
);

CREATE TABLE "Address_Establishments" (
    "Id" BIGSERIAL NOT null primary KEY,
    "EstablishmentId" BIGINT NOT NULL,
    "AddressId" BIGINT NOT NULL,
    FOREIGN key ("EstablishmentId") references "Establishments" ("Id"),
    FOREIGN key ("AddressId") references "Addresses" ("Id")
);

insert into "UserStatus" values
(1, 'Active'),
(2, 'Inactive'),
(3, 'Canceled');

insert into "Profiles"  values
(1, 'Admin'),
(2, 'Manager'),
(3, 'Employee'),
(4, 'Costumer');

insert into "EstablishmentStatus" values
(1, 'Active'),
(2, 'Inactive'),
(3, 'Canceled');

drop table "SubCategories" 



