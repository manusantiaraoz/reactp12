import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Noticias from "./components/Noticias";
import SinNoticias from "./components/SinNoticias";

function App() {
  const [noticias, setNoticias] = useState({});
  const [categoria, setCategoria] = useState("world");
  const [pais, setPais] = useState("wo");
  //componente condicional
  const [mostrarSpinner, SetMostrarSpinner] = useState(true);
  const[sinNoti, setSinNoti]=useState(true)

  useEffect(() => {
    consultarAPI();
  }, [pais]);
  //usar si o si los corchetitos, porque sino se hara un bucle infinito

  const paises = [
    { name: "Afghanistan", code: "af" },
    { name: "Albania", code: "al" },
    { name: "Algeria", code: "dz" },
    { name: "Andorra", code: "ad" },
    { name: "Angola", code: "ao" },
    { name: "Argentina", code: "ar" },
    { name: "Armenia", code: "am" },
    { name: "Australia", code: "au" },
    { name: "Austria", code: "at" },
    { name: "Azerbaijan", code: "az" },
    { name: "Bahamas", code: "bs" },
    { name: "Belize", code: "bz" },
    { name: "Bolivia", code: "bo" },
    { name: "Brazil", code: "br" },
    { name: "Cameroon", code: "cm" },
    { name: "Canada", code: "ca" },
    { name: "Chile", code: "cl" },
    { name: "Cuba", code: "cu" },
    { name: "Dominica", code: "dm" },
    { name: "Dominican republic", code: "do" },
    { name: "Ecuador", code: "ec" },
    { name: "Egypt", code: "eg" },
    { name: "El Salvador", code: "fi" },
    { name: "Finland", code: "az" },
    { name: "France", code: "fr" },
    { name: "Fiji", code: "fj" },
    { name: "Germany", code: "de" },
    { name: "Ghana", code: "gh" },
    { name: "Grenada", code: "gd" },
    { name: "Haiti", code: "ht" },
    { name: "Honduras", code: "hn" },
    { name: "Hong kong", code: "hk" },
    { name: "India", code: "in" },
    { name: "Israel", code: "il" },
    { name: "Italy", code: "it" },
    { name: "Japan", code: "jp" },
    { name: "Jersey", code: "je" },
    { name: "Jordan", code: "jo" },
    { name: "Kenya", code: "ke" },
    { name: "Kosovo", code: "xk" },
    { name: "Kuwait", code: "kw" },
    { name: "Lithuania", code: "lt" },
    { name: "Libya", code: "ly" },
    { name: "Luxembourg", code: "lu" },
    { name: "Macedonia", code: "mk" },
    { name: "Madagascar", code: "mg" },
    { name: "Mexico", code: "mx" },
    { name: "New zealand", code: "nz" },
    { name: "Nicaragua", code: "ni" },
    { name: "North korea", code: "kp" },
    { name: "Oman", code: "om" },
    { name: "Paraguay", code: "py" },
    { name: "Peru", code: "pe" },
    { name: "Qatar", code: "qa" },
    { name: "Romania", code: "ro" },
    { name: "Russia", code: "ru" },
    { name: "Rwanda", code: "rw" },
    { name: "Sudan", code: "sd" },
    { name: "South Korea", code: "kr" },
    { name: "Spain", code: "es" },
    { name: "Taiwan", code: "tw" },
    { name: "Tanzania", code: "tz" },
    { name: "Thailand", code: "th" },
    { name: "Uganda", code: "ug" },
    { name: "Ukraine", code: "ua" },
    { name: "United states of america", code: "us" },
    { name: "Vatican", code: "va" },
    { name: "Venezuela", code: "ve" },
    { name: "Vietnam", code: "vi" },
    { name: "Yemen", code: "ye" },
    { name: "Zambia", code: "zm" },
    { name: "Zimbabwe", code: "zw" },
  ];

  const consultarAPI = async () => {
    //poner en true el spinner
    SetMostrarSpinner(true);
    try {
      //peticiones get con react
      const repuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_381258db9a257415299b43385bc7dd4011f98&language=es,&category=${categoria},&country=${pais}`
      );
      const datos = await repuesta.json();
      setNoticias(datos.results);
     
      datos.results.length !== 0 ? setSinNoti(false): setSinNoti(true);
      
      SetMostrarSpinner(false);
    } catch (err) {
      console.log(err);
      
    }
  };

const sinNoticias= () => sinNoti === false ?(<Noticias noticias={noticias}></Noticias>):(<SinNoticias></SinNoticias>);

  const mostrarComponente = mostrarSpinner ? (
    <div>
      {" "}
      <span className="loader"></span>{" "}
    </div>
  ) : (
    sinNoticias()
  );

  return (
    <>
      <Container className="text-center my-5">
        <h1 className="display-2">top noticias</h1>

        <Form.Select
          className="my-3"
          aria-label="Default"
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>selecciona la categoria:</option>
          <option value="world">mundial</option>
          <option value="business">negocios</option>
          <option value="crime">crimenes</option>
          <option value="domestic">hogar</option>
          <option value="education">educacion</option>
          <option value="entertainment">entretenimiento</option>
          <option value="environment">medio ambiente</option>
          <option value="food">comida</option>
          <option value="health">salud</option>
          <option value="lifestyle">Estilo de vida</option>
          <option value="other">otros</option>
          <option value="politics">politica</option>
          <option value="sports">deportes</option>
          <option value="technology">tecnologia</option>
          <option value="top">más relevantes</option>
          <option value="tourism">ciencia</option>
        </Form.Select>
        <Form.Select
          className="my-3"
          aria-label="Default"
          onChange={(e) => setPais(e.target.value)}
        >
          <option>ahora selecciona el pais:</option>
          <option value="world">mundial</option>
          {paises.map((pais, i)=><option key={i} value={pais.code}>{pais.name}</option>)}
        </Form.Select>
        {mostrarComponente}
      </Container>
    </>
  );
}

export default App;
