-- Create tables

-- servicetype
CREATE TABLE IF NOT EXISTS public.servicetype
(
    typeid varchar(5) NOT NULL,
    typename varchar(50),
    servicetime integer,
    CONSTRAINT servicetype_pk PRIMARY KEY (typeid)
);
ALTER TABLE IF EXISTS public.servicetype OWNER TO officequeuemanager;

-- counter
CREATE TABLE IF NOT EXISTS public.counter
(
    counterid varchar(5) NOT NULL,
    typeamount integer,
    typeids varchar(5)[],
    CONSTRAINT counter_pkey PRIMARY KEY (counterid)
);
ALTER TABLE IF EXISTS public.counter OWNER TO officequeuemanager;

-- ticket
CREATE TABLE IF NOT EXISTS public.ticket
(
    ticketid varchar(10) NOT NULL,
    typeid varchar(5),
    CONSTRAINT ticket_pkey PRIMARY KEY (ticketid),
    CONSTRAINT ticket_typeid_fkey FOREIGN KEY (typeid)
        REFERENCES public.servicetype (typeid)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.ticket OWNER TO officequeuemanager;

-- queue
CREATE TABLE IF NOT EXISTS public.queue
(
    queueid serial NOT NULL,
    typeid varchar(5),
    queuelength integer,
    CONSTRAINT queue_pkey PRIMARY KEY (queueid),
    CONSTRAINT queue_typeid_fkey FOREIGN KEY (typeid)
        REFERENCES public.servicetype (typeid)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.queue OWNER TO officequeuemanager;