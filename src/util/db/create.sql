# ---------------------------------------------------------------------- #
# Script generated with: DeZign for Databases V10.0.2                    #
# Target DBMS:           MySQL 5                                         #
# Project file:          Project1.dez                                    #
# Project name:                                                          #
# Author:                                                                #
# Script type:           Database creation script                        #
# Created on:            2024-06-27 21:31                                #
# ---------------------------------------------------------------------- #


# ---------------------------------------------------------------------- #
# Add tables                                                             #
# ---------------------------------------------------------------------- #

# ---------------------------------------------------------------------- #
# Add table "Licences"                                                   #
# ---------------------------------------------------------------------- #

CREATE TABLE `Licences` (
    `licenceId` BIGINT NOT NULL AUTO_INCREMENT,
    `actived` SMALLINT NOT NULL DEFAULT 1,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Licences` PRIMARY KEY (`licenceId`)
);

# ---------------------------------------------------------------------- #
# Add table "Owners"                                                     #
# ---------------------------------------------------------------------- #

CREATE TABLE `Owners` (
    `ownerId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `saintId` VARCHAR(40),
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Owners` PRIMARY KEY (`ownerId`)
);

# ---------------------------------------------------------------------- #
# Add table "Settings"                                                   #
# ---------------------------------------------------------------------- #

CREATE TABLE `Settings` (
    `settingId` BIGINT NOT NULL AUTO_INCREMENT,
    `daysOpen` VARCHAR(40) NOT NULL,
    `dateOpen` VARCHAR(40) NOT NULL,
    `dateClose` VARCHAR(40) NOT NULL,
    `appoinmentDuration` SMALLINT NOT NULL DEFAULT 30,
    `emailNotificationEnabled` SMALLINT NOT NULL DEFAULT 1,
    `whatsappNotificationEnabled` SMALLINT NOT NULL DEFAULT 0,
    `smsNotificationEnabled` SMALLINT NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Settings` PRIMARY KEY (`settingId`)
);

# ---------------------------------------------------------------------- #
# Add table "Vaccines"                                                   #
# ---------------------------------------------------------------------- #

CREATE TABLE `Vaccines` (
    `vaccineId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Vaccines` PRIMARY KEY (`vaccineId`)
);

# ---------------------------------------------------------------------- #
# Add table "Dewormer"                                                   #
# ---------------------------------------------------------------------- #

CREATE TABLE `Dewormer` (
    `dewormerId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Dewormer` PRIMARY KEY (`dewormerId`)
);

# ---------------------------------------------------------------------- #
# Add table "Exams"                                                      #
# ---------------------------------------------------------------------- #

CREATE TABLE `Exams` (
    `examId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Exams` PRIMARY KEY (`examId`)
);

# ---------------------------------------------------------------------- #
# Add table "Company"                                                    #
# ---------------------------------------------------------------------- #

CREATE TABLE `Company` (
    `companyId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `rif` VARCHAR(40) NOT NULL,
    `avatar` VARCHAR(40) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `actived` SMALLINT DEFAULT 1,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `licenceId` BIGINT,
    `settingId` BIGINT,
    CONSTRAINT `PK_Company` PRIMARY KEY (`companyId`)
);

# ---------------------------------------------------------------------- #
# Add table "Appoinment_Status"                                          #
# ---------------------------------------------------------------------- #

CREATE TABLE `Appoinment_Status` (
    `appoinmentStatusId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `color` VARCHAR(40) NOT NULL,
    `actived` SMALLINT NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Appoinment_Status` PRIMARY KEY (`appoinmentStatusId`)
);

# ---------------------------------------------------------------------- #
# Add table "Items"                                                      #
# ---------------------------------------------------------------------- #

CREATE TABLE `Items` (
    `itemId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `saintId` VARCHAR(40) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Items` PRIMARY KEY (`itemId`)
);

# ---------------------------------------------------------------------- #
# Add table "Pets"                                                       #
# ---------------------------------------------------------------------- #

CREATE TABLE `Pets` (
    `petId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `breed` VARCHAR(40) NOT NULL,
    `color` VARCHAR(40) NOT NULL,
    `weight` VARCHAR(40) NOT NULL COMMENT 'en KG',
    `gender` SMALLINT NOT NULL COMMENT '0 - hembra 1 - macho 2 - no aplica',
    `dob` DATE NOT NULL COMMENT 'fecha de nacimiento',
    `microchip` SMALLINT NOT NULL COMMENT '0 - no 1 - si',
    `avatar` VARCHAR(40) NOT NULL,
    `actived` SMALLINT NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `ownerId` BIGINT,
    CONSTRAINT `PK_Pets` PRIMARY KEY (`petId`)
);

# ---------------------------------------------------------------------- #
# Add table "Users"                                                      #
# ---------------------------------------------------------------------- #

CREATE TABLE `Users` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(40) NOT NULL,
    `companyId` BIGINT,
    `actived` SMALLINT NOT NULL DEFAULT 1,
    `deleted` SMALLINT NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Users` PRIMARY KEY (`userId`)
);

# ---------------------------------------------------------------------- #
# Add table "Appoiments"                                                 #
# ---------------------------------------------------------------------- #

CREATE TABLE `Appoiments` (
    `appoimentId` BIGINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(150) NOT NULL,
    `appoimentDate` DATE NOT NULL,
    `diagnosis` VARCHAR(150) NOT NULL,
    `duration` INTEGER NOT NULL COMMENT 'en Horas',
    `observations` VARCHAR(150) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `petId` BIGINT,
    `userId` BIGINT,
    `appoinmentStatusId` BIGINT,
    CONSTRAINT `PK_Appoiments` PRIMARY KEY (`appoimentId`)
);

# ---------------------------------------------------------------------- #
# Add table "Appoiments_Vaccines"                                        #
# ---------------------------------------------------------------------- #

CREATE TABLE `Appoiments_Vaccines` (
    `appoimentId` BIGINT NOT NULL,
    `vaccineId` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Appoiments_Vaccines` PRIMARY KEY (`appoimentId`, `vaccineId`)
);

# ---------------------------------------------------------------------- #
# Add table "Appoiments_Dewormer"                                        #
# ---------------------------------------------------------------------- #

CREATE TABLE `Appoiments_Dewormer` (
    `appoimentId` BIGINT NOT NULL,
    `dewormerId` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Appoiments_Dewormer` PRIMARY KEY (`appoimentId`, `dewormerId`)
);

# ---------------------------------------------------------------------- #
# Add table "Exams_Appoiments"                                           #
# ---------------------------------------------------------------------- #

CREATE TABLE `Exams_Appoiments` (
    `examId` BIGINT NOT NULL,
    `appoimentId` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Exams_Appoiments` PRIMARY KEY (`examId`, `appoimentId`)
);

# ---------------------------------------------------------------------- #
# Add table "History_Appoinment_Status"                                  #
# ---------------------------------------------------------------------- #

CREATE TABLE `History_Appoinment_Status` (
    `appoimentId` BIGINT NOT NULL,
    `appoinmentStatusId` BIGINT NOT NULL,
    `date` DATETIME NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_History_Appoinment_Status` PRIMARY KEY (`appoimentId`, `appoinmentStatusId`)
);

# ---------------------------------------------------------------------- #
# Add table "Receivables"                                                #
# ---------------------------------------------------------------------- #

CREATE TABLE `Receivables` (
    `receivableId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `saintId` VARCHAR(40) NOT NULL,
    `date` DATETIME NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `ownerId` BIGINT,
    `userId` BIGINT,
    CONSTRAINT `PK_Receivables` PRIMARY KEY (`receivableId`)
);

# ---------------------------------------------------------------------- #
# Add table "Receivables_Items"                                          #
# ---------------------------------------------------------------------- #

CREATE TABLE `Receivables_Items` (
    `receivableId` BIGINT NOT NULL,
    `itemId` BIGINT NOT NULL,
    `quantity` SMALLINT NOT NULL,
    `amount` DECIMAL NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PK_Receivables_Items` PRIMARY KEY (`receivableId`, `itemId`)
);

# ---------------------------------------------------------------------- #
# Add foreign key constraints                                            #
# ---------------------------------------------------------------------- #

ALTER TABLE `Pets` ADD CONSTRAINT `Owners_Pets` 
    FOREIGN KEY (`ownerId`) REFERENCES `Owners` (`ownerId`);

ALTER TABLE `Users` ADD CONSTRAINT `Company_Users` 
    FOREIGN KEY (`companyId`) REFERENCES `Company` (`companyId`);

ALTER TABLE `Appoiments` ADD CONSTRAINT `Pets_Appoiments` 
    FOREIGN KEY (`petId`) REFERENCES `Pets` (`petId`);

ALTER TABLE `Appoiments` ADD CONSTRAINT `Users_Appoiments` 
    FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

ALTER TABLE `Appoiments` ADD CONSTRAINT `Appoinment_Status_Appoiments` 
    FOREIGN KEY (`appoinmentStatusId`) REFERENCES `Appoinment_Status` (`appoinmentStatusId`);

ALTER TABLE `Appoiments_Vaccines` ADD CONSTRAINT `Appoiments_Appoiments_Vaccines` 
    FOREIGN KEY (`appoimentId`) REFERENCES `Appoiments` (`appoimentId`);

ALTER TABLE `Appoiments_Vaccines` ADD CONSTRAINT `Vaccines_Appoiments_Vaccines` 
    FOREIGN KEY (`vaccineId`) REFERENCES `Vaccines` (`vaccineId`);

ALTER TABLE `Appoiments_Dewormer` ADD CONSTRAINT `Appoiments_Appoiments_Dewormer` 
    FOREIGN KEY (`appoimentId`) REFERENCES `Appoiments` (`appoimentId`);

ALTER TABLE `Appoiments_Dewormer` ADD CONSTRAINT `Dewormer_Appoiments_Dewormer` 
    FOREIGN KEY (`dewormerId`) REFERENCES `Dewormer` (`dewormerId`);

ALTER TABLE `Exams_Appoiments` ADD CONSTRAINT `Exams_Exams_Appoiments` 
    FOREIGN KEY (`examId`) REFERENCES `Exams` (`examId`);

ALTER TABLE `Exams_Appoiments` ADD CONSTRAINT `Appoiments_Exams_Appoiments` 
    FOREIGN KEY (`appoimentId`) REFERENCES `Appoiments` (`appoimentId`);

ALTER TABLE `Company` ADD CONSTRAINT `Licences_Company` 
    FOREIGN KEY (`licenceId`) REFERENCES `Licences` (`licenceId`);

ALTER TABLE `Company` ADD CONSTRAINT `Settings_Company` 
    FOREIGN KEY (`settingId`) REFERENCES `Settings` (`settingId`);

ALTER TABLE `History_Appoinment_Status` ADD CONSTRAINT `Appoiments_History_Appoinment_Status` 
    FOREIGN KEY (`appoimentId`) REFERENCES `Appoiments` (`appoimentId`);

ALTER TABLE `History_Appoinment_Status` ADD CONSTRAINT `Appoinment_Status_History_Appoinment_Status` 
    FOREIGN KEY (`appoinmentStatusId`) REFERENCES `Appoinment_Status` (`appoinmentStatusId`);

ALTER TABLE `Receivables` ADD CONSTRAINT `Owners_Receivables` 
    FOREIGN KEY (`ownerId`) REFERENCES `Owners` (`ownerId`);

ALTER TABLE `Receivables` ADD CONSTRAINT `Users_Receivables` 
    FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

ALTER TABLE `Receivables_Items` ADD CONSTRAINT `Receivables_Receivables_Items` 
    FOREIGN KEY (`receivableId`) REFERENCES `Receivables` (`receivableId`);

ALTER TABLE `Receivables_Items` ADD CONSTRAINT `Items_Receivables_Items` 
    FOREIGN KEY (`itemId`) REFERENCES `Items` (`itemId`);
