import { createContext, useMemo, useReducer, type ReactNode } from "react";
import { activityReducer, initialState } from '../reducers/activity-reducer'
import type { ActivityState, ActivityActions } from "../reducers/activity-reducer";
import { useScrollToView } from '../hooks/useScrollToView' /* Hook personalizado para hacer scroll en el dom */
import type { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState,
    dispatch: React.ActionDispatch<[action: ActivityActions]>,
    caloriesConsumed: number,
    caloriesBurned: number,
    netCalories: number,
    sectionRef: React.RefObject<HTMLElement | null>,
    scrollToSection: () => void,
    categoryName: (category: Activity["category"]) => string[] /* Es una funcion, toma category de tipo Activity con lookupA Activity y devuelve un string en arreglo */
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children}:ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)
    const [sectionRef, scrollToSection] = useScrollToView<HTMLElement>()

    // CalorieTraker Contadores
    const caloriesConsumed = useMemo(() =>  /* Hacemos el total de calorias consumidas */
        state.activities.reduce((total, activity) => activity.category === 1 ? total+activity.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo(() =>  /* Calorias quemadas en Ejercicio */
        state.activities.reduce((total, activity) => activity.category === 2 ? total+activity.calories : total, 0), [state.activities])
    const netCalories = useMemo(() =>  /* Hacemos la diferencia de las calorias*/
        caloriesConsumed - caloriesBurned, [state.activities])

    // ActivityList Variables de state
    const categoryName = useMemo(() => /* Actualizamos el nombre segun su categoria */
        (category:Activity['category']) =>
        categories.map( cat => cat.id === category ? cat.name : '') 
        , [state.activities]
    )
    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                netCalories,
                sectionRef,
                scrollToSection,
                categoryName,
                isEmptyActivities
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}