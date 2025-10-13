-- Създаваме таблица за падел мачове
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    location VARCHAR(100) NOT NULL,
    partner VARCHAR(100),
    result VARCHAR(10) CHECK (result IN ('win', 'loss')),
    score VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Примерни данни
INSERT INTO matches (date, location, partner, result, score)
VALUES
('2025-10-10', 'Padel Arena Varna', 'Ivan Petrov', 'win', '6-4, 6-3'),
('2025-10-11', 'Padel Sofia Club', 'Georgi Dimitrov', 'loss', '4-6, 3-6'),
('2025-10-12', 'Padel Arena Varna', 'Nikolay Todorov', 'win', '6-2, 6-7, 10-8'),
('2025-10-13', 'Padel Burgas Court', 'Petar Iliev', 'win', '7-5, 6-4');
