CREATE TABLE Productos (
    producto_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria_id INTEGER REFERENCES Categorias(categoria_id),
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    proveedor_id INTEGER REFERENCES Proveedores(proveedor_id),
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Categorias (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Proveedores (
    proveedor_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE
);

CREATE TABLE Clientes (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE
);

CREATE TABLE Ventas (
    venta_id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    cliente_id INTEGER REFERENCES Clientes(cliente_id),
    cod_producto INTEGER REFERENCES Productos(producto_id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    nombre_cliente VARCHAR(100)
);





