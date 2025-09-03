import { useNavigate } from "react-router-dom"


export const RegisterPages = () => {
  const navigate = useNavigate();

  return (
    <div className='container d-flex align-items-center justify-content-center min-vh-100 bg-light'>
      <div
        className='card shadow-lg p-4'
        style={{ maxWidth: 400, width: '100%' }}
      >
        <div className='text-center mb-4'>
          <i
            className='bi bi-person-circle'
            style={{ fontSize: '3rem', color: '#0d6efd' }}
          ></i>
          <h2 className='mt-2 mb-0 fw-bold'>Crear Cuenta</h2>
          <p className='text-muted mb-0'>
            Bienvenido, ingresa tus datos para crear una cuenta{' '}
          </p>
        </div>
        <form>
          <div className='mb-3'>
            <label htmlFor='inputNombre' className='form-label'>
              Nombre Completo
            </label>
            <input
              type='text'
              className='form-control'
              id='inputNombre'
              placeholder='Ej: Juan Carlos'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='inputApellido' className='form-label'>
              Apellido Completo
            </label>
            <input
              type='text'
              className='form-control'
              id='inputApellido'
              placeholder='Ej: Pérez Gómez'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='inputEmail' className='form-label'>
              Correo electrónico
            </label>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              aria-describedby='emailHelp'
              placeholder='usuario@correo.com'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='inputPassword' className='form-label'>
              Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              placeholder='••••••••'
            />
          </div>
          <div className='mb-3 form-check'>

          </div>

        <div className="d-flex gap-2" > 
          <button type='submit' className='btn btn-primary w-100'>
            Registrarme
          </button>
           <button 
           type='button'
            className='btn btn-primary w-100'
            onClick={() => navigate('/login')}
          >
            Volver
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPages
