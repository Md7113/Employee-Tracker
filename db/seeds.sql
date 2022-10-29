INSERT INTO departmnet (name)
VALUES ('Macys Department Store');

INSERT INTO departmnet_role (title , salary , department_id)
VALUES  ('Manager', '169000', 1),
        ('sales', '145000', 1),
        ('cleaning', '100000', 1),
        ('interns', '90000', 1);

INSERT INTO departmnet_employee (first_name , last_name , role_id , manager_id)
VALUES  ('dom', 'wiggins', 1 , NULL),
        ('kyle', 'vance', 2 , 1),
        ('angel', 'matias', 3 , 2),
        ('aaron', 'schular', 4 , 3);