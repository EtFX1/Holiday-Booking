CREATE DATABASE IF NOT EXISTS holiday_booking;

USE holiday_booking;

CREATE TABLE IF NOT EXISTS staff_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    holiday_allowance_days INT NOT NULL,
    password VARCHAR(255) NOT NULL
);

USE holiday_booking;

CREATE TABLE IF NOT EXISTS requested_days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    days_requested INT NOT NULL,
    reason VARCHAR(300) NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES staff_members(id)
);
