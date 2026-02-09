-- Recreate the database
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

--Users
-----------------------
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_level VARCHAR(10) DEFAULT 'regular',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

--DiaryEntries
-----------------------
CREATE TABLE DiaryEntries (
    entry_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_diary_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

--Medications
-----------------------
CREATE TABLE Medications (
    medication_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    CONSTRAINT fk_med_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

--Exercises
-----------------------
CREATE TABLE Exercises (
    exercise_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    exercise_type VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    intensity VARCHAR(50),
    exercise_date DATE,
    CONSTRAINT fk_exercise_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

--Sample Data Insertion
------------------------

INSERT INTO Users (username, email, password, user_level) VALUES
('johndoe', 'johndoe@example.com', 'hashed_password', 'regular'),
('janedoe', 'janedoe@example.com', 'hashed_password', 'admin'),
('alice_jones', 'alice@example.com', 'hashed_password', 'regular'),
('bob_brown', 'bob@example.com', 'hashed_password', 'regular');

INSERT INTO DiaryEntries
(user_id, entry_date, mood, weight, sleep_hours, notes)
VALUES
(1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great workout session'),
(2, '2024-01-11', 'Satisfied', 65.0, 7, 'Met with friends'),
(3, '2024-01-12', 'Tired', 68.0, 6, 'Busy workday'),
(4, '2024-01-13', 'Energetic', 55.0, 9, 'Morning run'),
(4, '2024-01-14', 'Relaxed', 75.0, 8, 'Reading and resting');

INSERT INTO Medications
(user_id, medication_name, dosage, frequency, start_date, end_date)
VALUES
(1, 'Vitamin D', '1000 IU', 'Daily', '2024-01-01', '2024-06-01'),
(2, 'Ibuprofen', '200 mg', 'As needed', '2024-01-05', '2024-01-20'),
(2, 'Amoxicillin', '500 mg', 'Every 8 hours', '2024-01-10', '2024-01-20'),
(4, 'Metformin', '500 mg', 'Twice a day', '2024-01-15', '2024-07-15');

INSERT INTO Exercises
(user_id, exercise_type, duration_minutes, intensity, exercise_date)
VALUES
(1, 'Running', 30, 'High', '2024-01-10'),
(3, 'Cycling', 45, 'Medium', '2024-01-11'),
(2, 'Swimming', 55, 'Low', '2024-01-12'),
(1, 'Swimming', 30, 'Medium', '2024-01-16'),
(3, 'Yoga', 50, 'Low', '2024-01-18');
