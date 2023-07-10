import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableRow from "@/components/tablerow";
import Button from "./button";
import Paragraph from "./Paragraph";
import SVG from "./svg";
import Title from "./title";

function Field({ children, className }) {
  return <td className={className}>{children}</td>;
}

function ColumnSelectorField({ className, onClick }) {
  return (
    <Field className={className}>
      <div className=" flex justify-center items-center">
        <Button square={true} border={false} onClick={onClick}>
          <SVG src="/arrowDown.svg" />
        </Button>
      </div>
    </Field>
  );
}

function RowSelectorField({ className, onClick }) {
  return (
    <Field className={className}>
      <div className=" flex justify-center items-center">
        <Button square={true} border={false} onClick={onClick}>
          <SVG src="/arrowRight.svg" />
        </Button>
      </div>
    </Field>
  );
}

function InputField({ className, inputClassName, value, onKeyUp }) {
  return (
    <Field className={className}>
      <input
        type="text"
        defaultValue={value}
        className={`px-2 py-1 w-full focus:outline-2 focus:outline-black rounded-none text-center ${inputClassName}`}
        onKeyUp={onKeyUp}
      />
    </Field>
  );
}

export default function PlanTable({
  plan,
  addColumn,
  addRow,
  setFieldValue,
  selectColumn,
  selectRow,
  selector,
  selectorIndex,
  deleteSelected,
  setDividerForSelected,
}) {
  const inactivePattern = /^\(.*\)$/;
  return (
    <div>
      <div className="text-left px-8 pb-6 pt-4 backdrop-blur-sm bg-white/30 border-2 border-gray-300 rounded-lg drop-shadow flex mb-4">
        <Paragraph>
          Mit der nachfolgenden Tabelle kann der Aufbau eines Bereichs definiert
          werden. Dabei gilt ein grosses 'X' als ein Teiler Feld und eine
          Tisch-Bezeichnung umrandet mit runden Klammern '()' entspricht einem
          inaktiven Tisch.
        </Paragraph>
      </div>
      <Button className="drop-shadow mb-4 mr-4" onClick={() => addColumn()}>
        <SVG src="/add.svg" className="mr-2" />
        Spalte einfügen
      </Button>
      <Button className="drop-shadow mb-4 mr-4" onClick={() => addRow()}>
        <SVG src="/add.svg" className="mr-2" />
        Zeile einfügen
      </Button>
      <Button
        className="drop-shadow mb-4 mr-4"
        onClick={() => deleteSelected()}
      >
        <SVG src="/delete.svg" className="mr-2" />
        Löschen
      </Button>
      <Button
        className="drop-shadow mb-4 mr-4"
        onClick={() => setDividerForSelected()}
      >
        <SVG src="/divider.svg" className="mr-2" />
        Teiler setzen
      </Button>
      <Table className="w-full">
        <TableBody>
          <TableRow className="bg-gray-50 h-10">
            <Field className="border-r-2 border-b-2 w-10"></Field>
            {plan[0].map((value, index) => (
              <ColumnSelectorField
                key={index}
                onClick={() => selectColumn(index)}
                className={`border-b-2 ${
                  index != plan[0].length - 1 ? "border-r-2" : null
                }`}
              />
            ))}
          </TableRow>
          {plan.map((line, rowIndex) => (
            <TableRow key={rowIndex}>
              <RowSelectorField
                onClick={() => selectRow(rowIndex)}
                className={`border-r-2 w-10 bg-gray-50 
                ${rowIndex != plan.length - 1 ? "border-b-2" : null}`}
              />
              {line.map((value, columnIndex) => (
                <InputField
                  key={columnIndex}
                  className={`${
                    columnIndex != line.length - 1 ? "border-r-2" : null
                  } 
                  ${rowIndex != plan.length - 1 ? "border-b-2" : null}
                  ${value === "X" ? "bg-gray-900 text-gray-900" : null}
                  ${
                    inactivePattern.test(value)
                      ? "bg-gray-600 text-white"
                      : null
                  }
                  ${
                    (selector == 0 && selectorIndex == columnIndex) ||
                    (selector == 1 && selectorIndex == rowIndex)
                      ? "bg-gray-200"
                      : null
                  }`}
                  inputClassName={`
                  ${value === "X" ? "bg-gray-900 text-gray-900" : null}
                  ${
                    inactivePattern.test(value)
                      ? "bg-gray-600 text-white"
                      : null
                  }
                  ${
                    (selector == 0 && selectorIndex == columnIndex) ||
                    (selector == 1 && selectorIndex == rowIndex)
                      ? "bg-gray-200"
                      : null
                  }`}
                  value={value}
                  onKeyUp={() => setFieldValue(event, columnIndex, rowIndex)}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
