-- Add John Banda, Mary Phiri, and David Mwale with specific registration numbers and departments
INSERT INTO nrbdb (full name,  Id-number, surname, status)
VALUES
  ('John Banda', 'dFDGzml5', 'Banda' 'ALIVE'),
  ('Mary Phiri', 'BSC-BIO-10-21', 3.92, 'Biological Sciences', 4, 'ACTIVE'),
  ('David Mwale', 'BA-20-20', 3.45, 'Arts', 3, 'ACTIVE')
ON CONFLICT ("registrationNumber") DO NOTHING;

-- Show the added students
SELECT name, "", GPA, department, "yearOfStudy", status
FROM nrbdb
WHERE name IN ('John Banda', 'Mary Phiri', 'David Mwale');
