CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

INSERT INTO utilisateur (nom, email)
VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');
