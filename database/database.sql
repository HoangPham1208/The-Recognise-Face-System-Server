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
  `status` char(10) NOT NULL,
  `face_model` char(255)
) ;

-- --------------------------------------------------------
-- Table structure for table `employee`

CREATE TABLE `employee` (
  `ID` int(10) NOT NULL,
  `position` char(255),
  `working_days` int(5) NOT NULL,
  `address` char(255),
  `email` char(255),
  `name` char(255),
  `phone_num` char(15)
) ;

ALTER TABLE `employee`
  ADD PRIMARY KEY (`ID`);	

ALTER TABLE `account`
  ADD CONSTRAINT `account_FK_1` FOREIGN KEY (`ID`) REFERENCES `employee` (`ID`);

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
  `type` char(255),
  `date_time_send` datetime,
  `status` char(255),
  `note` text,
  `date_time_respond` datetime,
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
  `description` text
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
--     'employee_id',
--     'account_name_value',
--     'password_value',
--     'avatar_value',
--     'status_value',
--     'face_model_value',
--     working_days_value
-- );

DELIMITER $$
CREATE PROCEDURE `add_account_0`(
  IN p_employee_id INT(10),
  IN p_account_name CHAR(255),
  IN p_password CHAR(255),
  IN p_avatar MEDIUMTEXT,
  IN p_status CHAR(10),
  IN p_face_model MEDIUMTEXT,
  IN p_working_days INT(5)
)

BEGIN
  DECLARE my_position CHAR(255);
  DECLARE account_id INT;
  INSERT INTO account (ID, account_name, password, avatar, status, face_model)
  VALUES (p_employee_id, p_account_name, p_password, p_avatar, p_status, p_face_model);
  SELECT position INTO my_position FROM employee WHERE employee.ID = p_employee_id;
  IF my_position = 'manager' THEN
	INSERT INTO manager(ID) VALUES (p_employee_id) ;
  ELSE
	INSERT INTO staff(ID) VALUES (p_employee_id) ;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `add_account`(
    IN p_account_name CHAR(255),
    IN p_password CHAR(255),
    IN p_employee_id INT(10)
)
BEGIN
    CALL add_account_0(
		p_employee_id,
        p_account_name, 
        p_password, 
        NULL,  -- avatar
        'unactive', -- status is default to 'active'
        NULL,  -- face_model
        0   -- working_days
    );
END$$
DELIMITER ;

-- --------------------------------------------------------
-- Procedure structure for procedure `has_announcementsend_form`
-- CALL send_form('staff_id', 'type', 'date_time', 'note')

DELIMITER $$
CREATE PROCEDURE `send_form`(
    IN p_staff_id INT,
    IN p_type CHAR(255),
    IN p_date_time DATETIME,
    IN p_note TEXT
)
BEGIN
	DECLARE is_manager INT;
    DECLARE staff_exists INT;
    DECLARE first_manager_id INT;
	SELECT COUNT(*) INTO is_manager FROM manager WHERE ID = p_staff_id;
    IF is_manager != 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only Staff can send form - you are manager';
	END IF;
    
    SELECT COUNT(*) INTO staff_exists FROM staff WHERE ID = p_staff_id;
    IF staff_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Staff ID does not exist';
    ELSE
        INSERT INTO form (type, date_time_send, status, note)
        VALUES (p_type, p_date_time, 'Đang chờ duyệt', p_note);
        -- Get the first manager ID
        SELECT ID INTO first_manager_id FROM manager LIMIT 1;
        INSERT INTO request (manager_ID, staff_ID, form_ID)
        VALUES (first_manager_id, p_staff_id, LAST_INSERT_ID());
    END IF;
END$$
DELIMITER ;

-- Procedure structure for procedure `respond_form`
-- CALL respond_form('form_id', 'manager_id', 'status', 'date_time', 'response')

DELIMITER $$
CREATE PROCEDURE `respond_form`(
    IN p_form_id INT,
    IN p_manager_id INT,
    IN p_status CHAR(255),
    IN p_date_time DATETIME,
    IN p_response TEXT
)
BEGIN
    DECLARE form_exists INT;
    DECLARE manager_exists INT;

    SELECT COUNT(*) INTO form_exists FROM form WHERE ID = p_form_id;
    SELECT COUNT(*) INTO manager_exists FROM manager WHERE ID = p_manager_id;
    IF form_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Form ID does not exist';
    ELSEIF manager_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manager ID does not exist';
    ELSE
        UPDATE request
        SET manager_ID = p_manager_id
        WHERE form_ID = p_form_id;
        UPDATE form
        SET `status` = p_status, date_time_respond = p_date_time, response = p_response
        WHERE ID = p_form_id;
    END IF;
END$$
DELIMITER ;
-- --------------------------------------------------------
-- Procedure structure for procedure `update_avatar` for a staff: avatar
-- CALL update_avatar('staff_id', 'avatar')

DELIMITER $$
CREATE PROCEDURE `update_avatar`(
    IN p_account_id INT,
    IN p_avatar MEDIUMTEXT
)
BEGIN
    DECLARE account_exists INT;
    SELECT COUNT(*) INTO account_exists FROM account WHERE ID = p_account_id;

    IF account_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account ID does not exist';
    ELSE
        UPDATE account
        SET avatar = p_avatar
        WHERE ID = p_account_id;
    END IF;
END$$
DELIMITER ;

-- --------------------------------------------------------
-- Procedure for create_OTP that expires in 5 minutes, auto delete after 5 minutes
-- The OTP code is 6-character long, randomly generated, example: A1B2C3, AA6B7C8, 98K7B6,...
-- SELECT check_OTP('account_id')

-- DELIMITER $$
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
    DECLARE employee_exists_in_tracking INT;

    SELECT COUNT(*) INTO employee_exists FROM employee WHERE ID = p_employee_id;
    SELECT COUNT(*) INTO device_exists FROM iot_device WHERE ID = p_iot_device_id;
    IF employee_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee ID does not exist';
    ELSEIF device_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Device ID does not exist';
    ELSE
        SELECT COUNT(*) INTO employee_exists_in_tracking FROM tracking_work_days WHERE employee_ID = p_employee_id AND date = p_date;
        IF employee_exists_in_tracking = 0 THEN
            INSERT INTO tracking_work_days(date, status, employee_ID)
            VALUES (p_date, '', p_employee_id);
        END IF;
        INSERT INTO iot_data(date, time, value, type, device_ID, employee_ID)
        VALUES (p_date, p_time, p_value, p_type, p_iot_device_id, p_employee_id);
    END IF;
END$$


-- --------------------------------------------------------
-- Procedure structure for procedure `add_iot_data`
-- CALL add_iot_device('employee_id', 'device_id', 'date', 'time', 'value', 'type')

DELIMITER $$
CREATE PROCEDURE `add_iot_data`(
    IN p_employee_id INT,
    IN p_device_id INT,
    IN p_date DATE,
    IN p_time TIME,
    IN p_value CHAR(255),
    IN p_type CHAR(255)
)
BEGIN
    DECLARE employee_exists INT;
    DECLARE device_exists INT;

    SELECT COUNT(*) INTO employee_exists FROM employee WHERE ID = p_employee_id;
    SELECT COUNT(*) INTO device_exists FROM iot_device WHERE ID = p_device_id;
    IF employee_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee ID does not exist';
    ELSEIF device_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Device ID does not exist';
    ELSE
        INSERT INTO iot_data(date, time, value, type, device_ID, employee_ID)
        VALUES (p_date, p_time, p_value, p_type, p_device_id, p_employee_id);
    END IF;
END$$
DELIMITER ;

-- --------------------------------------------------------
-- Procedure structure for procedure `add_announcement`
-- CALL add_announcement('send_by', 'date_time', 'description', 'employee_ID')

DELIMITER $$
CREATE PROCEDURE `add_announcement`(
    IN p_send_by INT,
    IN p_date_time DATETIME,
    IN p_description TEXT,
    IN p_employee_ID INT
)
BEGIN
    DECLARE employee_exists INT;

    SELECT COUNT(*) INTO employee_exists FROM employee WHERE ID = p_employee_ID;
    IF employee_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee ID does not exist';
    ELSE
        INSERT INTO announcement(send_by, date_time, description)
        VALUES (p_send_by, p_date_time, p_description);
        INSERT INTO has_announcement(announcement_ID, employee_ID)
        VALUES (LAST_INSERT_ID(), p_employee_ID);
    END IF;
END$$
DELIMITER ;



-- --------------------------------------------------------
-- Insert some data
-- CALL send_form(4, 1, 'send form 1');
-- CALL send_form(5, 2, 'send form 2');
-- CALL send_form(6, 3, 'send form 3');

-- CALL respond_form(4, 1, 'respond form 1');
-- CALL respond_form(5, 2, 'respond form 2');
-- CALL respond_form(6, 3, 'respond form 3');

-- CALL update_avatar(1,'images/avatar_1.png');


-- --------------------------------------------------------
INSERT INTO `facial_recognition`.`iot_device` (`ID`, `name`, `status`, `location`, `role`) VALUES ('1', 'Check In', 'active', 'H1', 'check in');
INSERT INTO `facial_recognition`.`iot_device` (`ID`, `name`, `status`, `location`, `role`) VALUES ('2', 'Check Out', 'active', 'H2', 'check out');

-- Employee Data
INSERT INTO `facial_recognition`.`employee` (`ID`, `position`, `working_days`, `address`, `email`, `name`, `phone_num`) VALUES ('1', 'manager', '1000', '1 St. AAA', '1A@gmail.com', 'A.A.A', '12345678');
INSERT INTO `facial_recognition`.`employee` (`ID`, `position`, `working_days`, `address`, `email`, `name`, `phone_num`) VALUES ('2', 'manager', '1000', '2 St. BBB', '2B@gmail.com', 'B.B.B', '12345678');
INSERT INTO `facial_recognition`.`employee` (`ID`, `position`, `working_days`, `address`, `email`, `name`, `phone_num`) VALUES ('3', 'staff', '200', '3 St. CCC', '3C@gmail.com', 'C.C.C', '12345678');
INSERT INTO `facial_recognition`.`employee` (`ID`, `position`, `working_days`, `address`, `email`, `name`, `phone_num`) VALUES ('4', 'staff', '300', '4 St. DDD', '4D@gmail.com', 'D.D.D', '12345678');
INSERT INTO `facial_recognition`.`employee` (`ID`, `position`, `working_days`, `address`, `email`, `name`, `phone_num`) VALUES ('5', 'staff', '400', '5 St. EEE', '5E@gmail.com', 'E.E.E', '12345678');

-- Insert some data
-- That hash mean "password"
CALL add_account('staff1', '$2a$10$Ob7zA3gQPto7Femww63GWeIPk5.WZ.jGN5qT8jRj5Ip31ooWPHiky','1');
CALL add_account('staff3', '$2a$10$Ob7zA3gQPto7Femww63GWeIPk5.WZ.jGN5qT8jRj5Ip31ooWPHiky','3');
CALL add_account('staff4', '$2a$10$Ob7zA3gQPto7Femww63GWeIPk5.WZ.jGN5qT8jRj5Ip31ooWPHiky','4');
