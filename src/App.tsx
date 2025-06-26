import { useEffect, useMemo } from 'react'
import Form from "./components/Form"
import ActivityList from './components/ActivityList'
import CalorieTraker from './components/CalorieTraker'
import { useActivity } from './hooks/useActivity'

function App() {
  const { state, dispatch, sectionRef } = useActivity()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities)) /* Creamos en el localStorage  */
  }, [state.activities]) /* Guardamos las actividades en el localStorage cada que se actualice el state */

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities]) /* Verificamos si hay actividades */

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador De Calorias</h1>

          <button
            className='bg-gray-800 hover:bg-gray-900 p-2 font-bold  uppercase text-white cursor-pointer rounded-lg  text-sm disabled:opacity-10'
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >Reiniciar App</button>
        </div>
      </header>

      <section 
        className="bg-lime-500 py-20 px-5"
        ref={sectionRef}
      >
        <div className="max-w-4xl mx-auto -mt-10">
          <p
            className={`transition-all duration-300 p-1 bg-sky-900 text-white inline-block rounded-lg ml-10 font-bold
              ${state.activeId ? "opacity-100 translate-y-0 pointer-events-auto mb-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            Editando!...
          </p>
          <Form />
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTraker />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList />
      </section>
    </>
  )
}

export default App
