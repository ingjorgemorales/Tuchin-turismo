const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3001;
const mysql = require('mysql2');
const db = require('./db');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const cors = require('cors');
const { log } = require('console');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dayjs.extend(utc);
dayjs.extend(timezone);
let usuario_logeado = null;

app.use(cors({
  origin: 'http://localhost:3000'
}));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });



app.use(express.json());

app.post('/img_principal', upload.single('imagen'), (req, res) => {
    const imagenNombre = req.file ? req.file.filename : null;
    const orden = "P";

    if (!imagenNombre) {
        return res.status(400).json({
            mensaje: 'No se recibió ninguna imagen',
            estado: 'error'
        });
    }

    db.query('CALL Buscar_img_por_orden_Principal()', (err, resultados) => {
        if (err) {
            console.error('❌ Error al buscar imagen principal:', err);
            return res.status(500).json({
                mensaje: 'Error al buscar imagen principal ❌',
                estado: 'error'
            });
        }

        const resultado = resultados[0];

        // 🔎 Si hay al menos una imagen con orden 'P', la actualizamos
        if (resultado && resultado.length > 0) {
            const idActual = resultado[0].id;

            db.query('CALL Actualizar_orden_imagen(?)', [idActual], (err) => {
                if (err) {
                    console.error('❌ Error al actualizar orden de imagen:', err);
                    return res.status(500).json({
                        mensaje: 'Error al actualizar orden de imagen ❌',
                        estado: 'error'
                    });
                }

                insertarImagenPrincipal();
            });
        } else {
            // 🆕 No hay imagen principal aún, insertamos directamente
            insertarImagenPrincipal();
        }

        function insertarImagenPrincipal() {
            const sql = 'CALL Ingresar_img_principal(?, ?)';
            const valores = [imagenNombre, orden];
            db.query(sql, valores, (err) => {
                if (err) {
                    console.error('❌ Error al insertar imagen:', err);
                    return res.status(500).json({
                        mensaje: 'Hubo un error registrando la imagen ❌',
                        estado: 'error',
                        error: err.message
                    });
                }

                res.status(200).json({
                    mensaje: 'Imagen principal registrada correctamente ✅',
                    estado: 'ok'
                });
            });
        }
    });
});

app.post('/img_secundarias', upload.fields([
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 }
]), (req, res) => {
  const files = req.files;
  const orden = "S";

  if (!files || (!files.imagen1 && !files.imagen2)) {
    return res.status(400).json({
      mensaje: 'No se subió ninguna imagen',
      estado: 'error'
    });
  }

  const sqlActualizarOrden = 'CALL Actualizar_orden_excepto_principal()';
  const sqlInsertar = 'CALL Ingresar_img_principal(?, ?)';

  // Primero actualizamos las órdenes
  db.query(sqlActualizarOrden, (err) => {
    if (err) {
      console.error('❌ Error al actualizar órdenes:', err);
      return res.status(500).json({
        mensaje: 'Error al actualizar órdenes ❌',
        estado: 'error',
        error: err.message
      });
    }

    // Luego insertamos las nuevas imágenes
    const inserts = [];

    if (files.imagen1) {
      const imagenNombre1 = files.imagen1[0].filename;
      inserts.push(new Promise((resolve, reject) => {
        db.query(sqlInsertar, [imagenNombre1, orden], (err) => {
          if (err) return reject(err);
          resolve();
        });
      }));
    }

    if (files.imagen2) {
      const imagenNombre2 = files.imagen2[0].filename;
      inserts.push(new Promise((resolve, reject) => {
        db.query(sqlInsertar, [imagenNombre2, orden], (err) => {
          if (err) return reject(err);
          resolve();
        });
      }));
    }

    Promise.all(inserts)
      .then(() => {
        res.status(200).json({
          mensaje: 'Imágenes guardadas correctamente ✅',
          estado: 'ok'
        });
      })
      .catch(err => {
        console.error('❌ Error al guardar imágenes:', err);
        res.status(500).json({
          mensaje: 'Error al guardar las imágenes ❌',
          estado: 'error',
          error: err.message
        });
      });
  });
});

app.post('/Consultar_img_principal', (req, res) => { 
    const sql = 'CALL Buscar_img_por_orden_Principal()';
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('❌ Error al consultar imagen principal:', err);
            return res.status(500).json({
                mensaje: 'Error al consultar imagen principal ❌',
                estado: 'error',
                error: err.message
            });
        }
        // resultados[0] contiene el resultado de la consulta
        res.status(200).json({
            mensaje: 'Consulta realizada correctamente ✅',
            estado: 'ok',
            datos: resultados[0]
        });
    });
});

app.post('/Consultar_img_secundaria', (req, res) => { 
    const sql = 'CALL Consultar_img_secundarias()';
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('❌ Error al consultar imagen principal:', err);
            return res.status(500).json({
                mensaje: 'Error al consultar imagen principal ❌',
                estado: 'error',
                error: err.message
            });
        }
        // resultados[0] contiene el resultado de la consulta
        res.status(200).json({
            mensaje: 'Consulta realizada correctamente ✅',
            estado: 'ok',
            datos: resultados[0]
        });
    });
});

app.post('/mensaje_contacto', (req, res) => {
    const {
        nombre,
        email,
        celular,
        mensaje,
        seccion_origen,
    } = req.body;
    const fecha_hora = dayjs().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');  
    console.log('📥 Datos recibidos:', {
        nombre,
        email,
        celular,
        mensaje,
        seccion_origen,
        fecha_hora
    });

    const sql = 'CALL Insertar_mensaje_contacto(?, ?, ?, ?, ?, ?)';
    const valores = [nombre, email, celular, mensaje, seccion_origen, fecha_hora];

    try {
        db.query(sql, valores, (err, result) => {
            if (err) {
                console.error('❌ Error al insertar mensaje:', err);
                return res.status(500).json({
                    mensaje: 'Hubo un error registrando el mensaje ❌',
                    estado: 'error',
                    error: err.message
                });
            }

            res.status(200).json({
                mensaje: 'Mensaje registrado correctamente ✅',
                estado: 'ok',
            });
        });
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        res.status(500).json({
            mensaje: 'Hubo un error inesperado ❌',
            estado: 'error',
            error: error.message
        });
    }
});

app.post('/validar_usuario', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'Faltan campos requeridos',
      estado: 'error'
    });
  }

  const sql = 'CALL Validar_usuario(?, ?)';
  db.query(sql, [usuario, password], (err, resultados) => {
    if (err) {
      console.error('❌ Error al validar usuario:', err);
      return res.status(500).json({
        mensaje: 'Error del servidor al validar usuario',
        estado: 'error',
        error: err.message
      });
    }

    const usuarioEncontrado = resultados[0][0];
    usuario_logeado = usuarioEncontrado

    console.log('✅Usuario logeado:', usuario_logeado);

    if (usuarioEncontrado) {
      res.status(200).json({
        mensaje: 'Usuario válido ✅',
        estado: 'ok',
        usuario: usuarioEncontrado
      });
    } else {
      res.status(401).json({
        mensaje: 'Usuario o contraseña incorrectos ❌',
        estado: 'error'
      });
    }
  });
});

app.post('/usuario_logeado', (req, res) => {
  if (usuario_logeado) {
    res.status(200).json({
      mensaje: 'Usuario actualmente logueado ✅',
      estado: 'ok',
      usuario: usuario_logeado
    });
  } else {
    res.status(200).json({
      mensaje: 'Ningún usuario está logueado ❌',
      estado: 'error'
    });
  }
});

app.post('/mostrar_experiencias', (req, res) => {
    const sql = 'CALL Mostrar_todo_experiencias()';
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('❌ Error al consultar experiencias:', err);
            return res.status(500).json({
                mensaje: 'Error al consultar experiencias ❌',
                estado: 'error',
                error: err.message
            });
        }
        // resultados[0] contiene el resultado de la consulta
        res.status(200).json({
            mensaje: 'Consulta realizada correctamente ✅',
            estado: 'ok',
            datos: resultados[0]
        });
    });
})

app.post('/experiencia', upload.single('imagen'), (req, res) => {
  const { titulo, descripcion } = req.body;
  const imagenNombre = req.file ? req.file.filename : null;

  if (!titulo || !descripcion || !imagenNombre) {
    return res.status(400).json({
      mensaje: 'Faltan datos requeridos (titulo, descripcion o imagen)',
      estado: 'error'
    });
  }
  const sql2 = 'CALL Insertar_Imagen(?)'
  db.query(sql2, [imagenNombre], (err) => {
    if (err) { 
      console.error('❌ Error al insertar imagen:', err);
      return res.status(500).json({
        mensaje: 'Error al insertar imagen en la base de datos ❌',
        estado: 'error',
        error: err.message
      });
    }
  });
  const sql = 'CALL Agregar_experiencia_basica(?, ?, ?)';

  db.query(sql, [titulo, descripcion, imagenNombre], (err, resultados) => {
    if (err) {
      console.error('❌ Error al agregar experiencia:', err);
      return res.status(500).json({
        mensaje: 'Error al guardar la experiencia',
        estado: 'error',
        error: err.message
      });
    }

    console.log('🌄 Experiencia guardada:', { titulo, descripcion, imagen: imagenNombre });

    res.status(200).json({
      mensaje: 'Experiencia guardada correctamente ✅',
      estado: 'ok',
      experiencia: {
        titulo,
        descripcion,
        imagen: imagenNombre
      }
    });
  });
});

app.post('/evento', upload.single('imagen'), (req, res) => {
    const {
        icono,
        titulo,
        descripcion,
        fecha,
    } = req.body;


    console.log('📆 Evento recibido:', {
        icono,
        titulo,
        descripcion,
        fecha,
    });

    const sql = 'CALL Insertar_evento_simple(?, ?, ?, ?)';
    db.query(sql, [icono, titulo, descripcion, fecha], (err, result) => {
        if (err) {
            console.error('❌ Error al insertar evento:', err);
            return res.status(500).json({
                mensaje: 'Error al guardar evento en la base de datos.',
                estado: 'error',
                error: err.message
            });
        }

        res.status(200).json({
            mensaje: 'Evento registrado correctamente ✅',
            estado: 'ok',
            evento: {
                icono,
                titulo,
                descripcion,
                fecha
            }
        });
    });
});

app.post('/eliminar_experiencia', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      mensaje: 'El ID es obligatorio ❌',
      estado: 'error'
    });
  }

  const sql = 'CALL Eliminar_experiencia(?)';

  db.query(sql, [id], (err, resultados) => {
    if (err) {
      console.error('❌ Error al eliminar la experiencia:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar la experiencia',
        estado: 'error',
        error: err.message
      });
    }

    res.status(200).json({
      mensaje: 'Experiencia eliminada correctamente ✅',
      estado: 'ok'
    });
  });
});

app.post('/mostrar_eventos', (req, res) => {
    const sql = 'CALL Mostrar_todo_evento()';
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('❌ Error al consultar eventos:', err);
            return res.status(500).json({
                mensaje: 'Error al consultar eventos ❌',
                estado: 'error',
                error: err.message
            });
        }
        res.status(200).json({
            mensaje: 'Consulta realizada correctamente ✅',
            estado: 'ok',
            datos: resultados[0]
        });
    });
});

app.post('/eliminar_evento', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      mensaje: 'El ID es obligatorio ❌',
      estado: 'error'
    });
  }

  const sql = 'CALL Eliminar_Evento(?)';

  db.query(sql, [id], (err, resultados) => {
    if (err) {
      console.error('❌ Error al eliminar el evento:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar el evento',
        estado: 'error',
        error: err.message
      });
    }

    res.status(200).json({
      mensaje: 'Ecento eliminado correctamente ✅',
      estado: 'ok'
    });
  });

});

app.post('/contacto', (req, res) => {
  const { nombre, email, celular, mensaje } = req.body;

  if (!nombre || !email || !celular || !mensaje) {
    return res.status(400).json({
      estado: 'error',
      mensaje: 'Faltan datos obligatorios'
    });
  }
  const fecha_hora = new Date();
  const sql = 'CALL Agregar_Contacto(?, ?, ?, ?, ?)';
  db.query(sql, [nombre, email, celular, mensaje, fecha_hora], (err, results) => {
    if (err) {
      console.error('❌ Error al guardar en la base de datos:', err);
      return res.status(500).json({ estado: 'error', mensaje: 'Error en la base de datos' });
    }
    res.status(200).json({
      estado: 'ok',
      mensaje: 'Contacto recibido y mensaje enviado por WhatsApp'
    });
  });
    
});

app.post('/galeria', (req, res) => {
    const sql = 'CALL Mostrar_todo_galeria()';
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('❌ Error al consultar eventos:', err);
            return res.status(500).json({
                mensaje: 'Error al consultar eventos ❌',
                estado: 'error',
                error: err.message
            });
        }
        res.status(200).json({
            mensaje: 'Consulta realizada correctamente ✅',
            estado: 'ok',
            datos: resultados[0]
        });
    });
}); 

app.post('/galeria/nueva', upload.single('imagen'), (req, res) => {
  const ruta_imagen = req.file?.filename;

  if (!ruta_imagen) {
    return res.status(400).json({ mensaje: '❌ No se recibió la imagen' });
  }

  const sql = 'CALL Insertar_Imagen(?)';
  db.query(sql, [ruta_imagen], (err) => {
    if (err) {
      console.error('❌ Error en MySQL:', err); // <---- imprime el error en consola
      return res.status(500).json({ mensaje: '❌ Error al guardar', error: err });
    }
    res.json({ mensaje: '✅ Imagen guardada con éxito' });
  });
});

app.post('/actualizar_orden', (req, res) => {
  const { id} = req.body;
  const orden = "P"
  if (!id || !orden) {
    return res.status(400).json({ mensaje: '❌ Falta id o orden' });
  }
  const sql2 = 'CALL Actualizar_orden_excepto_S()';
  db.query(sql2, (err) => {
    if (err) {
      console.error('❌ Error al actualizar orden:', err);
      return res.status(500).json({ mensaje: '❌ Error al actualizar orden', error: err.message });
    }
  });
  const sql = 'CALL Actualizar_orden_galeria(?, ?)';

  db.query(sql, [id, orden], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar orden:', err);
      return res.status(500).json({ mensaje: '❌ Error en el servidor', error: err.message });
    }

    res.status(200).json({ mensaje: '✅ Orden actualizada correctamente', estado: 'ok' });
  });
});

app.post('/actualizar_secundarias', (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length !== 2) {
    return res.status(400).json({
      mensaje: 'Debes enviar exactamente dos IDs',
      estado: 'error'
    });
  }

  const limpiarSql = 'CALL Actualizar_orden_excepto_principal()'; // ⚠️ pone NULL a todos menos los P
  const actualizarSql = 'CALL Actualizar_orden_galeria(?, "S")';

  db.query(limpiarSql, (err) => {
    if (err) {
      console.error('❌ Error al limpiar:', err);
      return res.status(500).json({ mensaje: 'Error al limpiar ordenes', estado: 'error' });
    }

    // Insertar los dos como "S"
    Promise.all(
      ids.map(id =>
        new Promise((resolve, reject) => {
          db.query(actualizarSql, [id], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
      )
    )
    .then(() => {
      res.status(200).json({ mensaje: 'Secundarias actualizadas ✅', estado: 'ok' });
    })
    .catch(err => {
      console.error('❌ Error al actualizar secundarios:', err);
      res.status(500).json({ mensaje: 'Error al actualizar', estado: 'error' });
    });
  }); // ← Esta es la correcta llave de cierre del db.query de limpieza
});

app.post('/eliminar_imagenes', (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ mensaje: 'Se requiere al menos un ID' });
  }

  const listaIds = ids.join(','); 

  const sql = 'CALL Eliminar_Imagenes_por_Ids(?)';
  db.query(sql, [listaIds], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar imágenes:', err);
      return res.status(500).json({ mensaje: 'Error al eliminar', error: err.message });
    }

    res.status(200).json({ mensaje: 'Imágenes eliminadas ✅', estado: 'ok' });
  });
});


app.post('/producto', upload.single('imagen'), (req, res) => {
    const {
        id,
        artesano_id,
        titulo,
        nombre_producto,
        descripcion,
        precio
    } = req.body;

    const imagenNombre = req.file ? req.file.filename : null;

    console.log('🛍️ Producto recibido:', {
        id,
        artesano_id,
        titulo,
        nombre_producto,
        descripcion,
        precio,
        imagen: imagenNombre
    });

    res.status(200).json({
        mensaje: 'Producto con imagen recibido correctamente.',
        producto: {
            id,
            artesano_id,
            titulo,
            nombre_producto,
            descripcion,
            precio,
            imagen: imagenNombre
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
