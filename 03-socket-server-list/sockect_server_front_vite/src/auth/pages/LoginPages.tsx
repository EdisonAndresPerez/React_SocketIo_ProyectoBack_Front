import { useNavigate } from 'react-router-dom'


export const LoginPages = () => {
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
          <h2 className='mt-2 mb-0 fw-bold'>Iniciar Sesión</h2>
          <p className='text-muted mb-0'>Bienvenido, ingresa tus datos</p>
        </div>
        <form>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Correo electrónico
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='usuario@correo.com'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='••••••••'
            />
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Recordarme
            </label>
          </div>
          <div className='d-flex gap-2'>
            <button type='submit' className='btn btn-primary w-50'>
              Ingresar
            </button>
            <button
              type='button'
              className='btn btn-outline-primary w-50'
              onClick={() => navigate('/registerPages')}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPages
