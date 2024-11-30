const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const pool = require("./controller/db");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});


/*-------------Productos-------------*/

app.get("/productos", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM Productos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/productos", async (req, res) => {
  const { nombre, descripcion, categoria_id, precio, stock, proveedor_id } = req.body;  
  try{
    const query = "INSERT INTO Productos (nombre, descripcion, categoria_id, precio, stock, proveedor_id) VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(query, [nombre, descripcion, categoria_id, precio, stock, proveedor_id]);
    res.status(200).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, categoria_id, precio, stock, proveedor_id } = req.body;
  try{
    const query = "UPDATE Productos SET nombre = $1, descripcion = $2, categoria_id = $3, precio = $4, stock = $5, proveedor_id = $6 WHERE producto_id = $7";
    await pool.query(query, [nombre, descripcion, categoria_id, precio, stock, proveedor_id, id]);
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const query = "DELETE FROM Productos WHERE producto_id = $1";
    await pool.query(query, [id]);
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: error.message });
  }
}); 



/*-------------Clientes-------------*/

app.get("/clientes", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM Clientes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/clientes", async (req, res) => {
  const { nombre, contacto, direccion, telefono, correo } = req.body;
  try{
    const query = "INSERT INTO Clientes (nombre, contacto, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(query, [nombre, contacto, direccion, telefono, correo]);
    res.status(200).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: error.message });
  }
}); 

app.patch("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, direccion, telefono, correo } = req.body;
  try{
    const query = "UPDATE Clientes SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, correo = $5 WHERE cliente_id = $6";
    await pool.query(query, [nombre, contacto, direccion, telefono, correo, id]);
    res.status(200).json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: error.message });
  }
}); 

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const query = "DELETE FROM Clientes WHERE cliente_id = $1";
    await pool.query(query, [id]);
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: error.message });
  }
}); 

/*-------------proveedores-------------*/


app.get("/proveedores", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM Proveedores");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({ error: error.message });
  }
});     

app.post("/proveedores", async (req, res) => {
  const { nombre, contacto, direccion, telefono, correo } = req.body;
  try{
    const query = "INSERT INTO Proveedores (nombre, contacto, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(query, [nombre, contacto, direccion, telefono, correo]);
    res.status(200).json({ message: "Proveedor creado exitosamente" });
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/proveedores/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, direccion, telefono, correo } = req.body;
  try{
    const query = "UPDATE Proveedores SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, correo = $5 WHERE proveedor_id = $6";
    await pool.query(query, [nombre, contacto, direccion, telefono, correo, id]);
    res.status(200).json({ message: "Proveedor actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.status(500).json({ error: error.message });
  }
}); 

app.delete("/proveedores/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const query = "DELETE FROM Proveedores WHERE proveedor_id = $1";
    await pool.query(query, [id]);
    res.status(200).json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).json({ error: error.message });
  }
}); 


app.get("/ventas", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM Ventas");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: error.message });
  }
});








app.get("/categorias", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM Categorias");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: error.message });
  }
});     






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });