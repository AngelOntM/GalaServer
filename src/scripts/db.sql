DROP DATABASE IF EXISTS gala;

CREATE DATABASE IF NOT EXISTS gala;

USE gala;

SET @@auto_increment_increment=1;

CREATE TABLE
    IF NOT EXISTS region(
        REG_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        REG_NOMBRE VARCHAR(50) NOT NULL unique,
        REG_CLAVE INTEGER(5)
    );

INSERT INTO
    region (REG_NOMBRE, REG_CLAVE)
VALUES ('Torreón', 100), ('Pacifico', 101), ('Centro', 102), ('Centro Sur', 103), ('Norte Este', 104), ('Norte Oeste', 105);

CREATE TABLE
    IF NOT EXISTS motivo(
        MOT_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        MOT_CLAVE VARCHAR(255) NOT NULL,
        MOT_NOMBRE VARCHAR(50) NOT NULL,
        MOT_DESC TEXT
    );

INSERT INTO
    motivo (
        MOT_CLAVE,
        MOT_NOMBRE,
        MOT_DESC
    )
VALUES (
        001,
        'No puede pagar',
        'El Cliente manifiesta que no puede pagar'
    ), (
        002,
        'Cambio de Residencia',
        'El Cliente manifiesta que va a cambiar de residencia'
    ), (
        003,
        'Motivos Personales',
        'El Cliente manifiesta que por motivos personales desea cancelar'
    ), (
        004,
        'Tardanza en entrega',
        'El cliente decide cancelar por que se tardo mucho en entregar la mercancía'
    );

CREATE TABLE
    IF NOT EXISTS estatus(
        EST_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        EST_CLAVE VARCHAR(3) UNIQUE NOT NULL,
        EST_NOMBRE VARCHAR(40) NOT NULL,
        EST_DESC TEXT
    );

INSERT INTO
    estatus (
        EST_CLAVE,
        EST_NOMBRE,
        EST_DESC
    )
VALUES (
        'PEN',
        'Pendiente',
        'Este estatus lo asigna la plataforma cuando una Solicitud se captura y queda pendiente de ser terminada para iniciar el proceso de Cancelación.'
    ), (
        'SOL',
        'Solicitud',
        'Estatus para Indicar que la Solicitud se ha creado en la Tienda'
    ), (
        'CAN',
        'Cancelada',
        'Estatus que permite cancelar una Solicitud'
    ), (
        'TER',
        'Terminada',
        'Estatus para Indicar que la Solicitud a terminado su proceso'
    ), (
        'AGE',
        'Gerencia',
        'Estatus para Indicar que la Solicitud a sido Autorizada por Gerencia de Tiendas o Gerencia Comercial'
    ), (
        'REV',
        'Revisada',
        'Estatus que Indica que la Solicitud ha Sido Revisada por área de pagos'
    ), (
        'APA',
        'Autoriza Pago',
        'Estatus que indica que la Solicitud a sido Autorizada para Pago'
    );

CREATE TABLE
    IF NOT EXISTS rol(
        ROL_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        ROL_CLAVE VARCHAR(3) UNIQUE NOT NULL,
        ROL_NOMBRE VARCHAR(40) NOT NULL,
        ROL_DESC TEXT
    );

INSERT INTO
    rol (
        ROL_CLAVE,
        ROL_NOMBRE,
        ROL_DESC
    )
VALUES (
        'VEN',
        'Vendedor',
        'Vendedora(a) de Tiendas que realiza una Solicitud de Cancelación'
    ), (
        'GRT',
        'Gerente Regional de Tiendas',
        'Gerente Regional de Tiendas que Autoriza una Cancelación'
    ), (
        'PAN',
        'Pagos Nacionales',
        'Encargado de realizar los Pagos por Cancelación a nivel Nacional'
    ), (
        'DAN',
        'Director Administrativo Nacional',
        'Director Administrativo nacional para autorización de Pago de Cancelaciones'
    ), (
        'CLI',
        'Cliente',
        'Este Rol se asigna a los Usuarios Tipo Cliente que se crean cuando un cliente solicita una Cancelación y para que puede entrar al portal de seguimiento a la cancelación.'
    );

CREATE TABLE
    IF NOT EXISTS sucursal(
        SUC_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        SUC_CLAVE INTEGER(5) NOT NULL,
        SUC_NOMBRE VARCHAR(40) NOT NULL,
        REG_NUMCTRL INTEGER(9),
        CONSTRAINT sucursal1 FOREIGN KEY (REG_NUMCTRL) REFERENCES region(REG_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO
    sucursal (
        SUC_CLAVE,
        SUC_NOMBRE,
        REG_NUMCTRL
    )
VALUES (680, 'Hidalgo', 1), (685, 'Misiones', 2), (690, 'Soriana Revolución', 3), (691, 'San Isidro', 4), (692, 'Gran Class', 5), (693, 'Gómez Palacio', 6);

CREATE TABLE
    IF NOT EXISTS usuario(
        USU_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        USU_CLAVE VARCHAR(12) NOT NULL,
        USU_NOMBRE VARCHAR(40) NOT NULL,
        USU_CONTRA VARCHAR(100) NOT NULL,
        USU_TELEFONO BIGINT(10),
        ROL_NUMCTRL INTEGER(9),
        REG_NUMCTRL INTEGER(9),
        CONSTRAINT usuario1 FOREIGN KEY (ROL_NUMCTRL) REFERENCES rol(ROL_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT usuario2 FOREIGN KEY (REG_NUMCTRL) REFERENCES region(REG_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO
    usuario (
        USU_CLAVE,
        USU_NOMBRE,
        USU_CONTRA,
        USU_TELEFONO,
        ROL_NUMCTRL,
        REG_NUMCTRL
    )
VALUES (
        "ven1",
        "vendedor",
        "vendedor",
        1234567890,
        1,
        1
    ), (
        "ger1",
        "gerente",
        "gerente",
        1234567891,
        2,
        2
    ), (
        "pag1",
        "pagos",
        "pagos",
        1234567892,
        3,
        3
    ), (
        "dir1",
        "director",
        "director",
        1234567893,
        4,
        4
    ), (
        "cli1",
        "cliente",
        "cliente",
        1234567894,
        5,
        5
    );

CREATE TABLE
    IF NOT EXISTS rolxest(
        RXE_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        ROL_NUMCTRL INTEGER(9),
        EST_NUMCTRL INTEGER(9),
        CONSTRAINT rolxest1 FOREIGN KEY (ROL_NUMCTRL) REFERENCES rol(ROL_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT rolxest2 FOREIGN KEY (EST_NUMCTRL) REFERENCES estatus(EST_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS movimiento(
        MOV_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        MOV_FECHA DATE,
        MOV_CLIENTE VARCHAR(10) NOT NULL,
        MOV_NOMBRE VARCHAR(60) NOT NULL,
        MOV_MONTO FLOAT(11, 2) NOT NULL,
        MOV_TIPVTA INTEGER(1),
        MOV_NOTAVTA VARCHAR(10) NOT NULL,
        MOV_RECIBOS VARCHAR(80) NOT NULL,
        MOV_COMENTA TEXT,
        MOT_NUMCTRL INTEGER(9),
        SUC_NUMCTRL INTEGER(9),
        USU_NUMCTRL INTEGER(9),
        CONSTRAINT movimiento1 FOREIGN KEY (MOT_NUMCTRL) REFERENCES motivo(MOT_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT movimiento2 FOREIGN KEY (SUC_NUMCTRL) REFERENCES sucursal(SUC_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT movimiento3 FOREIGN KEY (USU_NUMCTRL) REFERENCES usuario(USU_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS estxmov(
        EXM_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        EXM_COMENTA TEXT,
        EST_NUMCTRL INTEGER(9),
        MOV_NUMCTRL INTEGER(9),
        CONSTRAINT estxmov1 FOREIGN KEY (EST_NUMCTRL) REFERENCES estatus(EST_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT estxmov2 FOREIGN KEY (MOV_NUMCTRL) REFERENCES movimiento(MOV_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS comenta(
        COM_NUMCTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        COM_COMENTA TEXT,
        COM_FECHA DATE,
        MOV_NUMCTRL INTEGER(9),
        USU_NUMCTRL INTEGER(9),
        EST_NUMCTRL INTEGER(9),
        CONSTRAINT comenta1 FOREIGN KEY (MOV_NUMCTRL) REFERENCES movimiento(MOV_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT comenta2 FOREIGN KEY (USU_NUMCTRL) REFERENCES usuario(USU_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT comenta3 FOREIGN KEY (EST_NUMCTRL) REFERENCES estatus(EST_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS opcionxrol(
        OXR_NUMTRL INTEGER(9) PRIMARY KEY AUTO_INCREMENT,
        OXR_MENU json,
        ROL_NUMCTRL INTEGER(9),
        CONSTRAINT opcionxrol1 FOREIGN KEY (ROL_NUMCTRL) REFERENCES rol(ROL_NUMCTRL) ON DELETE CASCADE ON UPDATE CASCADE
    );