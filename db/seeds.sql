INSERT INTO department (name)
VALUES  ('finance'),
        ('sales'),
        ('legal'),
        ('distribution'),
        ('managment');

INSERT INTO department_role (title , salary , department_id)
VALUES  ('Manager_General', '169000', 5),
        ('sales_Manager', '160000', 5),
        ('legal_Manager', '160000', 5),
        ('CFO', '160000', 1),
        ('financial_analyst', '100000', 1),
        ('sales_rep', '90000', 2),
        ('legel_rep', '95000', 3),
        ('distribution_specialist', '90000', 4),
        ('truck_driver', '78000', 4);


INSERT INTO department_employee (first_name , last_name , role_id , manager_id)
VALUES  ('dom', 'wiggins', 1 , NULL),
        ('kyle', 'vance', 2 , 1),
        ('angel', 'matias', 3 , 1),
        ('vasu', 'appro', 4 , 1),
        ('ringo', 'tom', 5 , 4),
        ('greg', 'downy', 5 , 4),
        ('cory', 'davis', 6 , 2),
        ('aaron', 'schular', 6 , 2),
        ('donald', 'glover', 7 , 3),
        ('amanda', 'coffee', 7 , 3),
        ('harold', 'drift', 8 , 1),
        ('tom', 'sawyer', 9 , 11);