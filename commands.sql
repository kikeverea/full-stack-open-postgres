CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0);

INSERT INTO blogs
    (author, url, title, likes)
    VALUES ('John Doe', 'https://www.testblog.com/john', 'A test blog from John', 22);

INSERT INTO blogs
    (author, url, title, likes)
    VALUES ('Jane Doe', 'https://www.testblog.com/jane', 'A test blog form Jane', 20);