export default class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.assigned = false;
    this.hidden = false;
  }

  setAssigned(assigned) {
    this.assigned = assigned;
  }

  setHidden(hidden) {
    this.hidden = hidden;
  }
}
