PGDMP      5                {            store    16.1    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32768    store    DATABASE     {   CREATE DATABASE store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE store;
                postgres    false            �            1259    32813    products    TABLE     -  CREATE TABLE public.products (
    id integer NOT NULL,
    "codigoProducto" character varying(255) NOT NULL,
    "nombreProducto" character varying(255) NOT NULL,
    "descripcionProducto" character varying(255),
    "tipoProducto" character varying(255) NOT NULL,
    "marcaProducto" character varying(255) NOT NULL,
    "tallaProducto" character varying(255) NOT NULL,
    "precioProducto" integer NOT NULL,
    proveedor character varying(255) NOT NULL,
    "fechaIngreso" timestamp with time zone NOT NULL,
    "fotoProducto" character varying(255)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    32812    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    216            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    215            �            1259    32883    shopping    TABLE        CREATE TABLE public.shopping (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "userId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.shopping;
       public         heap    postgres    false            �            1259    32882    shopping_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shopping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.shopping_id_seq;
       public          postgres    false    220            �           0    0    shopping_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.shopping_id_seq OWNED BY public.shopping.id;
          public          postgres    false    219            �            1259    32832    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    "nombreCompleto" character varying NOT NULL,
    "nombreUser" character varying NOT NULL,
    "passwdUser" character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32831    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            $           2604    32816    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            &           2604    32886    shopping id    DEFAULT     j   ALTER TABLE ONLY public.shopping ALTER COLUMN id SET DEFAULT nextval('public.shopping_id_seq'::regclass);
 :   ALTER TABLE public.shopping ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            %           2604    32835    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    32813    products 
   TABLE DATA           �   COPY public.products (id, "codigoProducto", "nombreProducto", "descripcionProducto", "tipoProducto", "marcaProducto", "tallaProducto", "precioProducto", proveedor, "fechaIngreso", "fotoProducto") FROM stdin;
    public          postgres    false    216          �          0    32883    shopping 
   TABLE DATA           a   COPY public.shopping (id, "productId", "userId", quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220          �          0    32832    users 
   TABLE DATA           Q   COPY public.users (id, "nombreCompleto", "nombreUser", "passwdUser") FROM stdin;
    public          postgres    false    218   �       �           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 5, true);
          public          postgres    false    215            �           0    0    shopping_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.shopping_id_seq', 35, true);
          public          postgres    false    219            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    217            (           2606    32820    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    216            ,           2606    32888    shopping shopping_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shopping
    ADD CONSTRAINT shopping_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shopping DROP CONSTRAINT shopping_pkey;
       public            postgres    false    220            *           2606    32839    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            �   �  x�m�ϊ�0���S蔛lI��J�J���S!L�Y[�,e%9�<N����/V�ɒ��`4�f���	R7E)��,d!��A���H��nD��d���kc � h�f�J���Q���o���� ���	�&y�c�ߕ\�L&[����1^�1���˲�7LM0�O�=b�F�Y��vv�D��<"�y�e.D�w�2�;��>�D�����GQ���~R�Q��I��=��G�~ �zu<�i�>�H��#t�8:�'���D��	�_�r��%MYF�'t����x�,��z��( 1=|������g��Y.�<2*����YR�.��_��vڌ��1l���va܌II�k��Ѻ@>�}�f���*�q��Y,�9.;�)t&�=X:���7<n�W�Y܋�&��l�C��OAPѾ��+��rQӰ@I��_.��[ް��YSUY\��l�e�	W�#;��ċ��;�<�>Q�mYI!�_�3M��/�N��      �   �  x���ّ$!D�+ցV��e��cAT-3MNELt�=e����Wz��)��Eߜ��t�n���7���X#I�P�sm��=52$�$D�~?Y��.B��S��Mu��!��:��GUROL��T�(Mu�7��#S���+�W��]5=��������#D:�v�|#��0H�cb!ft���p|��D��G�7j.���A��Wn�<���gL�1��󀂬��8�
B����\����W��FL��H��B��?��(�1m����k]�8�_��m'<�M��M��]7>�T
�܍�r�X^g~)���h-H�w�=E2>6�F��д:6B����_Q�/o��Fm��*Zt#Fz�TT�F����l.���t7Z��X>s��������n�b6�J��ϻ�������Z:2�h=l��c��|U7r�z��x�5��þђ'`��1O�B���sO      �   I   x�3�I,�L�KTp,�L,VpN,.I<�1��(\��A��F�\F�ΉE9�pU�)��`%�`aNR���� ���     