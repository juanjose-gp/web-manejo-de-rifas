--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-05-13 11:55:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 882 (class 1247 OID 26398)
-- Name: PurchaseStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PurchaseStatus" AS ENUM (
    'PENDING',
    'PAID',
    'CANCELLED'
);


ALTER TYPE public."PurchaseStatus" OWNER TO postgres;

--
-- TOC entry 861 (class 1247 OID 16655)
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN',
    'SPONSOR'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- TOC entry 879 (class 1247 OID 25539)
-- Name: TicketStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TicketStatus" AS ENUM (
    'AVAILABLE',
    'RESERVED',
    'SOLD'
);


ALTER TYPE public."TicketStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 25083)
-- Name: DiscountCode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DiscountCode" (
    id integer NOT NULL,
    code text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "usedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    "expiresAt" timestamp(3) without time zone,
    image_url text,
    "raffleId" integer NOT NULL,
    "validatedBy" integer,
    patrocinador text
);


ALTER TABLE public."DiscountCode" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25082)
-- Name: DiscountCode_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DiscountCode_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DiscountCode_id_seq" OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 226
-- Name: DiscountCode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DiscountCode_id_seq" OWNED BY public."DiscountCode".id;


--
-- TOC entry 225 (class 1259 OID 16692)
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    reference text,
    amount double precision,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    provider text
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16691)
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 224
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- TOC entry 229 (class 1259 OID 26406)
-- Name: Purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Purchase" (
    id integer NOT NULL,
    "raffleId" integer NOT NULL,
    "buyerName" text NOT NULL,
    "buyerPhone" text,
    "buyerEmail" text NOT NULL,
    "totalAmount" double precision NOT NULL,
    status public."PurchaseStatus" NOT NULL,
    "paymentId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "discountCodeId" integer,
    "validationCode" text,
    "validationCodeUsedAt" timestamp(3) without time zone
);


ALTER TABLE public."Purchase" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 26405)
-- Name: Purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Purchase_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Purchase_id_seq" OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 228
-- Name: Purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Purchase_id_seq" OWNED BY public."Purchase".id;


--
-- TOC entry 221 (class 1259 OID 16673)
-- Name: Raffle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Raffle" (
    id integer NOT NULL,
    title text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    ticket_price double precision NOT NULL,
    total_numbers integer NOT NULL,
    image_url text
);


ALTER TABLE public."Raffle" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16672)
-- Name: Raffle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Raffle_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Raffle_id_seq" OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 220
-- Name: Raffle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Raffle_id_seq" OWNED BY public."Raffle".id;


--
-- TOC entry 223 (class 1259 OID 16684)
-- Name: Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket" (
    id integer NOT NULL,
    number integer NOT NULL,
    "raffleId" integer NOT NULL,
    "userId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "reservedAt" timestamp(3) without time zone,
    status public."TicketStatus" DEFAULT 'AVAILABLE'::public."TicketStatus" NOT NULL,
    "purchaseId" integer
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16683)
-- Name: Ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_id_seq" OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 222
-- Name: Ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_id_seq" OWNED BY public."Ticket".id;


--
-- TOC entry 219 (class 1259 OID 16662)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16661)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 218
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 217 (class 1259 OID 16645)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4793 (class 2604 OID 25086)
-- Name: DiscountCode id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DiscountCode" ALTER COLUMN id SET DEFAULT nextval('public."DiscountCode_id_seq"'::regclass);


--
-- TOC entry 4791 (class 2604 OID 16695)
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- TOC entry 4796 (class 2604 OID 26409)
-- Name: Purchase id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase" ALTER COLUMN id SET DEFAULT nextval('public."Purchase_id_seq"'::regclass);


--
-- TOC entry 4785 (class 2604 OID 16676)
-- Name: Raffle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Raffle" ALTER COLUMN id SET DEFAULT nextval('public."Raffle_id_seq"'::regclass);


--
-- TOC entry 4788 (class 2604 OID 16687)
-- Name: Ticket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_id_seq"'::regclass);


--
-- TOC entry 4782 (class 2604 OID 16665)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4979 (class 0 OID 25083)
-- Dependencies: 227
-- Data for Name: DiscountCode; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DiscountCode" (id, code, "isActive", "usedAt", "createdAt", description, "expiresAt", image_url, "raffleId", "validatedBy", patrocinador) FROM stdin;
\.


--
-- TOC entry 4977 (class 0 OID 16692)
-- Dependencies: 225
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, reference, amount, status, "createdAt", provider) FROM stdin;
\.


--
-- TOC entry 4981 (class 0 OID 26406)
-- Dependencies: 229
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Purchase" (id, "raffleId", "buyerName", "buyerPhone", "buyerEmail", "totalAmount", status, "paymentId", "createdAt", "discountCodeId", "validationCode", "validationCodeUsedAt") FROM stdin;
\.


--
-- TOC entry 4973 (class 0 OID 16673)
-- Dependencies: 221
-- Data for Name: Raffle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Raffle" (id, title, created_at, description, is_active, ticket_price, total_numbers, image_url) FROM stdin;
\.


--
-- TOC entry 4975 (class 0 OID 16684)
-- Dependencies: 223
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" (id, number, "raffleId", "userId", "createdAt", "expiresAt", "reservedAt", status, "purchaseId") FROM stdin;
\.


--
-- TOC entry 4971 (class 0 OID 16662)
-- Dependencies: 219
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, phone, password, role, "createdAt") FROM stdin;
3	Admin Principal	admin@test.com	3000000000	$2b$10$J4wwyw6ZYddf4CpnnFWrTOasRhcTEUVhNfTQT74FJlJQao8frQ.lu	ADMIN	2026-05-01 21:14:31.373
6	Juan Jose Giraldo Patiño	patrocinador@test.com	3005265127	$2b$10$q548dVUj/ryqUhrs4HvBn.Fl/qO21qt4ET75AwiZYIXwAXpe0gEmC	SPONSOR	2026-05-11 05:21:28.985
\.


--
-- TOC entry 4969 (class 0 OID 16645)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8ccf4fec-41f8-4ad6-8417-8aaf3ecf0a8a	b7be29e8a0b750544ec32e95147e8846d8dc9778e9a4691ddbc3fcc638bc2f66	2026-04-27 23:32:57.82458-05	20260428043257_init	\N	\N	2026-04-27 23:32:57.802915-05	1
47c1d3ac-712c-4bbf-9972-322b6f24b9b5	4ef85aad300d4c05986543d27c93f467a36773a0913b1ad5e4d5194c0aa46565	2026-04-29 19:11:30.05486-05	20260430001130_fix_raffle_ticket_relation	\N	\N	2026-04-29 19:11:30.02234-05	1
4e1c5caf-ec75-4c21-ae94-c0f3f510e5b0	553808b7e36bb8afea0d5a00216a7abeab487bb4f40127094dc40f0273914bf9	2026-05-02 18:19:21.041147-05	20260502231921_add_raffle_image	\N	\N	2026-05-02 18:19:21.0278-05	1
0b2aa39d-3bb7-4027-ad3c-0443605123db	0c281665fb07a36a02db36065360590464890d2c4d7624ff5fdad0c02d4d7f55	2026-05-06 00:00:01.500721-05	20260506050001_add_discount_code	\N	\N	2026-05-06 00:00:01.437443-05	1
5499cd1e-2b9f-4c72-b5ed-fdea56839694	63f28e69d8cad045b3f6901122abf29cf806135cfacd4e6f6537a8b4d28c04d1	2026-05-08 13:09:59.671708-05	20260508180959_add_ticket_reservation	\N	\N	2026-05-08 13:09:59.613578-05	1
1d07ca97-e143-4396-b1a9-6041380ec212	8af189439479f806226d4be9fa53f15ce2cf5b97caa83329dc251fb67cde38c4	2026-05-08 16:55:21.821436-05	20260508215521_add_discount_codes_and_stickers	\N	\N	2026-05-08 16:55:21.804784-05	1
66bbce8c-96c0-4bb2-8ae6-16e9dbd56f97	287dca6385e18aef89773254cf0f8e48c922f256e5f9b36fc2e52a8b4ebcbab6	2026-05-08 22:54:09.057132-05	20260509035408_fix_unique_discount_per_ra	\N	\N	2026-05-08 22:54:09.002784-05	1
d2ffe138-6f0c-44ec-9260-881f1f75d032	893e11beac6b8e1b59f43651a3a1baa017854b0ac489f8b7a0d64bcf04b30c3e	2026-05-10 17:43:34.46408-05	20260510224334_add_purchase_flow	\N	\N	2026-05-10 17:43:34.379987-05	1
69805e11-02c3-4003-b951-c311173946e1	cf0388fa805e87c9e3f3bbdfec29659212e49481cccfa6a89346ed12332bd492	2026-05-10 22:24:38.190219-05	20260511032438_add_purchase_payment_relation	\N	\N	2026-05-10 22:24:38.157532-05	1
c3177807-c755-44af-826c-0c529b152e14	42a4693034353528f0a4cb42ba8cdd1914d5cff561539413afe04230c47cfbc6	2026-05-10 23:18:00.723147-05	20260511041800_add_patrocinador_to_discountcode	\N	\N	2026-05-10 23:18:00.720304-05	1
bbe1d136-0d7e-4f2c-8c89-e96b3968c0c8	dbe342c828eda554febb0cdc473c5951d0f24aacfa8cc8b66a33132d701ef8c1	2026-05-10 23:35:00.277995-05	20260511043500_add_discount_validation_code	\N	\N	2026-05-10 23:35:00.246174-05	1
51eda7af-9221-45ce-b428-e59d8a30c7dd	a21cda59fdf7946f9384896d16b08dcbaf79a3697a019f276b593e2e3cfed84f	2026-05-12 19:12:07.904746-05	20260513001207_update_buyer_contact	\N	\N	2026-05-12 19:12:07.901872-05	1
\.


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 226
-- Name: DiscountCode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DiscountCode_id_seq"', 27, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 224
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 102, true);


--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 228
-- Name: Purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Purchase_id_seq"', 104, true);


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 220
-- Name: Raffle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Raffle_id_seq"', 32, true);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 222
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 1230, true);


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 218
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 8, true);


--
-- TOC entry 4811 (class 2606 OID 25092)
-- Name: DiscountCode DiscountCode_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DiscountCode"
    ADD CONSTRAINT "DiscountCode_pkey" PRIMARY KEY (id);


--
-- TOC entry 4809 (class 2606 OID 16700)
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- TOC entry 4815 (class 2606 OID 26415)
-- Name: Purchase Purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 16682)
-- Name: Raffle Raffle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Raffle"
    ADD CONSTRAINT "Raffle_pkey" PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 16690)
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 16671)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4799 (class 2606 OID 16653)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 1259 OID 26220)
-- Name: DiscountCode_raffleId_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "DiscountCode_raffleId_code_key" ON public."DiscountCode" USING btree ("raffleId", code);


--
-- TOC entry 4813 (class 1259 OID 26416)
-- Name: Purchase_paymentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Purchase_paymentId_key" ON public."Purchase" USING btree ("paymentId");


--
-- TOC entry 4816 (class 1259 OID 27197)
-- Name: Purchase_validationCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Purchase_validationCode_key" ON public."Purchase" USING btree ("validationCode");


--
-- TOC entry 4807 (class 1259 OID 25546)
-- Name: Ticket_raffleId_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Ticket_raffleId_number_key" ON public."Ticket" USING btree ("raffleId", number);


--
-- TOC entry 4800 (class 1259 OID 16701)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4820 (class 2606 OID 26039)
-- Name: DiscountCode DiscountCode_raffleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DiscountCode"
    ADD CONSTRAINT "DiscountCode_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES public."Raffle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4821 (class 2606 OID 26680)
-- Name: Purchase Purchase_discountCodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_discountCodeId_fkey" FOREIGN KEY ("discountCodeId") REFERENCES public."DiscountCode"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4822 (class 2606 OID 26427)
-- Name: Purchase Purchase_paymentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public."Payment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4823 (class 2606 OID 26422)
-- Name: Purchase Purchase_raffleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES public."Raffle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4817 (class 2606 OID 26417)
-- Name: Ticket Ticket_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Purchase"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4818 (class 2606 OID 16702)
-- Name: Ticket Ticket_raffleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES public."Raffle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4819 (class 2606 OID 16707)
-- Name: Ticket Ticket_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2026-05-13 11:55:56

--
-- PostgreSQL database dump complete
--

