import { Field, SmartContract, state, State, method } from 'o1js';


export class Add extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.num.set(Field(1));
  }

  @method update() {
    const currentState = this.num.getAndAssertEquals();
    const newState = currentState.add(1);
    this.num.set(newState);
  }
  
}
