
-- comment inline
/* comment more than a rows */
-- for update or delete data more than 1 used key IN (, ,)
-- * or arterisk used for mark all
-- if your columns have a data type integer use " " in insert data and values not into a string or ''

INSERT INTO public.tb_rzn(first_name, middle_name, last_name)
			VALUES ( 'muhamad', 'zuan', 'i can');
	
SELECT * FROM public.tb_rzn
	
UPDATE public.tb_rzn
	set last_name='mabarguys' --update value
	
WHERE id IN(1,2)
DELETE FROM public.tb_rzn WHERE id IN(6,2)