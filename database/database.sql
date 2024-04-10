--
-- Database: `facial_recognition`
-- --------------------------------------------------------
DROP SCHEMA IF EXISTS `facial_recognition`;
CREATE SCHEMA IF NOT EXISTS `facial_recognition`;
USE `facial_recognition`;
-- --------------------------------------------------------
--
-- Table structure for table `account`
-- Added `account_name` and `password` columns
-- mediumblob -> mediumtext instead for link to image
--
CREATE TABLE `account` (
  `ID` int(10) NOT NULL,
  `account_name` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `avatar` mediumtext NOT NULL,
  `name` char(255) NOT NULL,
  `phone_num` int(15) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `address` char(255) NOT NULL,
  `face_fodel` mediumtext NOT NULL
) ;

ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`);

-- --------------------------------------------------------
-- Table structure for table `employee`
CREATE TABLE `employee` (
  `Id` int(10) NOT NULL,
  `position` char(255) NOT NULL,
  `working_days` int(5) NOT NULL
) ;

ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `employee`
  ADD CONSTRAINT `employee_FK_1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `manager`
--
CREATE TABLE `manager` (
  `ID` int(10) NOT NULL
) ;

ALTER TABLE `manager`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `manager`
    ADD CONSTRAINT `manager_FK_1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `staff`
CREATE TABLE `staff` (
  `ID` int(10) NOT NULL
) ;

ALTER TABLE `staff`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `staff`
    ADD CONSTRAINT `staff_FK_1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`);

-- --------------------------------------------------------
-- to be continued
-- --------------------------------------------------------
-- Insert some data into the table `account`
INSERT INTO `account` (`ID`, `account_name`, `password`, `avatar`, `name`, `phone_num`, `status`, `address`, `face_fodel`) VALUES
(0000000001, 'user_1', '123', 'https://media.istockphoto.com/id/1300845620/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-ph%E1%BA%B3ng-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-minh-h%E1%BB%8Da-vector.webp?s=1024x1024&w=is&k=20&c=cJE9q0XBXMumQRNYHSfUGEsDQEHhOit5jAioPbVKIjI=', 'Le Van A', '0123456789', '0', 'Ha Noi', 'https://i.pinimg.com/474x/7e/cb/87/7ecb873df3c969d8fce9c915e59233b1.jpg');


-- Procedure `add_employee`:
-- CALL add_employee('ID', 'account_name', 'password', 'avatar', 'name', `phone_num', 'status', 'address', 'face_model', 'position', `working_days`);
DELIMITER $$
CREATE PROCEDURE `add_employee` (IN `ID` INT, IN `account_name` CHAR(255), IN `password` CHAR(255), IN `avatar` MEDIUMTEXT, IN `name` CHAR(255), IN `phone_num` INT, IN `status` TINYINT, IN `address` CHAR(255), IN `face_fodel` MEDIUMTEXT, IN `position` CHAR(255), IN `working_days` INT)
BEGIN
    INSERT INTO `account` (`ID`, `account_name`, `password`, `avatar`, `name`, `phone_num`, `status`, `address`, `face_model`) VALUES (`ID`, `account_name`, `password`, `avatar`, `name`, `phone_num`, `status`, `address`, `face_model`);
    INSERT INTO `employee` (`ID`, `position`, `working_days`) VALUES (`ID`, `position`, `working_days`);
    -- If position is 'Manager', insert data into the table `manager`, else insert data into the table `staff`
    IF `position` = 'Manager' THEN
        INSERT INTO `manager` (`ID`) VALUES (`ID`);
    ELSE
        INSERT INTO `staff` (`ID`) VALUES (`ID`);
    END IF;
END$$
DELIMITER ;





