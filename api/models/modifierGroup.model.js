export default class ModifierGroup {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.assigned = false;
    }

    setAssigned(assigned) {
        this.assigned = assigned;
    }
}
