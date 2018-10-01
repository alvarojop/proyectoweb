//import the necessary files
import React from 'react';
import ReactDOM from 'react-dom';
import { PanelGroup, Panel, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AddFactura } from './components/addfactura';
import { EditFactura } from './components/editfactura';
import './index.css';

//create the main class for displaying the recipes
class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facturas: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addFactura = this.addFactura.bind(this);
    this.editFactura = this.editFactura.bind(this);
    this.deleteFactura = this.deleteFactura.bind(this);
  }
  componentDidMount() {//load the local storage data after the component renders
    var facturas = (typeof localStorage["facturas"] !== "undefined") ? JSON.parse(localStorage.getItem("facturas")) : [
      { serie: "A", numero: "1", fecha: "01/01/2018", nit: "7654321-1", nombre: "Maria Anders", anulada: "No" },
      { serie: "A", numero: "2", fecha: "05/01/2018", nit: "7572413-8", nombre: "Francisco Chang", anulada: "Si" },
      { serie: "A", numero: "3", fecha: "02/02/2018", nit: "2035684-9", nombre: "Roland Mendel", anulada: "No" },
      { serie: "A", numero: "4", fecha: "27/02/2018", nit: "5256585-4", nombre: "Helen Bennett", anulada: "No" },
      { serie: "A", numero: "5", fecha: "08/06/2018", nit: "7582458-6", nombre: "Yoshi Tannamuri", anulada: "No" },
      { serie: "A", numero: "6", fecha: "07/08/2018", nit: "2563452-1", nombre: "Giovanni Rovelli", anulada: "No" }
    ];
    this.setState({facturas: facturas});
  }
  showAddModal() {//show the new factura modal
    this.setState({ showAdd: !this.state.showAdd });
  }
  showEditModal(index) {//show the edit factura modal
    this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
  }
  addFactura(factura) {//create a new factura
    let facturas = this.state.facturas;
    facturas.push(factura);
    localStorage.setItem('facturas', JSON.stringify(facturas));
    this.setState({ facturas: facturas });
    this.showAddModal();
  }
  editFactura(newSerie, newNumero, newFecha, newNit, newNombre, newAnulada, currentlyEditing) {//edit an existing factura
    let facturas = this.state.facturas;
    facturas[currentlyEditing] = {serie: newSerie, numero: newNumero, fecha: newFecha, nit: newNit, nombre: newNombre, anulada: newAnulada};
    localStorage.setItem('facturas', JSON.stringify(facturas));
    this.setState({facturas: facturas});
    this.showEditModal(currentlyEditing);
  }
  deleteFactura(index) {//delete an existing factura
    let facturas = this.state.facturas.slice();
    facturas.splice(index, 1);
    localStorage.setItem('facturas', JSON.stringify(facturas));
    this.setState({facturas: facturas, currentlyEditing: 0});
  }
  render() {
    const facturas = this.state.facturas;
    return (
      <div className="jumbotron">
        <h1>Listado de Facturas</h1>
        <PanelGroup accordion id="facturas">
          {facturas.map((factura, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>{factura.serie}-{factura.numero}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  <ListGroupItem >Serie: {factura.serie}</ListGroupItem>
                  <ListGroupItem >Número: {factura.numero}</ListGroupItem>
                  <ListGroupItem >Fecha: {factura.fecha}</ListGroupItem>
                  <ListGroupItem >NIT: {factura.nit}</ListGroupItem>
                  <ListGroupItem >Nombre: {factura.nombre}</ListGroupItem>
                  <ListGroupItem >Anulada: {factura.anulada}</ListGroupItem>
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Editar</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteFactura(index)}}>Borrar</Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditFactura onShow={this.state.showEdit} onEdit={this.editFactura} onEditModal={() => {this.showEditModal(this.state.currentlyEditing)}} currentlyEditing={this.state.currentlyEditing} factura={facturas[this.state.currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
        <Button bsStyle="primary" onClick={this.showAddModal}>Crear Factura</Button>
        <AddFactura onShow={this.state.showAdd} onAdd={this.addFactura} onAddModal={this.showAddModal} />
      </div>
    );
  }
};
ReactDOM.render(<Factura />, document.getElementById('app'));
