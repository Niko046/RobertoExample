import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEdit, faEye, faPrint, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ReactToPrint from 'react-to-print';
const url="https://serviciofactura-development.herokuapp.com/api/v1/factura/";
const url2="https://payment-development.herokuapp.com/api/payment/records";
const url3="https://client-development.herokuapp.com/api/cliente/";

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
        {this.state.data.map(clientes=>{
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
        <p>
        {this.state.data.map(factura=>{
          return(
              <p>{factura.folio}</p>
          )
        })}         
        </p>
        {this.state.data.map(factura=>{
          return(
              <p>{factura.fecha}</p>
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
    </div>
  
  
  
  
  
  
  
  
    );
  }
}

class App extends Component {
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
        
        peticionPost=async()=>{
          delete this.state.form.id;
         await axios.post(url,this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
          }).catch(error=>{
            console.log(error.message);
          })
        }
        
        peticionPut=()=>{
          axios.put(url+this.state.form.folio, this.state.form).then(response=>{
          ;
            this.modalEditar();
            this.peticionGet();
            this.modalEstado();
            
          })
        }
        
        peticionDelete=()=>{
          axios.delete(url+this.state.form.folio).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
          })
        }

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}

modalEstado=()=>{
  this.setState({modalEstado: !this.state.modalEstado});
}

modalImprimir=()=>{
  this.setState({modalImprimir: !this.state.modalImprimir})
}

modalEliminar=()=>{
  this.setState({modalEliminar: !this.state.modalEliminar})
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
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">

        <h1>
          Servicio de Facturación
        </h1>

  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Crear factura</button>
  <br /><br />
    <table className="table table-hover table-responsive text-justify">
      <thead className='table-dark '>
        <tr>
          <th>Folio</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Id pago</th>
          <th>Id cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(factura=>{
          return(
            <tr key={factura.folio}>
            <td>{factura.folio}</td>
            <td>{factura.fecha}</td>
            <td>
              {factura.estado ? <p>true</p>: <p>false</p>}
            </td>
            <td>{factura.idPago}</td>
            <td>{factura.rfcCliente}</td>
            <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarFactura(factura); this.modalEditar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarFactura(factura); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                {"   "}
                <button className="btn btn-warning" onClick={()=>{this.seleccionarFactura(factura);this.modalImprimir() }}><FontAwesomeIcon icon={faEye}/></button>
          </td>

          
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}} className='bg-success text-white'>
                  CREAR NUEVA FACTURA
                <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}><FontAwesomeIcon icon={faCircleXmark}/></span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="folio">Folio</label>
                    <input className="form-control" type="number" name="folio" id="folio" onChange={this.handleChange} value={form?form.folio: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="folioFiscal">Folio fiscal</label>
                    <input className="form-control" type="text" name="folioFiscal" id="folioFiscal" onChange={this.handleChange} value={form?form.folioFiscal: ''}/>
                    <br />
                    <label htmlFor="idPago">id pago</label>
                    <select className="form-control" type="number" name="idPago" id="idPago" onChange={this.handleChange}>
                      {this.state.pagos.map(pago=>(
                      <option key={pago.paymentID} value= {pago.paymentID}>{pago.paymentID}</option>
                      ))
                        }
                    </select>
                    <br />
                    <label htmlFor="rfcCliente">id cliente</label>
                    <select className="form-control" type="text" name="rfcCliente" id="rfcCliente" onChange={this.handleChange}>
                      {this.state.clientes.map(cliente=>(
                      <option key={cliente.rfc} value= {cliente.rfc}>{cliente.rfc}</option>
                      ))
                        }
                    </select>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>



          <Modal isOpen={this.state.modalEditar}>
                <ModalHeader style={{display: 'block'}} className="bg-primary text-white">
                  ACTUALIZAR FACTURA
                <span style={{float: 'right'}} onClick={()=>this.modalEditar()}><FontAwesomeIcon icon={faCircleXmark}/></span>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <label htmlFor="folio">Folio</label>
                    <input className="form-control" type="number" name="folio" id="folio" readOnly onChange={this.handleChange} value={form?form.folio: this.state.data}/>
                    <br />
                    <label htmlFor="razonSocialEmpresa">Razon social de la empresa</label>
                    <input className="form-control" type="text" name="razonSocialEmpresa" id="razonSocialEmpresa" readOnly onChange={this.handleChange} value={form?form.razonSocialEmpresa: this.state.data}/>
                    <br />
                    <label htmlFor="direccion">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} readOnly value={form?form.direccion: this.state.data}/>
                    <br />
                    <label htmlFor="cp">Codigo postal</label>
                    <input className="form-control" type="number" name="cp" id="cp" onChange={this.handleChange} readOnly value={form?form.cp: this.state.data}/>
                    <br />
                    <label htmlFor="correo">Correo</label>
                    <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} readOnly value={form?form.correo: this.state.data}/>
                    <br />
                    <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="number" name="telefono" id="telefono" onChange={this.handleChange} readOnly value={form?form.telefono: this.state.data}/>
                    <br />
                    <label htmlFor="rfc">rfc</label>
                    <input className="form-control" type="text" name="rfc" id="rfc" onChange={this.handleChange} readOnly value={form?form.rfc: this.state.data}/>
                    <br />
                    <label htmlFor="regimenFiscal">Regimen fiscal</label>
                    <input className="form-control" type="text" name="regimenFiscal" id="regimenFiscal" readOnly onChange={this.handleChange} value={form?form.regimenFiscal: this.state.data}/>
                    <br />
                    <label htmlFor="fecha">Fecha</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.handleChange} readOnly value={form?form.fecha: this.state.data}/>
                    <br />
                    <label htmlFor="folioFiscal">Folio fiscal <label className='text-danger fw-bold'> *</label></label>
                    <input className="form-control" type="text" name="folioFiscal" id="folioFiscal"  onChange={this.handleChange} value={form?form.folioFiscal: this.state.data}/>
                    <br />
                    <label htmlFor="certificadoDigital">Certificado digital</label>
                    <input className="form-control" type="text" name="certificadoDigital" id="certificadoDigital" readOnly onChange={this.handleChange} value={form?form.certificadoDigital: this.state.data}/>
                    <br />
                    <label htmlFor="serieCertificadoSat">serie cerificado del SAT digital</label>
                    <input className="form-control" type="text" name="serieCertificadoSat" id="serieCertificadoSat" readOnly onChange={this.handleChange} value={form?form.serieCertificadoSat: this.state.data}/>
                    <br />
                    <label htmlFor="estado">Estado <label className='text-danger fw-bold'> *</label></label>
                    <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form?form.estado: this.state.data}>
                      <option>Generada</option>
                      <option>No Generada</option>
                      </select>
                    <br />
                    <label htmlFor="idPago">id Pago <label className='text-danger fw-bold'> *</label></label>
                    <select className="form-control" type="number" name="idPago" id="idPago" onChange={this.handleChange}>
                      {this.state.pagos.map(pago=>(
                      <option key={pago.paymentID} value= {pago.paymentID}>{pago.paymentID}</option>
                      ))
                        }
                    </select>
                    <br />
                    <label htmlFor="rfcCliente">id cliente <label className='text-danger fw-bold'> *</label></label>
                    <select className="form-control" type="text" name="rfcCliente" id="rfcCliente" onChange={this.handleChange}>
                      {this.state.clientes.map(cliente=>(
                      <option key={cliente.rfc} value= {cliente.rfc}>{cliente.rfc}</option>
                      ))
                        }
                    </select>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalEditar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalHeader style={{display: 'block'}} className="bg-danger text-white">
              ELIMINAR FACTURA
              <span style={{float: 'right'}} onClick={()=>this.modalEliminar()}><FontAwesomeIcon icon={faCircleXmark}/></span>
            </ModalHeader>
            <ModalBody>
               Estás seguro que deseas eliminar la factura {form && form.folio}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-primary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

           
          <Modal isOpen={this.state.modalCambiar}>
            <ModalBody>
             Estás seguro que deseas Cancelar la factura {form && form.folio}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionEstado()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalCambiar: false})}>No</button>
            </ModalFooter>
          </Modal>


          {/* ESTE ES EL MODAL PARA IMPRIMIR UNA FACTURA */}

          <Modal isOpen={this.state.modalImprimir}>
          <ModalHeader style={{display: 'block'}} className="bg-warning">
                  REPORTE DE FACTURA
                  <span style={{float: 'right'}} onClick={()=>this.modalImprimir()}><FontAwesomeIcon icon={faCircleXmark}/></span>
                </ModalHeader>
            <ModalFooter>
              {/* GENERO EL BOTON LLAMANDO EL COMPONENTE DE IMPRESION */}
              <ReactToPrint
                trigger={() =>{
                  return <button className="btn btn-warning" href=""><FontAwesomeIcon icon={faPrint}/></button>;
                  
                }}
                content={() => this.componentRef}
                />
                <ComponentToPrint ref = {el => (this.componentRef = el)} />
              <button className="btn btn-danger" onClick={()=>this.setState({modalImprimir: false})}>Cancelar</button>
            </ModalFooter>
          </Modal>



          {/* FUNCIONES PARA VALIDAR */}
  </div>








  );
}
}
export default App;

