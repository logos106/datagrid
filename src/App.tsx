import React, { forwardRef, useMemo, useState } from "react";
import "./App.css";
import DataGrid, { Column, SelectColumn, CheckboxFormatterProps, TextEditor, SortColumn } from "react-data-grid";
import Switch from "./Components/Swtich";
import SingleSelect, { SingleSelectType } from "./Components/SingleSelect";
import AddModal from "./Components/AddModal";

//An interface for row.
export interface IRow {
   id: number;
   boolean: boolean;
   text: string;
   url: string;
   singleSelect: SingleSelectType;
   onClick?: () => void;
   onClickOnCheckbox?: (checked: boolean) => void;
   checked?: boolean;
}

//Rendering details of all the columns
const columns: Column<IRow>[] = [
   {
      ...SelectColumn,
      //@ts-ignore
      formatter: (props) =>
         props.row.id === -1 ? (
            <div onClick={props.row.onClick}>
               <i className="fa-solid fa-circle-plus"></i>
            </div>
         ) : (
            <CheckboxFormatter
               checked={Boolean(props.row.checked)}
               onChange={(checked) => props.row.onClickOnCheckbox && props.row.onClickOnCheckbox(checked)}
            ></CheckboxFormatter>
         ),
   },
   {
      key: "id",
      width: 40,
      maxWidth: 40,
      minWidth: 40,
      cellClass: "id-cell",
      formatter: (props) => (props.row.id === -1 ? null : <>{props.row.id}</>),
      name: "ID",
      editable: (props) => props.boolean,
      editor: TextEditor,
      sortable: true,
   },
   {
      headerRenderer: ({ column, onSort }) => (
         <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
               <i className="fa-solid fa-toggle-off me-2"></i>
               {column.name}
            </div>
            <i className="fa-solid fa-angle-down cursor-pointer" onClick={() => onSort(false)}></i>
         </div>
      ),
      key: "boolean",
      name: "Boolean",
      cellClass: "boolean-cell",
      width: "15%",

      editable: (props) => props.boolean,
      formatter: (props) =>
         props.row.id === -1 ? null : (
            <Switch
               value={props.row.boolean}
               onChange={(val) => props.onRowChange({ ...props.row, boolean: val })}
            ></Switch>
         ),
      sortable: true,
   },
   {
      headerRenderer: ({ column, onSort }) => (
         <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 25.531 25.531"
                  xmlSpace="preserve"
                  className="me-2"
                  style={{ width: "15px", height: "15px", fill: "#747479" }}
               >
                  <g>
                     <g id="c179_text">
                        <path d="M25.198,6.273c-0.014,0.23-0.045,0.389-0.087,0.467c-0.045,0.084-0.176,0.145-0.392,0.183    c-0.469,0.104-0.781-0.074-0.935-0.533C23.239,4.7,22.59,3.578,21.84,3.016c-1.041-0.773-2.862-1.161-5.469-1.161    c-1.054,0-1.633,0.115-1.734,0.343c-0.036,0.075-0.057,0.184-0.057,0.324v18.999c0,0.812,0.188,1.383,0.571,1.709    c0.382,0.32,1.069,0.731,2.201,0.999c0.483,0.103,0.97,0.2,1.034,0.239c0.46,0,0.504,1.057-0.376,1.057    c-0.025,0.016-10.375-0.008-10.375-0.008s-0.723-0.439-0.074-1.023c0.271-0.121,0.767-0.343,0.767-0.343s1.83-0.614,2.211-1.009    c0.434-0.445,0.648-1.164,0.648-2.154V2.521c0-0.369-0.229-0.585-0.687-0.647c-0.049-0.015-0.425-0.02-1.122-0.02    c-2.415,0-4.191,0.418-5.338,1.259C3.176,3.735,2.411,4.877,1.737,6.545C1.52,7.065,1.22,7.234,0.84,7.058    C0.408,6.957,0.251,6.719,0.363,6.353c0.445-1.374,0.668-3.31,0.668-5.814c0-0.292,0.387-0.586,1.163-0.533L23.56,0.064    c0.709-0.104,1.096,0.012,1.16,0.343C25.076,2.096,25.234,4.052,25.198,6.273z" />
                     </g>
                     <g id="Capa_1_282_"></g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
               </svg>

               {column.name}
            </div>
            <i className="fa-solid fa-angle-down cursor-pointer" onClick={() => onSort(false)}></i>
         </div>
      ),
      key: "text",
      name: "Text",
      editor: TextEditor,
      editable: (props) => props.boolean,
      sortable: true,
   },
   {
      key: "url",
      name: "URL",
      width: "35%",
      formatter: (props) => (props.row.id === -1 ? null : <a href={props.row.url}>{props.row.url}</a>),
      editor: TextEditor,
      editable: (props) => props.boolean,
      headerRenderer: (props) => (
         <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
               <svg className="me-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                  <path d="M0 0h24v24H0z" fill="transparent" />
                  <path
                     fill="currentColor"
                     d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                  />
               </svg>
               {props.column.name}
            </div>
            <i className="fa-solid fa-angle-down cursor-pointer" onClick={() => props.onSort(false)}></i>
         </div>
      ),
   },
   {
      key: "singleSelect",
      name: "Single Select",
      cellClass: "select-cell",

      editor: (p) => (
         <select
            className="select-class"
            onChange={(e) => p.onRowChange({ ...p.row, singleSelect: e.target.value as SingleSelectType }, true)}
            autoFocus
            value={p.row.singleSelect}
         >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">high</option>
         </select>
      ),
      editorOptions: { editOnClick: true },
      formatter: (props) => (props.row.id === -1 ? null : <SingleSelect value={props.row.singleSelect}></SingleSelect>),
      headerRenderer: (props) => (
         <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
               <svg style={{ width: 22, height: 22 }} viewBox="0 0 24 24" className="me-2">
                  <path
                     fill="currentColor"
                     d="M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z"
                  />
               </svg>
               {props.column.name}
            </div>

            <i className="fa-solid fa-angle-down cursor-pointer" onClick={() => props.onSort(false)}></i>
         </div>
      ),
      editable: (props) => props.boolean,
   },
];

//Dummy data for initial rows
const initialRows: readonly IRow[] = [
   { id: 0, boolean: true, text: "Abaraham", url: "https://www.google.com", singleSelect: "low" },
   { id: 1, boolean: true, text: "Floyd Brown", url: "https://linkedin.com", singleSelect: "high" },
   { id: 2, boolean: true, text: "Floyd", url: "https://www.google.com", singleSelect: "medium" },
   { id: 3, boolean: true, text: "Xero", url: "https://www.google.com", singleSelect: "medium" },
   { id: 4, boolean: true, text: "Jhn", url: "https://www.google.com", singleSelect: "high" },
   { id: 5, boolean: true, text: "Floyd Brown", url: "https://www.google.com", singleSelect: "high" },
];

//The table which shows priortity of each select elm.
const priorityTable: { [k in SingleSelectType]: number } = { low: 0, high: 2, medium: 1 };

type Comparator = (a: IRow, b: IRow) => number;

//The logic of comparison of sorting
function getComparator(sortColumn: string): Comparator {
   switch (sortColumn) {
      case "id":
         return (a, b) => {
            return a[sortColumn] - b[sortColumn];
         };
      case "boolean":
         return (a, b) => {
            return Number(a[sortColumn]) - Number(b[sortColumn]);
         };
      case "text":
         return (a, b) => {
            return a[sortColumn].localeCompare(b[sortColumn]);
         };
      case "url":
         return (a, b) => {
            return a[sortColumn].localeCompare(b[sortColumn]);
         };
      case "singleSelect":
         return (a, b) => {
            return priorityTable[a[sortColumn]] - priorityTable[b[sortColumn]];
         };
      default:
         return (a, b) => {
            return 0;
         };
   }
}

function App() {
   //Data for sorting and selection
   const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
   const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
   const [rows, setRows] = useState<readonly IRow[]>(initialRows);

   //To hide add and show modal
   const [showModal, setShowModal] = useState(false);

   //To add new row.
   const addNewRow = (props: IRow) => {
      setRows([...rows, { ...props, id: rows.length }]);
   };

   //To handle sorting
   const sortedRows = useMemo((): readonly IRow[] => {
      if (sortColumns.length === 0) return rows;

      return [...rows].sort((a, b) => {
         for (const sort of sortColumns) {
            const comparator = getComparator(sort.columnKey);
            const compResult = comparator(a, b);
            if (compResult !== 0) {
               return sort.direction === "ASC" ? compResult : -compResult;
            }
         }
         return 0;
      });
   }, [rows, sortColumns]);

   //To manage selected of inividual rows
   const onClickOnCheckbox = (checked: boolean, id: number) => {
      const newSet = new Set(selectedRows);
      if (checked) {
         newSet.add(id);
      } else {
         newSet.delete(id);
      }
      setSelectedRows(newSet);
   };

   return (
      <>
         <AddModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleShow={() => setShowModal(true)}
            addNewRow={addNewRow}
         ></AddModal>
         <DataGrid
            columns={columns}
            rows={[
               ...sortedRows
                  .filter((x) => x.id !== -1)
                  .map((x) => ({
                     ...x,
                     onClickOnCheckbox: (checked: boolean) => onClickOnCheckbox(checked, x.id),
                     checked: selectedRows.has(x.id),
                  })),
               //To add a last default row with +
               { onClick: () => setShowModal(true), boolean: false, id: -1, singleSelect: "high", text: "", url: "" },
            ]}
            onRowsChange={setRows}
            rowKeyGetter={(row: IRow) => row.id}
            onSelectedRowsChange={setSelectedRows}
            components={{ checkboxFormatter: CheckboxFormatterHeader }}
            selectedRows={selectedRows}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            defaultColumnOptions={{ sortable: true, resizable: true }}
         ></DataGrid>
      </>
   );
}

//Checkbox component for the header
const CheckboxFormatterHeader = forwardRef<HTMLInputElement, CheckboxFormatterProps>(function CheckboxFormatter(
   { disabled, onChange, checked, ...props },
   ref
) {
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
   }

   return <input type="checkbox" ref={ref} {...props} onChange={handleChange} />;
});

//Checkbox component for the rows
const CheckboxFormatter = forwardRef<HTMLInputElement, CheckboxFormatterProps & { checked: boolean }>(
   function CheckboxFormatter({ disabled, onChange, checked, ...props }, ref) {
      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
         onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
      }

      return <input type="checkbox" ref={ref} checked={checked} {...props} onChange={handleChange} />;
   }
);
export default App;
