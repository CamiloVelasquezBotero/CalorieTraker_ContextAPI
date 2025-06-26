import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTraker() {

    const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()

  return ( 
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen De Calorias</h2>
        
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">

            <CalorieDisplay 
                calories={caloriesConsumed}
                text='Consumidas '
            />
            <CalorieDisplay 
                calories={caloriesBurned}
                text='Ejercicio '
            />
            <CalorieDisplay 
                calories={netCalories}
                text='Diferencia '
            />
            
        </div>
    </>
  )
}
