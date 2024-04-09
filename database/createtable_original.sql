
--
-- Database: `smarthome`
--
drop schema if exists `smart_home`;
CREATE SCHEMA IF NOT EXISTS `smart_home`;
USE `smart_home`;
-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `account` (
  `Id` int(10) NOT NULL,
  `Avatar` mediumblob NOT NULL,
  `Name` char(255) NOT NULL,
  `Phone_Num` int(10) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Address` char(255) NOT NULL,
  `Face_Model` longblob NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `Id` int(10) NOT NULL,
  `Send_By` int(10) NOT NULL,
  `Date_Time` datetime NOT NULL,
  `Descripttion` text NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Id` int(10) NOT NULL,
  `Position` char(255) NOT NULL,
  `Working_Days` int(5) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `Id` int(10) NOT NULL,
  `Type` char(255) NOT NULL,
  `Date_Time` datetime NOT NULL,
  `Staus` char(255) NOT NULL,
  `Note` text NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `has_announcement`
--

CREATE TABLE `has_announcement` (
  `Employee_Id` int(10) NOT NULL,
  `Announcement_Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `iot data`
--

CREATE TABLE `iot_data` (
  `Id` int(10) NOT NULL,
  `Date_Time` datetime NOT NULL,
  `Value` longblob NOT NULL,
  `Device_Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `iot device`
--

CREATE TABLE `iot_device` (
  `Id` int(10) NOT NULL,
  `Name` char(255) NOT NULL,
  `Status` char(255) NOT NULL,
  `Location` char(255) NOT NULL,
  `Role` char(255) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `Code` int(6) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Account_id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `Manager_Id` int(10) NOT NULL,
  `Staff_Id` int(10) NOT NULL,
  `Form_Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `time status`
--

CREATE TABLE `time_status` (
  `Date` datetime NOT NULL,
  `Time` time NOT NULL,
  `Status` char(255) NOT NULL,
  `Type` char(255) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `tracking_work_days`
--

CREATE TABLE `tracking_work_days` (
  `Date` datetime NOT NULL,
  `Total_Hour` int(2) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Employee_Id` int(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `working_time`
--

CREATE TABLE `working_time` (
  `Id` int(10) NOT NULL,
  `Begin_At` datetime NOT NULL,
  `End_At` datetime NOT NULL
);

-------------------------------------------------------------------------------

ALTER TABLE `account`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `announcement`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `form`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `has_announcement`
  ADD PRIMARY KEY (`Employee_Id`,`Announcement_Id`);


ALTER TABLE `iot_data`
  ADD PRIMARY KEY (`Id`,`Device_Id`);


ALTER TABLE `iot_device`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `manager`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `otp`
  ADD PRIMARY KEY (`Account_id`);


ALTER TABLE `request`
  ADD PRIMARY KEY (`ManagerIdEnd_AtId_Id`,`Staff_Id`,`Form_Id`);


ALTER TABLE `staff`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `time_status`
  ADD PRIMARY KEY (`Date`);


ALTER TABLE `tracking_work_days`
  ADD PRIMARY KEY (`Date`,`Employee_Id`);


ALTER TABLE `working_time`
  ADD PRIMARY KEY (`Id`,`Begin_At`,`End_At`);


---------------------------------------------------------------


ALTER TABLE `has_announcement`
  ADD CONSTRAINT `has_announcement_FK_1` FOREIGN KEY (`Announcement_Id`) REFERENCES `announcement` (`Id`),
  ADD CONSTRAINT `has_announcement_FK_2` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`);

ALTER TABLE `otp`
  ADD CONSTRAINT `otp_FK_1` FOREIGN KEY (`Account_Id`) REFERENCES `account` (`Id`);
  
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_FK_1` FOREIGN KEY (`Id`) REFERENCES `account` (`Id`);
  
ALTER TABLE `working_time`
  ADD CONSTRAINT `working_time_FK_1` FOREIGN KEY (`Id`) REFERENCES `employee` (`Id`);
  
ALTER TABLE `iot_data`
  ADD CONSTRAINT `iot_data_FK_1` FOREIGN KEY (`Device_Id`) REFERENCES `iot_device` (`Id`);
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_FK_1` FOREIGN KEY (`Id`) REFERENCES `employee` (`Id`);
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_FK_1` FOREIGN KEY (`Id`) REFERENCES `employee` (`Id`);
ALTER TABLE `tracking_work_days`
  ADD CONSTRAINT `tracking_work_days_FK_1` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`);
ALTER TABLE `time_status`
  ADD CONSTRAINT `time_status_FK_1` FOREIGN KEY (`Date`) REFERENCES `tracking_work_days` (`Date`);
ALTER TABLE `request`
  ADD CONSTRAINT `request_FK_1` FOREIGN KEY (`Manager_Id`) REFERENCES `manager` (`Id`),
  ADD CONSTRAINT `request_FK_2` FOREIGN KEY (`Staff_Id`) REFERENCES `staff` (`Id`),
  ADD CONSTRAINT `request_FK_3` FOREIGN KEY (`Form_Id`) REFERENCES `form` (`Id`);
  


