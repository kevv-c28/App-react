require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

// POST
app.post('/api/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND password = $2',
      [correo, password]
    );
    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }



    res.json({
      mensaje: 'Accedido correctamente bro',
      usuario: {
        id: resultado.rows[0].id,
        nombre: resultado.rows[0].nombre
      }
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error al validar las credenciales' });
  }
}); 

//GET
app.get('/api/productos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error en productos:', error);
    res.status(500).json({ error: 'No se pudo consultar en la data base' });
  }
});

app.get('/api/proveedores', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM proveedores ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error en proveedores:', error);
    res.status(500).json({ error: 'No se pudo obtener en la data base' });
  }
});



app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const resultado = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`, // Esto hace que Postgres nos devuelva el producto con su id nuevo
      [nombre, descripcion, precio, stock, categoria]
    );
    res.json(resultado.rows[0]);
    
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    res.status(500).json({ error: 'No se pudo guardar en la data base, hubo algún pedo.' });
  }
});

//PUT
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    const resultado = await pool.query(
      `UPDATE productos 
       SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5 
       WHERE id = $6 
       RETURNING *`, // Esto devuelve lo actualizado de las filas noentenderrr
      [nombre, descripcion, precio, stock, categoria, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'El producto no se encontró, se perdió (fue fredy).' });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'No se pudo actualizar en la data bases, hubo algún pedo.' });
  }
});


//delete
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *', 
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Ese producto ya no existe en la 4ta dimension.' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });

  } catch (error) {
    console.error('No se pudo eliminar el producto:', error);
    res.status(500).json({ error: 'Hubo un pedote al intentar borrar de la data base' });
  }
});

//post
app.post('/api/proveedores', async (req, res) => {
  try {
    const { empresa, contacto, telefono, email, activo } = req.body;
    const resultado = await pool.query(
      `INSERT INTO proveedores (empresa, contacto, telefono, email, activo) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`, 
      [empresa, contacto, telefono, email, activo]
    );
    
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error al guardar el proveedor en la data bases' });
  }
});

//put
app.put('/api/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa, contacto, telefono, email, activo } = req.body;

    const resultado = await pool.query(
      `UPDATE proveedores 
       SET empresa = $1, contacto = $2, telefono = $3, email = $4, activo = $5 
       WHERE id = $6 
       RETURNING *`,
      [empresa, contacto, telefono, email, activo, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error al actualizar en la data bases' });
  }
});

//delete
app.delete('/api/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      'DELETE FROM proveedores WHERE id = $1 RETURNING *', 
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Ese proveedor ya no existe en la 4ta dimebsnion.' });
    }

    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ error: 'Error al intentar borrar de la data bases' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de base de datos encendido en http://localhost:${PORT}`);
});