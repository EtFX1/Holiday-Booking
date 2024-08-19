CREATE DATABASE IF NOT EXISTS holiday_booking;

USE holiday_booking;

CREATE TABLE IF NOT EXISTS staff_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    holiday_allowance_days INT NOT NULL,
    password VARCHAR(255) NOT NULL
);
