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
  `ID` int(10) AUTO_INCREMENT PRIMARY KEY,
  `account_name` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `avatar` mediumtext,
  `name` char(255),
  `phone_num` char(15),
  `status` char(10) NOT NULL,
  `address` char(255),
  `face_fodel` mediumtext
) ;

-- --------------------------------------------------------
-- Table structure for table `employee`
CREATE TABLE `employee` (
  `Id` int(10) NOT NULL,
  `position` char(255),
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
-- CALL add_staff('account_name_value', 'password_value');

DELIMITER $$
CREATE PROCEDURE `add_staff_0`(
  IN p_account_name CHAR(255),
  IN p_password CHAR(255),
  IN p_avatar MEDIUMTEXT,
  IN p_name CHAR(255),
  IN p_phone_num CHAR(15),
  IN p_status CHAR(10),
  IN p_address CHAR(255),
  IN p_face_folder MEDIUMTEXT,
  IN p_position CHAR(255),
  IN p_working_days INT(5)
)
BEGIN
  DECLARE account_id INT;
  INSERT INTO account (account_name, password, avatar, name, phone_num, status, address, face_fodel)
  VALUES (p_account_name, p_password, p_avatar, p_name, p_phone_num, p_status, p_address, p_face_folder);
  SET account_id = LAST_INSERT_ID();
  INSERT INTO employee (Id, position, working_days)
  VALUES (account_id, p_position, p_working_days);
  INSERT INTO staff (ID)
  VALUES (account_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `add_staff`(
    IN p_account_name CHAR(255),
    IN p_password CHAR(255)
)
BEGIN
    CALL add_staff_0(
        p_account_name, 
        p_password, 
        NULL,  -- avatar
        NULL,  -- name
        NULL,  -- phone_num
        'unactive', -- status is default to 'active'
        NULL,  -- address
        NULL,  -- face_folder
        NULL,  -- position
        0   -- working_days
    );
END$$
DELIMITER ;








