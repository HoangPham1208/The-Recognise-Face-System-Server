-- Day 1
CALL check_in (1, 1, '2024-03-01', '7:41:34', 'Late', 'late for 11 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-01', '11:54:47', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-01', '15:10:10', 'Late', 'Late for 100 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-01', '15:39:55', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-01', '16:59:03', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-01', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-01','Completed',1);

-- Day 2
CALL check_in (1, 1, '2024-03-02', '7:28:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-02', '11:57:23', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-02', '13:33:15', 'Late', 'Late for 3 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-02', '14:59:42', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-02', '15:58:10', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-02', '16:59:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-02', '16:59:59', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-02', '16:30:00', 'Soon', 'Soon for 30 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-02','Completed',1);

-- Day 4
CALL check_in (1, 1, '2024-03-04', '7:20:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-04', '11:50:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-04', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-04', '15:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-04', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-04', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-04','Completed',1);

-- Day 5
CALL check_in (1, 1, '2024-03-05', '7:25:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-05', '11:55:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-05', '13:35:00', 'Late', 'Late for 5 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-05', '15:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-05', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-05', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-05','Completed',1);

-- Day 6
CALL update_status_tracking_absent('2024-03-06','Absent',1);

-- Day 7
CALL check_in (1, 1, '2024-03-07', '7:18:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-07', '11:52:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-07', '13:37:00', 'Late', 'Late for 7 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-07', '15:47:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-07', '16:42:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-07', '17:12:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-07','Completed',1);

-- Day 8
CALL check_in (1, 1, '2024-03-08', '7:24:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-08', '11:49:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-08', '13:31:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-08', '15:41:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-08', '16:39:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-08', '17:09:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-08','Completed',1);

-- Day 9
CALL check_in (1, 1, '2024-03-09', '7:21:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-09', '11:51:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-09', '13:34:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-09', '15:46:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-09', '16:41:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-09', '17:11:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-09','Completed',1);

-- Day 11
CALL check_in (1, 1, '2024-03-11', '7:19:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-11', '11:55:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-11', '13:48:00', 'Late', 'Late for 18 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-11', '15:44:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-11', '16:36:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-11', '17:06:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-11','Completed',1);

-- Day 12
CALL check_in (1, 1, '2024-03-12', '7:17:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-12', '11:56:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-12', '13:39:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-12', '15:43:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-12', '16:34:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-12', '17:08:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-12','Completed',1);

-- Day 13
CALL check_in (1, 1, '2024-03-13', '7:26:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-13', '11:54:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-13', '13:47:00', 'Late', 'Late for 17 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-13', '15:42:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-13', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-13', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-13','Completed',1);

-- Day 14
CALL check_in (1, 1, '2024-03-14', '7:20:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-14', '11:58:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-14', '13:40:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-14', '15:41:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-14', '16:33:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-14', '17:11:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-14','Completed',1);

-- Day 15
CALL check_in (1, 1, '2024-03-15', '7:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-15', '11:50:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-15', '13:35:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-15', '16:55:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-15','Completed',1);

-- Day 16
CALL update_status_tracking_absent('2024-03-16','Absent',1);

-- Day 18
CALL check_in (1, 1, '2024-03-18', '7:32:00', 'Late', 'Late for 2 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-18', '11:52:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-18', '13:42:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-18', '15:38:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-18', '16:42:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-18', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-18','Completed',1);


-- Day 19
CALL check_in (1, 1, '2024-03-19', '7:29:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-19', '11:51:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-19', '13:38:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-19', '15:39:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-19', '16:41:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-19', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-19','Completed',1);

-- Day 20
CALL check_in (1, 1, '2024-03-20', '7:31:00', 'Late', 'Late for 1 minute', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-20', '11:48:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-20', '13:42:00', 'Normal', 'Go in', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-20', '15:50:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-20', '16:48:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-20', '16:44:00', 'Soon', 'Soon for 16 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-20','Completed',1);

-- Day 21
CALL check_in (1, 1, '2024-03-21', '7:29:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-21', '11:55:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-21', '13:52:00', 'Late', 'Late for 22 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-21', '15:39:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-21', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-21', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-21','Completed',1);

-- Day 22
CALL check_in (1, 1, '2024-03-22', '7:33:00', 'Late', 'Late for 3 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-22', '11:52:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-22', '13:39:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-22', '15:41:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-22', '16:42:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-22', '16:44:00', 'Soon', 'Soon for 16 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-22','Completed',1);

-- Day 23
CALL check_in (1, 1, '2024-03-23', '7:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-23', '11:45:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-23', '13:40:00', 'Normal', 'Go in', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-23', '15:50:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-23', '16:50:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-23', '16:45:00', 'Soon', 'Soon for 15 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-23','Completed',1);


-- Day 25
CALL check_in (1, 1, '2024-03-25', '7:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-25', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-25', '13:46:00', 'Late', 'Late for 16 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-25', '15:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-25', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-25', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-25','Completed',1);

-- Day 26
CALL check_in (1, 1, '2024-03-26', '7:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-26', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-26', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-26', '15:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-26', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-26', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-26','Completed',1);

-- Day 27
CALL check_in (1, 1, '2024-03-27', '7:35:00', 'Late', 'Late for 5 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-27', '12:10:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-27', '14:00:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-27', '15:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-27', '16:50:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-27', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-27','Completed',1);

-- Day 28
CALL check_in (1, 1, '2024-03-28', '7:40:00', 'Late', 'Late for 10 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-28', '12:05:00', 'Late', 'Late for 5 minutes', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-28', '14:10:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-28', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-28', '16:55:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-28', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-28','Completed',1);

-- Day 29
CALL check_in (1, 1, '2024-03-29', '7:25:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-29', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-29', '14:05:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-29', '16:00:00', 'Normal', 'Good', 'Check out');
CALL check_in (1, 1, '2024-03-29', '16:50:00', 'Normal', 'Good', 'Check in');
CALL check_in (1, 2, '2024-03-29', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-29','Completed',1);

-- Day 30
CALL check_in (1, 1, '2024-03-30', '7:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-03-30', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-03-30', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-03-30', '15:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-03-30', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-03-30', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-03-30','Completed',1);


-- Day 1 (April 1st)
CALL check_in (1, 1, '2024-04-01', '07:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-01', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-01', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-01', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-01', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-01', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-01','Completed',1);

-- Day 2 (April 2nd)
CALL check_in (1, 1, '2024-04-02', '07:25:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-02', '11:55:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-02', '13:55:00', 'Late', 'Late for 25 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-02', '15:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-02', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-02', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-02','Completed',1);

-- Day 3 (April 3rd)
CALL check_in (1, 1, '2024-04-03', '07:20:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-03', '11:50:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-03', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-03', '15:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-03', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-03', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-03','Completed',1);

-- Day 4 (April 4th)
CALL check_in (1, 1, '2024-04-04', '07:15:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-04', '11:45:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-04', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-04', '15:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-04', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-04', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-04','Completed',1);

-- Day 5 (April 5th)
CALL check_in (1, 1, '2024-04-05', '07:35:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-05', '12:05:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-05', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-05', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-05', '16:50:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-05', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-05','Completed',1);

-- Day 6 (April 6th)
CALL check_in (1, 1, '2024-04-06', '07:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-06', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-06', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-06', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-06', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-06', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-06','Completed',1);


-- Day 8 (April 8th)
-- No morning shift data available

CALL check_in (1, 1, '2024-04-08', '13:40:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-08', '15:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-08', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-08', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-08','Completed',1);

-- Day 9 (April 9th)
-- No morning shift data available

CALL check_in (1, 1, '2024-04-09', '13:35:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-09', '15:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-09', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-09', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-09','Completed',1);

-- Day 10 (April 10th)
-- No morning shift data available

CALL check_in (1, 1, '2024-04-10', '13:35:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-10', '15:50:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-10', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-10', '17:15:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-10','Completed',1);

-- Day 11 (April 11th)
CALL check_in (1, 1, '2024-04-11', '07:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-11', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-11', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-11', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-11', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-11', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-11','Completed',1);

-- Day 12 (April 12th)
CALL check_in (1, 1, '2024-04-12', '07:25:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-12', '11:55:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-12', '13:55:00', 'Late', 'Late for 25 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-12', '15:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-12', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-12', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-12','Completed',1);

-- Day 13 (April 13th)
-- No morning shift data available

CALL check_in (1, 1, '2024-04-13', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-13', '15:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-13', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-13', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-13','Completed',1);


-- Day 15 (April 15th)
CALL check_in (1, 1, '2024-04-15', '07:35:00', 'Late', 'Late for 5 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-15', '7:50:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-15', '8:00:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-15', '12:05:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-15', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-15', '16:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-15', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-15', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-15','Completed',1);

-- Day 16 (April 16th)
CALL check_in (1, 1, '2024-04-16', '07:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-16', '7:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-16', '8:10:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-16', '12:10:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-16', '14:00:00', 'Late', 'Late for 30 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-16', '16:05:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-16', '16:20:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-16', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-16','Completed',1);

-- Day 17 (April 17th)
CALL check_in (1, 1, '2024-04-17', '07:40:00', 'Late', 'Late for 10 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-17', '7:45:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-17', '8:05:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-17', '12:00:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-17', '13:55:00', 'Late', 'Late for 25 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-17', '16:10:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-17', '16:24:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-17', '16:46:00', 'Soon', 'Soon for 16 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-17','Completed',1);

-- Day 18 (April 18th)
CALL check_in (1, 1, '2024-04-18', '07:45:00', 'Late', 'Late for 15 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-18', '7:50:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-18', '8:15:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-18', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-18', '13:45:00', 'Late', 'Late for 15 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-18', '16:15:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-18', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-18', '16:55:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-18','Completed',1);

-- Day 19 (April 19th)
CALL check_in (1, 1, '2024-04-19', '07:50:00', 'Late', 'Late for 20 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-19', '7:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-19', '8:20:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-19', '12:20:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-19', '13:40:00', 'Late', 'Late for 10 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-19', '16:20:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-19', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-19', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-19','Completed',1);

-- Day 20 (April 20th)
CALL check_in (1, 1, '2024-04-20', '07:35:00', 'Late', 'Late for 5 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-20', '07:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-20', '08:10:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-20', '12:05:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-20', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-20', '16:15:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-20', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-20', '16:40:00', 'Soon', 'Soon for 10 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-20','Completed',1);

-- Day 22 (April 22nd)
CALL check_in (1, 1, '2024-04-22', '07:00:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-22', '07:55:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-22', '08:20:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-22', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-22', '13:45:00', 'Late', 'Late for 15 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-22', '16:25:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-22', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-22', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-22','Completed',1);

-- Day 23 (April 23rd)
CALL check_in (1, 1, '2024-04-23', '08:00:00', 'Late', 'Late for 30 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-23', '08:05:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-23', '08:25:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-23', '12:20:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-23', '14:10:00', 'Late', 'Late for 15 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-23', '16:30:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-23', '16:50:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-23', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-23','Completed',1);

-- Day 24 (April 24th)
CALL check_in (1, 1, '2024-04-24', '06:45:00', 'Late', 'Late for 15 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-24', '08:10:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-24', '08:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-24', '12:25:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-24', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-24', '16:35:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-24', '16:55:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-24', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-24','Completed',1);

-- Day 25 (April 25th)
CALL check_in (1, 1, '2024-04-25', '07:10:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-25', '12:20:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-25', '14:15:00', 'Late', 'Late for 45 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-25', '16:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-25', '17:25:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-25', '17:15:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-25','Completed',1);

-- Day 26 (April 26th)
CALL check_in (1, 1, '2024-04-26', '07:35:00', 'Late', 'Late for 5 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-26', '08:20:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-26', '08:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-26', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-26', '14:00:00', 'Late', 'Late for 30 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-26', '16:20:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-26', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-26', '17:10:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-26','Completed',1);

-- Day 27 (April 27th)
CALL check_in (1, 1, '2024-04-27', '07:55:00', 'Late', 'Late for 25 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-27', '08:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-27', '08:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-27', '12:10:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-27', '13:46:00', 'Late', 'Late for 16 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-27', '16:25:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-27', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-27', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-27','Completed',1);


-- Day 29 (April 29th)
CALL check_in (1, 1, '2024-04-29', '07:45:00', 'Late', 'Late for 15 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-29', '08:10:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-29', '08:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-29', '12:25:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-29', '14:00:00', 'Late', 'Late for 30 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-29', '16:35:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-29', '16:40:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-29', '17:00:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-29','Completed',1);

-- Day 30 (April 30th)
CALL check_in (1, 1, '2024-04-30', '07:50:00', 'Late', 'Late for 20 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-04-30', '08:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-30', '08:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-30', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-04-30', '13:50:00', 'Late', 'Late for 20 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-04-30', '16:40:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-04-30', '16:45:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-04-30', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-04-30','Completed',1);

-- Day 1 (May 1st)
CALL check_in (1, 1, '2024-05-01', '07:40:00', 'Late', 'Late for 10 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-05-01', '08:05:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-01', '08:25:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-01', '12:20:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-05-01', '13:46:00', 'Late', 'Late for 16 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-05-01', '16:30:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-01', '16:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-01', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-05-01','Completed',1);

-- Day 2 (May 2nd)
CALL update_status_tracking_absent('2024-05-02','Absent',1);

-- Day 3 (May 3rd)
CALL check_in (1, 1, '2024-05-03', '07:05:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-05-03', '08:20:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-03', '08:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-03', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-05-03', '13:47:00', 'Late', 'Late for 17 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-05-03', '16:20:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-03', '16:24:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-03', '16:42:00', 'Soon', 'Soon for 18 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-05-03','Completed',1);

-- Day 4 (May 4th)
CALL check_in (1, 1, '2024-05-04', '07:20:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-05-04', '08:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-04', '08:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-04', '12:10:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-05-04', '14:15:00', 'Late', 'Late for 15 minutes', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-05-04', '16:25:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-04', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-04', '16:35:00', 'Soon', 'Soon for 25 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-05-04','Completed',1);


-- Day 6 (May 6th)
CALL check_in (1, 1, '2024-05-06', '07:30:00', 'On time', 'Good', 'First check in for morning shift');
CALL check_in (1, 2, '2024-05-06', '08:05:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-06', '08:25:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-06', '12:20:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-05-06', '13:30:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-05-06', '16:30:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-06', '17:25:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-06', '17:05:00', 'On time', 'Good', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-05-06','Completed',1);

-- Day 7 (May 7th)
CALL check_in (1, 1, '2024-05-07', '07:50:00', 'Late', 'Late for 20 minutes', 'First check in for morning shift');
CALL check_in (1, 2, '2024-05-07', '08:00:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-07', '08:35:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-07', '12:15:00', 'On time', 'Good', 'Last check out for morning shift');
CALL check_in (1, 1, '2024-05-07', '14:15:00', 'On time', 'Good', 'First check in for afternoon shift');
CALL check_in (1, 2, '2024-05-07', '16:25:00', 'Normal', 'Go out', 'Check out');
CALL check_in (1, 1, '2024-05-07', '16:30:00', 'Normal', 'Go in', 'Check in');
CALL check_in (1, 2, '2024-05-07', '16:40:00', 'Soon', 'Soon for 20 minutes', 'Last check out for afternoon shift');
CALL update_status_tracking_absent('2024-05-07','Completed',1);