import "./App.scss";
import { Card } from "./ui/card/card";
import { ButtonChip } from "./ui/button-chip/button-chip";
import UndoIcon from "./assets/icons/undo.svg?react";

function App() {
  // const [count, setCount] = useState(0);
  const foo = () => {};
  return (
    <>
      <div className="app-container">
        <Card
          className="text-card"
          header={<h1>Hello world</h1>}
          subheader={
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem odio ipsum aperiam at earum vitae magnam ipsa aut
              doloribus. Veniam neque quaerat ullam suscipit atque
              exercitationem quam accusantium esse officiis.
            </span>
          }
          footer={
            <div className="card-footer">
              <div className="card-footer__left-actions">
                <ButtonChip
                  outlined={true}
                  onClick={foo}
                  icon={<UndoIcon className="text-card__undo" />}
                ></ButtonChip>
                <ButtonChip
                  onClick={foo}
                  severity="danger"
                  className="text-card__delete"
                >
                  DELETE
                </ButtonChip>
              </div>

              <ButtonChip onClick={foo} className="text-card__add">
                ADD
              </ButtonChip>
            </div>
          }
        >
          <p>content body</p>
        </Card>
      </div>
    </>
  );
}

export default App;
