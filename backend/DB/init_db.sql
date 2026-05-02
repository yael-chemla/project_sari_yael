USE social_app;


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE comments;
TRUNCATE TABLE posts;
TRUNCATE TABLE todos;
TRUNCATE TABLE passwords;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO users (id, name, email) VALUES 
(1, 'Shlomo', 'shlomo@example.com'),
(2, 'Sara', 'sara@example.com'),
(3, 'Yossi', 'yossi@example.com'),
(4, 'Rivka', 'rivka@test.io'),
(5, 'Avraham', 'avraham@dev.com'),
(6, 'Michal', 'michal@code.org'),
(7, 'David', 'david@example.com'),
(8, 'Noa', 'noa@web.com'),
(9, 'Itay', 'itay@tech.com'),
(10, 'Tamar', 'tamar@study.io');


INSERT INTO passwords (userId, password) VALUES 
(1, '123456'), (2, '123456'), (3, '123456'), (4, '123456'), (5, '123456'),
(6, '123456'), (7, '123456'), (8, '123456'), (9, '123456'), (10, '123456');


INSERT INTO todos (userId, title, completed) VALUES 
(1, 'Finish DB Setup', true), (1, 'Write Express API', false), (1, 'CSS Design', false),
(2, 'Login Page React', true), (2, 'Local Storage Logic', true),
(3, 'Bug fixing', false), (3, 'Review PRs', true),
(4, 'Planning Architecture', true), (4, 'Deployment', false),
(5, 'Unit Testing', false), (6, 'Client Meeting', true),
(7, 'Documentation', false), (8, 'Refactoring', true),
(9, 'New Feature research', false), (10, 'Final Presentation', false);


INSERT INTO posts (id, userId, title, body) VALUES 
(1, 1, 'Welcome to my app', 'This is the first post ever on this platform!'),
(2, 2, 'Learning React Hooks', 'I just learned about useEffect and it is amazing.'),
(3, 3, 'SQL vs NoSQL', 'Why I chose MySQL for this specific project.'),
(4, 5, 'NodeJS Performance', 'How to optimize your Express server for speed.'),
(5, 1, 'My Secret Recipe', 'Coffee + Code = Project finished.'),
(6, 6, 'CSS Grid is life', 'Stop using floats, start using grid today.'),
(7, 8, 'API Best Practices', 'Always use meaningful status codes in your REST API.'),
(8, 10, 'Junior Dev Journey', 'My first week as a fullstack student.');


INSERT INTO comments (postId, userId, name, email, body) VALUES 
(1, 2, 'Sara', 'sara@example.com', 'Wow, looks great Shlomo!'),
(1, 3, 'Yossi', 'yossi@example.com', 'Count me in.'),
(2, 1, 'Shlomo', 'shlomo@example.com', 'Check out the official docs too.'),
(2, 4, 'Rivka', 'rivka@test.io', 'Hooks changed my life.'),
(3, 5, 'Avraham', 'avraham@dev.com', 'SQL is much more reliable for this.'),
(4, 1, 'Shlomo', 'shlomo@example.com', 'Great tips, thanks for sharing.'),
(6, 8, 'Noa', 'noa@web.com', 'Grid is indeed much better than Flexbox for some things.'),
(8, 6, 'Michal', 'michal@code.org', 'Good luck on your journey!');