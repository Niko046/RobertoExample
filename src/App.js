import logo from './logo.svg';
import './App.css';

<<<<<<< Updated upstream
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
class ComponentToPrint extends React.Component{
    state={
      data:[],
      pagos:[],
      clientes:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        folio: '',
        razon_social_empresa: '',
        direccion: '',
        cp: '',
        tipoModal: ''
      }
    }
  
    peticionPagos=()=>{
      axios.get(url2).then(response=>{
        this.setState({pagos: response.data});
       }).catch(error=>{
            console.log(error.message);
       })
      }
      
      peticionClientes=()=>{
        axios.get(url3).then(response=>{
          this.setState({clientes: response.data.data});
         }).catch(error=>{
              console.log(error.message);
         })
        }
  
        peticionGet=()=>{
          axios.get(url).then(response=>{
            this.setState({data: response.data.data});
          }).catch(error=>{
            console.log(error.message);
          })
          }

          seleccionarFactura=(factura)=>{
            this.setState({
              tipoModal: 'actualizar',
              form: {
                folio: factura.folio,
                razonSocialEmpresa:factura.razonSocialEmpresa,
                direccion: factura.direccion,
                cp: factura.cp,
                telefono: factura.telefono,
                rfc: factura.rfc,
                regimenFiscal: factura.regimenFiscal,
                fecha: factura.fecha,
                correo: factura.correo,
                folioFiscal: factura.folioFiscal,
                certificadoDigital: factura.certificadoDigital,
                serieCertificadoSat: factura.serieCertificadoSat,
                estado: factura.estado,
                idPago: factura.idPago,
                rfcCliente: factura.rfcCliente
              }
            })
          }
  
  handleChange=async e=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }
  
    componentDidMount() {
      this.peticionGet();
      this.peticionPagos();
      this.peticionClientes();
    }
    
  
    
  

  render() {
      const {form}=this.state;
    return (
      <div className="container-fluid">

        
        <div class="row my-3">
        <h1>NOMBRE EMPRESA</h1>
        <p>MIMOSAS ,117,STA. MARIA INSURGENTES,CUAUHTÉMOC,DISTRITO FEDERAL</p>
        <p>CP: 3372</p>
      </div>

      <div class="row fact-info mt-3">
      <div class="col-4">
        <h5>Facturar a</h5>
        <p>
        {this.state.form(clientes=>{
          return(
              <p>{clientes.rfc}</p>
          )
        })} 
        </p>
      </div>
      <div class="col-4">
        <h5>N° de factura</h5>
        <h5>Fecha</h5>
      </div>
      <div class="col-4">
              <p>{form?form.folio: this.state.data}</p>
        {this.state.data.map(factura=>{
          return(
              <p>{form?form.fecha: this.state.data}</p>
              
          )
        })}
      </div>
    </div>

    {/* TABLA BASE */}
    <table className="table">
        <thead className='text-center'>
          <th>CANTIDAD</th>
          <th>ARTICULO</th>
          <th>PRECIO UNITARIO</th>
          <th>TOTAL</th>
        </thead>
        <tbody>
        {this.state.data.map(factura=>{
          return(
          <tr>
            <td>{factura.folio}</td>
              <td>{factura.fecha}</td>
              <td>{factura.estado ? <p>Generada</p>: <p>No Generada</p>}</td>
          </tr>
          )
        })}
        </tbody>        
      </table>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
