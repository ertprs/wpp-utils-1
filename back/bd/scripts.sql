CREATE TABLE rules(
    rule_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
	rule_title VARCHAR(30) NOT NULL,
    rule_type VARCHAR(30) NOT NULL,
    rule_text VARCHAR(500) NOT NULL,
    rule_case_yes VARCHAR(50),
    rule_case_no VARCHAR(50)
)

CREATE TABLE settings(
    name VARCHAR(50),
    email VARCHAR(100),
    number VARCHAR(30)
)