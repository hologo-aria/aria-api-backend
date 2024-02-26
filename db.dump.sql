-- Create table
CREATE TABLE Admin (
    adminID VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    timeZone VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    accessLevel VARCHAR(255) NOT NULL,
    activeStatus BOOLEAN NOT NULL,
    PRIMARY KEY (adminID)
);

-- Insert dummy data
-- INSERT INTO Admin (adminID, firstname, lastname, organization, mobile, email, location, address1, address2, timeZone, zipcode, username, password, accessLevel, activeStatus) 
-- VALUES ('adm001', 'Ninthu', 'Param', 'Hologo', '0766194332', 'ninthukesan@hologo.world', 'USA', 'Street 123', '321 street', 'GMT+5:30', 10400, 'chosen', 'chosen123', 'Super Admin', true);



CREATE TABLE Clients (
    clientsID VARCHAR(255) NOT NULL,
    adminID VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,cl
    address2 VARCHAR(255),
    timeZone VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    accessLevel VARCHAR(255) NOT NULL,
    activeStatus BOOLEAN NOT NULL,
    FOREIGN KEY (adminID) REFERENCES Admin(adminID),
    PRIMARY KEY (clientsID)
);

