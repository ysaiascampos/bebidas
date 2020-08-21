import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();
const RecetasProvider = (props) => {
    const [recetas, setRecetas] = useState([]);
    const [busquedarecetas, setBusquedaRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, setConsultar] = useState(false);
    
    useEffect(()=>{
        if(consultar){
            const obtenerRecetas = async () => {
                const {nombre, categoria } = busquedarecetas;
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios.get(url);
                setRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    },[busquedarecetas,consultar]);
    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBusquedaRecetas,
                setConsultar
                
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetasProvider;