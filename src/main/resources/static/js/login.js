document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje-error');
  
    try {
      const response = await fetch('/data/usuarios.json');
      const usuarios = await response.json();
  
      const usuario = usuarios.find(u => u.correo === correo && u.password === password);

      if (usuario.rol === 'cliente') {
        window.location.href = '/';
      } else if (usuario.rol === 'trabajador') {
        window.location.href = '/';
      }
  
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      mensaje.textContent = "Ocurrió un error al iniciar sesión.";
    }
  });
  