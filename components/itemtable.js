"use client";
import { useRouter } from "next/navigation";
import Button from "./button";
import SVG from "./svg";

function Table({ children, className }) {
  return (
    <div
      className={`overflow-x-scroll rounded-lg drop-shadow-sm border-2 border-gray-200 ${className}`}
    >
      <table className="table-auto w-full border-none rounded-lg min-w-full whitespace-no-wrap">
        {children}
      </table>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody className="bg-white">{children}</tbody>;
}

function TableRow({ children, onClick, className }) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-gray-50 cursor-pointer focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2 ${className}`}
    >
      {children}
    </tr>
  );
}

function TableHeadField({ children, className, minWidth }) {
  return <th className={`p-3 min-w-[${minWidth}] ${className}`}>{children}</th>;
}

function TableBodyField({ children, className }) {
  return <td className={`px-3 py-1 ${className}`}>{children}</td>;
}

export function ItemTable({
  className,
  columns,
  columnNames,
  columnClasses,
  columnWidths,
  items,
  onClickRoute,
  deleteItem,
  assignItem,
  unassignItem,
  addItem,
  hiddenAttribute = false,
}) {
  const router = useRouter();

  return (
    <Table className={className}>
      <TableHead>
        {columnNames &&
          columnNames.map((columnName, index) => (
            <TableHeadField
              className={columnClasses[index]}
              minWidth={columnWidths[index]}
              key={index}
            >
              {columnName}
            </TableHeadField>
          ))}
        <TableHeadField className="text-right" minWidth="400px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item) =>
            (hiddenAttribute && !item.hidden) || !hiddenAttribute ? (
              <TableRow
                onClick={
                  onClickRoute
                    ? () => router.push(`/${onClickRoute}${item.id}`)
                    : null
                }
                key={item.id}
              >
                {columns &&
                  columns.map((column, index) => (
                    <TableBodyField
                      className={columnClasses[index]}
                      minWidth={columnWidths[index]}
                      key={index}
                    >
                      {item[column]}
                    </TableBodyField>
                  ))}
                <TableBodyField>
                  {deleteItem ? (
                    <Button
                      className="float-right ml-2 z-10"
                      border={false}
                      onClick={(event) => deleteItem(event, item.id)}
                    >
                      <SVG src="/delete.svg" className="mr-2" />
                      Löschen
                    </Button>
                  ) : null}
                  {assignItem && unassignItem ? (
                    item.assigned ? (
                      <Button
                        className="float-right ml-2 z-10"
                        border={false}
                        onClick={() => unassignItem(item.id)}
                      >
                        <SVG src="/x-mark.svg" className="mr-2" />
                        Zuweisung entfernen
                      </Button>
                    ) : (
                      <Button
                        className="float-right ml-2 z-10"
                        border={false}
                        onClick={() => assignItem(item.id)}
                      >
                        <SVG src="/check.svg" className="mr-2" />
                        Zuweisen
                      </Button>
                    )
                  ) : null}
                  {addItem ? (
                    <Button
                      className="float-right ml-2 z-10"
                      border={false}
                      onClick={() => addItem(item)}
                    >
                      <SVG src="/add.svg" className="mr-2" />
                      Hinzufügen
                    </Button>
                  ) : null}
                </TableBodyField>
              </TableRow>
            ) : null
          )}
      </TableBody>
    </Table>
  );
}
