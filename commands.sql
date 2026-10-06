CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (
  author, 
  url, 
  title
) VALUES (
  'Ahmet Emre DEMIRSEN',
  'https://medium.com/but-it-works-on-my-machine/relational-vs-nosql-which-database-should-you-choose-and-when-6c06523c79ef',
  'Relational vs NoSQL: Which Database Should You Choose and When?'
);

INSERT INTO blogs (
  author, 
  url, 
  title
) VALUES (
  'Bill Gates',
  'https://www.gatesnotes.com/work/make-ai-work-for-everyone/reader/a-turbulent-ai-era-and-critical-choices-to-make',
  'The turbulent AI era is here. The choices we make now are critical.'
);