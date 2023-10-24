--counter
insert into public.counter(counterid, typeamount, typeids) 
values
('01', 3, '{"A", "B", "C"}'),
('02', 2, '{"C", "D"}'),
('03', 2, '{"E", "F"}'),
('04', 1, '{"E"}'),
('05', 4, '{"A", "B", "C", "D"}');

--servicetype
insert into public.servicetype(typeid, typename, servicetime) 
values
('A', 'Save', 300),
('B', 'Loan', 900),
('C', 'Transfer', 600),
('D', 'Remittance', 1800),
('E', 'Investment', 3600),
('F', 'Stock', 1200);

--queue
insert into public.queue(typeid, queuelength) 
values
('A', 2),
('B', 302),
('C', 14),
('D', 1),
('E', 8),
('F', 36);

--ticket
insert into public.ticket(ticketid, typeid) 
values
('A01', 'A'),
('B678', 'B'),
('F39', 'F'),
('A23','A'),
('C32', 'C'),
('D06', 'D'),
('E88', 'E'),
('B2048', 'B');
