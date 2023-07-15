export default class MenuGroup {
  constructor(id, name) {
    this.id = id;
    this.name = name;
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
