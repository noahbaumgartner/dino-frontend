import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableRow from "@/components/tablerow";
import Button from "./button";
import SVG from "./svg";

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
}) {
  return (
    <div>
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
                  ${
                    (selector == 0 && selectorIndex == columnIndex) ||
                    (selector == 1 && selectorIndex == rowIndex)
                      ? "bg-gray-50"
                      : null
                  }`}
                  inputClassName={
                    (selector == 0 && selectorIndex == columnIndex) ||
                    (selector == 1 && selectorIndex == rowIndex)
                      ? "bg-gray-50"
                      : null
                  }
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
