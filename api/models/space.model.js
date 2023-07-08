export default class Space {
  constructor(id, name, plan) {
    this.id = id;
    this.name = name;
    this.plan = plan;
  }

  getPlanAsArray() {
    return JSON.parse(this.plan);
  }
}
