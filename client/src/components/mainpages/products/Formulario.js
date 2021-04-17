import {useState,useEffect} from 'react';
import Bienvenida from './Bienvenida';
import Bienvenida2 from './Bienvenida2';
import Confirm from './Confirm';
import Data from './data';

function Formulario() {
    const [step,setStep] = useState(1);
    const [reserva, setReserva] = useState({
      csalida: "",
      cdestino: "",
      horario: "",
      fecha: "",
      noadultos: 0,
      noninos: 0,
      tipo: "",
      precio: 0,
      id_usuario: "",
    });
    const [ciudadOpt, setCiudadOpt] = useState("");

    const siguiente = ()=>{
        const tmp = step +1
        setStep(tmp)
    }

    const regresar = ()=>{
      const tmp = step-1
      setStep(tmp)
    }
 
    const onChangeInput = (e) => {
      const { name, value } = e.target;
      setReserva({ ...reserva, [name]: value });
    };

    const Switch = (props) => {
      const { step, children } = props;
      return children.find((child) => {
        return child.props.value === step;
      });
    };

    useEffect(()=>{
       const cargarCiudad = async () => {
         const min = 1;
         const max = Data.length;
         const rand = Math.random() * (max-min);

         await setCiudadOpt(Data[Math.floor(rand)]);
       };
       cargarCiudad();
    })

    return (
      <Switch step={step}>
        <div value={1}>
          <Bienvenida
            siguiente={siguiente}
            onChangeInput={onChangeInput}
            reserva={reserva}
            setReserva={setReserva}
          />
        </div>
        <div value={2}>
          <Bienvenida2
            regresar={regresar}
            siguiente={siguiente}
            ciudadOpt={ciudadOpt}
            onChangeInput={onChangeInput}
            reserva={reserva}
            setReserva={setReserva}
          />
        </div>
        <div value={3}>
          <Confirm
            regresar={regresar}
            onChangeInput={onChangeInput}
            ciudadOpt={ciudadOpt}
            reserva={reserva}
            setReserva={setReserva}
          />
        </div>
      </Switch>
    );
}

export default Formulario;
