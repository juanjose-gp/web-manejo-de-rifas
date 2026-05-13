--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-05-12 18:28:45

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
    "buyerPhone" text NOT NULL,
    "buyerEmail" text,
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
    "paymentId" integer,
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
24	15%	t	\N	2026-05-11 21:53:02.905	test sticker 1 	2026-05-13 00:00:00	http://localhost:3000/uploads/stickers/1778536382891-551718875.jpeg	30	\N	patrocinador oficial  
25	10%	t	\N	2026-05-11 21:53:02.908	test sticker 2	2026-05-13 00:00:00	http://localhost:3000/uploads/stickers/1778536382895-687680751.png	30	\N	patrocinador oficial  
26	15%	t	\N	2026-05-11 21:54:27.64	prueba rifa 1000 + sticker 	2026-05-12 00:00:00	http://localhost:3000/uploads/stickers/1778536467631-194629172.jpeg	31	\N	patrocinador oficial 
\.


--
-- TOC entry 4977 (class 0 OID 16692)
-- Dependencies: 225
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, reference, amount, status, "createdAt", provider) FROM stdin;
49	test_2B5yl4	45000	APPROVED	2026-05-11 23:24:37.332	WOMPI
50	test_kuvmDF	45000	PENDING	2026-05-12 03:29:30.611	WOMPI
51	test_N9tL8g	60000	APPROVED	2026-05-12 04:37:53.595	WOMPI
52	test_Zun2qU	20000	PENDING	2026-05-12 04:38:54.081	WOMPI
53	test_5yASq7	45000	PENDING	2026-05-12 04:47:34.771	WOMPI
54	test_3M717h	20000	APPROVED	2026-05-12 04:48:48.824	WOMPI
55	test_oQlpDX	20000	APPROVED	2026-05-12 04:53:31.287	WOMPI
56	test_YdwnSa	20000	APPROVED	2026-05-12 04:56:36.197	WOMPI
57	test_TQZB4v	20000	PENDING	2026-05-12 05:00:56.355	WOMPI
58	test_B3Cc56	20000	APPROVED	2026-05-12 05:13:20.609	WOMPI
59	test_YUBDEY	20000	APPROVED	2026-05-12 05:33:58.405	WOMPI
60	test_L006mK	20000	APPROVED	2026-05-12 05:37:23.193	WOMPI
61	test_6nP2T6	20000	APPROVED	2026-05-12 05:44:00.305	WOMPI
62	test_MPiyzG	20000	APPROVED	2026-05-12 05:48:31.805	WOMPI
63	test_nQrCm3	20000	PENDING	2026-05-12 05:49:24.402	WOMPI
64	test_x0LfcX	20000	PENDING	2026-05-12 05:59:09.459	WOMPI
65	test_Ot9Jsy	20000	PENDING	2026-05-12 06:07:56.95	WOMPI
66	test_LicHoh	20000	APPROVED	2026-05-12 06:15:33.997	WOMPI
67	test_JFwyJ2	20000	APPROVED	2026-05-12 06:16:13.862	WOMPI
68	test_RhRktV	20000	PENDING	2026-05-12 06:16:58.821	WOMPI
44	test_wtcB6L	40000	APPROVED	2026-05-11 21:54:57.988	WOMPI
45	test_FaCpkj	40000	APPROVED	2026-05-11 21:55:36.466	WOMPI
46	test_oDYuMe	10000	APPROVED	2026-05-11 21:56:56.877	WOMPI
47	test_e9RUSI	15000	PENDING	2026-05-11 23:04:19.519	WOMPI
48	test_IfJEOx	45000	APPROVED	2026-05-11 23:05:53.304	WOMPI
\.


--
-- TOC entry 4981 (class 0 OID 26406)
-- Dependencies: 229
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Purchase" (id, "raffleId", "buyerName", "buyerPhone", "buyerEmail", "totalAmount", status, "paymentId", "createdAt", "discountCodeId", "validationCode", "validationCodeUsedAt") FROM stdin;
41	30	Juan Jose Giraldo Patiño 	3005265127 	\N	40000	PAID	44	2026-05-11 21:54:57.401	25	8204	\N
42	30	laura rojas	1234567890	\N	40000	PAID	45	2026-05-11 21:55:36.081	25	8875	\N
43	30	santiago giraldo 	0987654321	\N	10000	PAID	46	2026-05-11 21:56:56.458	24	3930	\N
44	31	albeiro giraldo	3105176312	\N	15000	PENDING	47	2026-05-11 23:04:18.937	\N	\N	\N
45	31	felipe giraldo	3005265127	\N	45000	PAID	48	2026-05-11 23:05:52.796	\N	\N	\N
46	31	luis miguel	3005265127	\N	45000	PAID	49	2026-05-11 23:24:36.086	26	1140	\N
47	31	dora patiño	3104082698	\N	45000	PENDING	50	2026-05-12 03:29:30.083	\N	\N	\N
48	31	miquel lopez	3005265127	\N	60000	PAID	51	2026-05-12 04:37:52.918	\N	\N	\N
49	30	Juan Jose Giraldo Patiño	3005265127	\N	20000	PENDING	52	2026-05-12 04:38:53.571	25	\N	\N
50	31	esteban patiño	3005265127	\N	45000	PENDING	53	2026-05-12 04:47:34.251	\N	\N	\N
51	30	Juan Jose Giraldo Patiño	3005265127	\N	20000	PAID	54	2026-05-12 04:48:48.385	25	4471	\N
52	30	laura rojas	3105176312	\N	20000	PAID	55	2026-05-12 04:53:30.816	24	5037	\N
53	30	lamin yamal 	3005265127	\N	20000	PAID	56	2026-05-12 04:56:35.742	24	6307	\N
54	30	Juan Jose Giraldo Patiño	3105176312	\N	20000	PENDING	57	2026-05-12 05:00:55.775	24	\N	\N
55	30	Juanjo	3105176312	\N	20000	PAID	58	2026-05-12 05:13:20.07	24	5886	\N
56	30	Juan Jose Giraldo Patiño	3005265127	\N	20000	PAID	59	2026-05-12 05:33:57.818	24	2390	\N
57	30	Juan Jose Giraldo Patiño 	3005265127	\N	20000	PAID	60	2026-05-12 05:37:22.733	25	6965	\N
58	30	laura rojas	3105176312	\N	20000	PAID	61	2026-05-12 05:43:59.74	24	4823	\N
59	30	laura rojas	1234567890	\N	20000	PAID	62	2026-05-12 05:48:31.172	24	9630	\N
60	30	santiago giraldo 	3005265127 	\N	20000	PENDING	63	2026-05-12 05:49:23.996	25	\N	\N
61	30	laura rojas	1234567890	\N	20000	PENDING	64	2026-05-12 05:59:08.902	25	\N	\N
62	30	Juan Jose Giraldo Patiño 	3105176312	\N	20000	PENDING	65	2026-05-12 06:07:56.388	25	\N	\N
63	30	Juan Jose Giraldo Patiño	3005265127	\N	20000	PAID	66	2026-05-12 06:15:33.424	24	3685	\N
64	30	Juan Jose Giraldo Patiño	3005265127 	\N	20000	PAID	67	2026-05-12 06:16:13.486	25	7014	\N
65	30	laura rojas	3105176312	\N	20000	PENDING	68	2026-05-12 06:16:58.354	\N	\N	\N
\.


--
-- TOC entry 4973 (class 0 OID 16673)
-- Dependencies: 221
-- Data for Name: Raffle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Raffle" (id, title, created_at, description, is_active, ticket_price, total_numbers, image_url) FROM stdin;
30	ulrimo test 100 + sticker	2026-05-11 21:53:02.903	este es la pruba final ya con su asarela adaptada 	t	10000	100	http://localhost:3000/uploads/raffles/1778536382889-491538306.jpeg
31	ultimo test rifa 1000	2026-05-11 21:54:27.636	test rifa 1000 + sticker ya con pasarela de pagos 	t	15000	1000	http://localhost:3000/uploads/raffles/1778536467623-331241061.jpeg
\.


--
-- TOC entry 4975 (class 0 OID 16684)
-- Dependencies: 223
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" (id, number, "raffleId", "userId", "paymentId", "createdAt", "expiresAt", "reservedAt", status, "purchaseId") FROM stdin;
147	16	30	\N	\N	2026-05-12 04:56:27.882	\N	\N	SOLD	53
148	20	30	\N	\N	2026-05-12 04:56:27.895	\N	\N	SOLD	53
143	14	30	\N	\N	2026-05-12 04:53:19.577	\N	\N	AVAILABLE	\N
144	15	30	\N	\N	2026-05-12 04:53:19.58	\N	\N	AVAILABLE	\N
149	62	30	\N	\N	2026-05-12 05:00:51.14	\N	\N	AVAILABLE	\N
150	58	30	\N	\N	2026-05-12 05:00:51.157	\N	\N	AVAILABLE	\N
111	1	30	\N	\N	2026-05-11 21:54:53.054	\N	\N	SOLD	41
112	2	30	\N	\N	2026-05-11 21:54:53.068	\N	\N	SOLD	41
113	3	30	\N	\N	2026-05-11 21:54:53.07	\N	\N	SOLD	41
114	4	30	\N	\N	2026-05-11 21:54:53.072	\N	\N	SOLD	41
115	100	30	\N	\N	2026-05-11 21:55:29.717	\N	\N	SOLD	42
116	99	30	\N	\N	2026-05-11 21:55:29.718	\N	\N	SOLD	42
117	98	30	\N	\N	2026-05-11 21:55:29.72	\N	\N	SOLD	42
118	97	30	\N	\N	2026-05-11 21:55:29.721	\N	\N	SOLD	42
151	54	30	\N	\N	2026-05-12 05:13:12.696	\N	\N	SOLD	55
119	28	30	\N	\N	2026-05-11 21:56:47.061	\N	\N	SOLD	43
120	10	30	\N	\N	2026-05-11 21:57:48.605	\N	\N	AVAILABLE	\N
121	498	31	\N	\N	2026-05-11 23:04:18.941	\N	2026-05-11 23:04:18.928	RESERVED	44
122	101	31	\N	\N	2026-05-11 23:05:52.798	\N	\N	SOLD	45
123	821	31	\N	\N	2026-05-11 23:05:52.799	\N	\N	SOLD	45
124	933	31	\N	\N	2026-05-11 23:05:52.8	\N	\N	SOLD	45
125	46	30	\N	\N	2026-05-11 23:10:26.226	\N	\N	AVAILABLE	\N
126	408	31	\N	\N	2026-05-11 23:24:36.09	\N	\N	SOLD	46
127	849	31	\N	\N	2026-05-11 23:24:36.093	\N	\N	SOLD	46
128	912	31	\N	\N	2026-05-11 23:24:36.095	\N	\N	SOLD	46
129	661	31	\N	\N	2026-05-12 03:29:30.086	\N	2026-05-12 03:29:30.076	RESERVED	47
130	240	31	\N	\N	2026-05-12 03:29:30.09	\N	2026-05-12 03:29:30.076	RESERVED	47
131	693	31	\N	\N	2026-05-12 03:29:30.092	\N	2026-05-12 03:29:30.076	RESERVED	47
132	994	31	\N	\N	2026-05-12 04:37:52.921	\N	\N	SOLD	48
133	456	31	\N	\N	2026-05-12 04:37:52.924	\N	\N	SOLD	48
134	794	31	\N	\N	2026-05-12 04:37:52.926	\N	\N	SOLD	48
135	797	31	\N	\N	2026-05-12 04:37:52.927	\N	\N	SOLD	48
152	55	30	\N	\N	2026-05-12 05:13:12.699	\N	\N	SOLD	55
136	11	30	\N	\N	2026-05-12 04:38:48.447	\N	\N	AVAILABLE	\N
138	931	31	\N	\N	2026-05-12 04:47:34.255	\N	2026-05-12 04:47:34.243	RESERVED	50
139	258	31	\N	\N	2026-05-12 04:47:34.259	\N	2026-05-12 04:47:34.243	RESERVED	50
140	672	31	\N	\N	2026-05-12 04:47:34.261	\N	2026-05-12 04:47:34.243	RESERVED	50
169	69	30	\N	\N	2026-05-12 06:12:52.802	\N	\N	AVAILABLE	\N
170	79	30	\N	\N	2026-05-12 06:12:52.804	\N	\N	AVAILABLE	\N
141	8	30	\N	\N	2026-05-12 04:48:42.305	\N	\N	SOLD	51
142	12	30	\N	\N	2026-05-12 04:48:42.308	\N	\N	SOLD	51
153	30	30	\N	\N	2026-05-12 05:33:54.097	\N	\N	SOLD	56
154	31	30	\N	\N	2026-05-12 05:33:54.099	\N	\N	SOLD	56
137	18	30	\N	\N	2026-05-12 04:38:48.45	\N	\N	SOLD	52
146	22	30	\N	\N	2026-05-12 04:53:25.159	\N	\N	SOLD	52
157	86	30	\N	\N	2026-05-12 05:36:55.239	\N	\N	SOLD	57
158	87	30	\N	\N	2026-05-12 05:36:55.241	\N	\N	SOLD	57
155	38	30	\N	\N	2026-05-12 05:36:15.539	\N	\N	AVAILABLE	\N
156	39	30	\N	\N	2026-05-12 05:36:15.541	\N	\N	AVAILABLE	\N
159	60	30	\N	\N	2026-05-12 05:43:55.687	\N	\N	SOLD	58
160	50	30	\N	\N	2026-05-12 05:43:55.702	\N	\N	SOLD	58
165	67	30	\N	\N	2026-05-12 05:59:05.321	\N	\N	SOLD	63
167	68	30	\N	\N	2026-05-12 06:07:52.482	\N	\N	SOLD	63
161	57	30	\N	\N	2026-05-12 05:48:27.397	\N	\N	SOLD	59
162	47	30	\N	\N	2026-05-12 05:48:27.4	\N	\N	SOLD	59
164	75	30	\N	\N	2026-05-12 05:49:18.392	\N	\N	AVAILABLE	\N
175	64	30	\N	\N	2026-05-12 06:16:09.383	\N	\N	SOLD	64
163	74	30	\N	\N	2026-05-12 05:49:18.391	\N	\N	SOLD	64
173	66	30	\N	\N	2026-05-12 06:16:02.351	\N	\N	AVAILABLE	\N
174	76	30	\N	\N	2026-05-12 06:16:02.353	\N	\N	AVAILABLE	\N
166	77	30	\N	\N	2026-05-12 05:59:05.324	\N	\N	AVAILABLE	\N
168	78	30	\N	\N	2026-05-12 06:07:52.484	\N	\N	AVAILABLE	\N
\.


--
-- TOC entry 4971 (class 0 OID 16662)
-- Dependencies: 219
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, phone, password, role, "createdAt") FROM stdin;
2	Juan	dev@test.com	3005265127	$2b$10$x/NAQp3CJ7MHZEObCoRogu1.9KE1/p1/WvzcFQUBXfZKxjb5g2dJW	ADMIN	2026-04-30 01:03:32.153
3	Admin Principal	admin@test.com	3000000000	$2b$10$J4wwyw6ZYddf4CpnnFWrTOasRhcTEUVhNfTQT74FJlJQao8frQ.lu	ADMIN	2026-05-01 21:14:31.373
4	Admin Secundario	admin2@test.com	3001112233	$2b$10$at9gju3ukZJ4lVbT32ib2uCvwo63g9a9VdpJTt2TAg8oIUkUMpRJO	ADMIN	2026-05-01 21:20:01.329
5	Juan Jose Giraldo Patiño	juanjogiraldop254@gmail.com	3005265127	$2b$10$3.iaJiCZdxkV/nC8WNXgJe8N30AhWmX4jxC/LzabmHQ81IXfe8etS	SPONSOR	2026-05-06 04:23:52.541
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
\.


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 226
-- Name: DiscountCode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DiscountCode_id_seq"', 26, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 224
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 68, true);


--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 228
-- Name: Purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Purchase_id_seq"', 65, true);


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 220
-- Name: Raffle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Raffle_id_seq"', 31, true);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 222
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 178, true);


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 218
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 6, true);


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


-- Completed on 2026-05-12 18:28:45

--
-- PostgreSQL database dump complete
--

