--
-- Database: `facial_recognition`
-- --------------------------------------------------------
DROP SCHEMA IF EXISTS `facial_recognition`;
CREATE SCHEMA IF NOT EXISTS `facial_recognition`;
USE `facial_recognition`;
-- --------------------------------------------------------
-- Table structure for table `account`
-- Added `account_name` and `password` columns
-- mediumblob -> mediumtext instead for link to image
-- tinyint(1) -> char(10) for status\

CREATE TABLE `account` (
  `ID` int(10) AUTO_INCREMENT PRIMARY KEY,
  `account_name` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `avatar` mediumtext,
  `name` char(255),
  `phone_num` char(15),
  `status` char(10) NOT NULL,
  `address` char(255),
  `email` char(255),
  `face_model` mediumtext
) ;

-- --------------------------------------------------------
-- Table structure for table `employee`

CREATE TABLE `employee` (
  `ID` int(10) NOT NULL,
  `position` char(255),
  `working_days` int(5) NOT NULL
) ;

ALTER TABLE `employee`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `employee`
  ADD CONSTRAINT `employee_FK_1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `manager`

CREATE TABLE `manager` (
  `ID` int(10) NOT NULL
) ;

ALTER TABLE `manager`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `manager`
    ADD CONSTRAINT `manager_FK_1` FOREIGN KEY (`ID`) REFERENCES `employee` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `staff`

CREATE TABLE `staff` (
  `ID` int(10) NOT NULL
) ;

ALTER TABLE `staff`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `staff`
    ADD CONSTRAINT `staff_FK_1` FOREIGN KEY (`ID`) REFERENCES `employee` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `form`

CREATE TABLE `form` (
  `ID` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Type` char(255),
  `date_time send` datetime,
  `status` char(10),
  `note` text,
  `date_time respond` datetime,
  `response` text
) ;

-- --------------------------------------------------------
-- Table structure for table `request`

CREATE TABLE `request` (
  `manager_ID` int(10) NOT NULL,
  `staff_ID` int(10) NOT NULL,
  `form_ID` int(10) NOT NULL
) ;

ALTER TABLE `request`
  ADD PRIMARY KEY (`form_ID`);

ALTER TABLE `request`
  ADD CONSTRAINT `request_FK_1` FOREIGN KEY (`Manager_ID`) REFERENCES `manager` (`ID`),
  ADD CONSTRAINT `request_FK_2` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`ID`),
  ADD CONSTRAINT `request_FK_3` FOREIGN KEY (`Form_ID`) REFERENCES `form` (`ID`);
-- --------------------------------------------------------
-- Table structure for table `announcement`

CREATE TABLE `announcement` (
  `ID` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `send_by` int(10) NOT NULL,
  `date_time` datetime NOT NULL,
  `descripttion` text
) ;

-- --------------------------------------------------------
-- Table structure for table `has_announcement`

CREATE TABLE `has_announcement` (
  `announcement_ID` int(10) NOT NULL,
  `employee_ID` int(10) NOT NULL
) ;

ALTER TABLE `has_announcement`
  ADD PRIMARY KEY (`announcement_ID`, `employee_ID`);

ALTER TABLE `has_announcement`
  ADD CONSTRAINT `has_announcement_FK_1` FOREIGN KEY (`announcement_ID`) REFERENCES `announcement` (`ID`),
  ADD CONSTRAINT `has_announcement_FK_2` FOREIGN KEY (`employee_ID`) REFERENCES `employee` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `iot_device`

CREATE TABLE `iot_device` (
  `ID` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` char(255),
  `status` char(10) NOT NULL,
  `location` char(255),
  `role` char(255)
) ;

-- --------------------------------------------------------
-- Table structure for table `OTP`

CREATE TABLE `OTP` (
  `code` char(6) NOT NULL,
  `status` char(10) NOT NULL,
  `account_ID` int(10) NOT NULL PRIMARY KEY
) ;

ALTER TABLE `OTP`
  ADD CONSTRAINT `OTP_FK` FOREIGN KEY (`account_ID`) REFERENCES `account` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `working_time`

CREATE TABLE `working_time` (
  `ID` int(10) NOT NULL,
  `begin_at` time NOT NULL,
  `end_at` time NOT NULL
);

ALTER TABLE `working_time`
  ADD PRIMARY KEY (`ID`, `begin_at`, `end_at`);

ALTER TABLE `working_time`
  ADD CONSTRAINT `working_time_FK` FOREIGN KEY (`ID`) REFERENCES `employee` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `tracking_work_days`

CREATE TABLE `tracking_work_days` (
  `date` date NOT NULL,
  `total_hour` int(3) NOT NULL,
  `status` char(255),
  `employee_ID` int(10) NOT NULL
) ;

ALTER TABLE `tracking_work_days`
  ADD PRIMARY KEY (`date`, `employee_ID`);

ALTER TABLE `tracking_work_days`
  ADD CONSTRAINT `tracking_work_days_FK` FOREIGN KEY (`employee_ID`) REFERENCES `employee` (`ID`);

-- --------------------------------------------------------
-- Table structure for table `iot_data`

CREATE TABLE `iot_data` (
  `ID` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` date,
  `time` time,
  `value` char(255),
  `type` char(255),
  `device_ID` int(10) NOT NULL,
  `employee_ID` int(10) NOT NULL
) ;

-- ALTER TABLE `iot_data`
--   ADD PRIMARY KEY (`ID`, `device_ID`);

ALTER TABLE `iot_data`
  ADD CONSTRAINT `iot_data_FK_1` FOREIGN KEY (`device_ID`) REFERENCES `iot_device` (`ID`);

ALTER TABLE `iot_data`
  ADD CONSTRAINT `iot_data_FK_2` FOREIGN KEY (`employee_ID`) REFERENCES `tracking_work_days` (`employee_ID`);

-- --------------------------------------------------------
-- Table structure for table `time_status`

-- CREATE TABLE `time_status` (
--   `date` date NOT NULL PRIMARY KEY,
--   `time` time NOT NULL,
--   `status` char(255),
--   `type` char(10) NOT NULL
-- ) ;

-- ALTER TABLE `time_status`
--   ADD CONSTRAINT `time_status_FK` FOREIGN KEY (`date`) REFERENCES `tracking_work_days` (`date`);

-- --------------------------------------------------------
-- to be continued ?


-- --------------------------------------------------------
-- Procedure structure for procedure `add_staff`
-- CALL add_staff('account_name_value', 'password_value');

-- Or CALL add_staff_0(
--     'account_name_value',
--     'password_value',
--     'avatar_value',
--     'name_value',
--     'phone_num_value',
--     'status_value',
--     'address_value',
--     'face_model_value',
--     'position_value',
--     working_days_value
-- );

DELIMITER $$
CREATE PROCEDURE `add_staff_0`(
  IN p_account_name CHAR(255),
  IN p_password CHAR(255),
  IN p_avatar MEDIUMTEXT,
  IN p_name CHAR(255),
  IN p_phone_num CHAR(15),
  IN p_status CHAR(10),
  IN p_address CHAR(255),
  IN p_face_model MEDIUMTEXT,
  IN p_position CHAR(255),
  IN p_working_days INT(5)
)
BEGIN
  DECLARE account_id INT;
  INSERT INTO account (account_name, password, avatar, name, phone_num, status, address, face_model)
  VALUES (p_account_name, p_password, p_avatar, p_name, p_phone_num, p_status, p_address, p_face_model);
  SET account_id = LAST_INSERT_ID();
  INSERT INTO employee (ID, position, working_days)
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
        NULL,  -- face_model
        NULL,  -- position
        0   -- working_days
    );
END$$
DELIMITER ;

-- --------------------------------------------------------
-- Procedure structure for procedure `add_manager`
-- CALL add_manager('account_name_value', 'password_value');

-- Or CALL add_manager_0(
--     'account_name_value',
--     'password_value',
--     'avatar_value',
--     'name_value',
--     'phone_num_value',
--     'status_value',
--     'address_value',
--     'face_model_value'
-- );

DELIMITER $$
CREATE PROCEDURE `add_manager_0`(
  IN p_account_name CHAR(255),
  IN p_password CHAR(255),
  IN p_avatar MEDIUMTEXT,
  IN p_name CHAR(255),
  IN p_phone_num CHAR(15),
  IN p_status CHAR(10),
  IN p_address CHAR(255),
  IN p_face_model MEDIUMTEXT,
  IN p_position CHAR(255),
  IN p_working_days INT(5)
)
BEGIN
  DECLARE account_id INT;
  INSERT INTO account (account_name, password, avatar, name, phone_num, status, address, face_model)
  VALUES (p_account_name, p_password, p_avatar, p_name, p_phone_num, p_status, p_address, p_face_model);
  SET account_id = LAST_INSERT_ID();
  INSERT INTO employee (ID, position, working_days)
  VALUES (account_id, p_position, p_working_days);
  INSERT INTO manager (ID)
  VALUES (account_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `add_manager`(
    IN p_account_name CHAR(255),
    IN p_password CHAR(255)
)
BEGIN
    CALL add_manager_0(
        p_account_name, 
        p_password, 
        NULL,  -- avatar
        NULL,  -- name
        NULL,  -- phone_num
        'unactive', -- status is default to 'active'
        NULL,  -- address
        NULL,  -- face_model
        NULL,  -- position
        0   -- working_days
    );
END$$
DELIMITER ;


-- --------------------------------------------------------
-- Procedure structure for procedure `send_form`
-- CALL send_form('manager_id', 'staff_id', 'send_note')

DELIMITER $$
CREATE PROCEDURE `send_form`(
    IN p_manager_id INT,
    IN p_staff_id INT,
    IN p_form_note TEXT
)
BEGIN
    DECLARE form_id INT;
    DECLARE manager_exists INT;
    DECLARE staff_exists INT;

    SELECT COUNT(*) INTO manager_exists FROM manager WHERE ID = p_manager_id;
    SELECT COUNT(*) INTO staff_exists FROM staff WHERE ID = p_staff_id;
    IF manager_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager ID does not exist';
    ELSEIF staff_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Staff ID does not exist';
    ELSE
        INSERT INTO form (Type, date_time, status, note)
        VALUES ('Send Form', NOW(), 'pending', p_form_note);
        SET form_id = LAST_INSERT_ID();
        INSERT INTO request (manager_ID, staff_ID, form_ID)
        VALUES (p_manager_id, p_staff_id, form_id);
    END IF;
END$$

-- Procedure structure for procedure `respond_form`
-- CALL respond_form('manager_id', 'staff_id', 'response_note')

DELIMITER $$
CREATE PROCEDURE `respond_form`(
    IN p_manager_id INT,
    IN p_staff_id INT,
    IN p_form_note TEXT
)
BEGIN
    DECLARE form_id INT;
    DECLARE manager_exists INT;
    DECLARE staff_exists INT;

    SELECT COUNT(*) INTO manager_exists FROM manager WHERE ID = p_manager_id;
    SELECT COUNT(*) INTO staff_exists FROM staff WHERE ID = p_staff_id;
    IF manager_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager ID does not exist';
    ELSEIF staff_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Staff ID does not exist';
    ELSE
        INSERT INTO form (Type, date_time, status, note)
        VALUES ('Respond Form', NOW(), 'pending', p_form_note);
        SET form_id = LAST_INSERT_ID();
        INSERT INTO request (manager_ID, staff_ID, form_ID)
        VALUES (p_manager_id, p_staff_id, form_id);
    END IF;
END$$
DELIMITER ;
-- --------------------------------------------------------
-- Procedure structure for procedure `update_info` for a staff: update phone_num, address and avatar
-- CALL update_info('staff_id', 'phone_num', 'address', 'avatar')

DELIMITER $$
CREATE PROCEDURE `update_info`(
    IN p_account_id INT,
    IN p_password char(255),
    IN p_phone_num CHAR(15),
    IN p_address CHAR(255),
    IN p_avatar MEDIUMTEXT
)
BEGIN
    DECLARE account_exists INT;
    SELECT COUNT(*) INTO account_exists FROM account WHERE ID = p_account_id;

    IF account_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account ID does not exist';
    ELSE
        UPDATE account
        SET password = p_password, phone_num = p_phone_num, address = p_address, avatar = p_avatar
        WHERE ID = p_account_id;
    END IF;
END$$
DELIMITER ;

-- --------------------------------------------------------
-- Procedure for create_OTP that expires in 5 minutes, auto delete after 5 minutes
-- The OTP code is 6-character long, randomly generated, example: A1B2C3, AA6B7C8, 98K7B6,...
-- SELECT check_OTP('account_id')

DELIMITER $$
-- CREATE FUNCTION `check_OTP`(
--   p_account_id INT
-- ) RETURNS INT
-- BEGIN
--   DECLARE account_exists INT;
--   DECLARE OTP_exists INT;

--   SELECT COUNT(*) INTO account_exists FROM account WHERE ID = p_account_id;
--   IF account_exists = 0 THEN
--     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account ID does not exist';
--   ELSE
--     SELECT COUNT(*) INTO OTP_exists FROM OTP WHERE account_ID = p_account_id;
--     IF OTP_exists = 0 THEN
--       RETURN 0;
--     ELSE
--       RETURN 1;
--     END IF;
--   END IF;
-- END$$
-- DELIMITER ;

-- -- SELECT create_OTP('account_id')

-- DELIMITER $$
-- CREATE FUNCTION `create_OTP`(
--   p_account_id INT
-- ) RETURNS CHAR(6)
-- BEGIN
--   DECLARE account_exists INT;
--   DECLARE OTP_exists INT;
--   DECLARE OTP_code CHAR(6);
--   DECLARE OTP_status CHAR(10);
--   DECLARE account_has_OTP INT;

--   SELECT COUNT(*) INTO account_exists FROM account WHERE ID = p_account_id;
--   IF account_exists = 0 THEN
--       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account ID does not exist';
--   ELSE
--       SELECT COUNT(*) INTO OTP_exists FROM OTP WHERE account_ID = p_account_id;
--       IF OTP_exists = 0 THEN
--           REPEAT
--               SET OTP_code = CONCAT(
--                   CHAR(FLOOR(65 + RAND() * 26)),
--                   CHAR(FLOOR(65 + RAND() * 26)),
--                   CHAR(FLOOR(65 + RAND() * 26)),
--                   CHAR(FLOOR(48 + RAND() * 10)),
--                   CHAR(FLOOR(48 + RAND() * 10)),
--                   CHAR(FLOOR(48 + RAND() * 10))
--               );
--               SELECT COUNT(*) INTO account_has_OTP FROM OTP WHERE code = OTP_code;
--           UNTIL account_has_OTP = 0 END REPEAT;
--           SET OTP_status = 'active';
--           INSERT INTO OTP (code, status, account_ID)
--           VALUES (OTP_code, OTP_status, p_account_id);
--           RETURN OTP_code;
--       ELSE
--           SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'OTP already exists';
--       END IF;
--   END IF;
-- END$$
-- DELIMITER ;


-- -- CALL delete_OTP('account_id')

-- DELIMITER $$
-- CREATE PROCEDURE `delete_OTP`(
--     IN p_account_id INT
-- )
-- BEGIN
--     DECLARE account_exists INT;
--     DECLARE OTP_exists INT;

--     SELECT COUNT(*) INTO account_exists FROM account WHERE ID = p_account_id;
--     IF account_exists = 0 THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account ID does not exist';
--     ELSE
--         SELECT COUNT(*) INTO OTP_exists FROM OTP WHERE account_ID = p_account_id;
--         IF OTP_exists = 0 THEN
--             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'OTP does not exist';
--         ELSE
--             DELETE FROM OTP WHERE account_ID = p_account_id;
--         END IF;
--     END IF;
-- END$$
-- DELIMITER ;

-- --------------------------------------------------------
-- Procedure structure for procedure `check_in`
-- CALL check_in('employee_id', 'iot_device_id', `date`, `time`, `value`, `type`)

DELIMITER $$
CREATE PROCEDURE `check_in`(
    IN p_employee_id INT,
    IN p_iot_device_id INT,
    IN p_date DATE,
    IN p_time TIME,
    IN p_value CHAR(255),
    IN p_type CHAR(255)
)
BEGIN
    DECLARE employee_exists INT;
    DECLARE device_exists INT;

    SELECT COUNT(*) INTO employee_exists FROM employee WHERE ID = p_employee_id;
    SELECT COUNT(*) INTO device_exists FROM iot_device WHERE ID = p_iot_device_id;
    IF employee_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee ID does not exist';
    ELSEIF device_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Device ID does not exist';
    ELSE
        INSERT INTO tracking_work_days(date, employee_ID)
        VALUES (p_date, p_employee_id);
        INSERT INTO iot_data(date, time, value, type, device_ID, employee_ID)
        VALUES (p_date, p_time, p_value, p_type, p_iot_device_id, p_employee_id);
    END IF;
END$$




-- --------------------------------------------------------
-- Insert some data
CALL add_staff('staff1', 'password');
CALL add_staff('staff2', 'password');
CALL add_staff('staff3', 'password');

CALL add_manager('manager1', 'password');
CALL add_manager('manager2', 'password');
CALL add_manager('manager3', 'password');

CALL send_form(4, 1, 'send form 1');
CALL send_form(5, 2, 'send form 2');
CALL send_form(6, 3, 'send form 3');

CALL respond_form(4, 1, 'respond form 1');
CALL respond_form(5, 2, 'respond form 2');
CALL respond_form(6, 3, 'respond form 3');

CALL update_info(1, 'password', '0123456789', 'address 1', 'images/avatar_1.png');


-- --------------------------------------------------------








