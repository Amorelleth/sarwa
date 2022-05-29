import { useMemo } from "react";
import Select from "react-select";

import type { Status } from "../../../api";

const options = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "funded", label: "Funded" },
  { value: "closed", label: "Closed" },
] as readonly {
  readonly value: Status;
  readonly label: string;
}[];

export const Filters = ({
  value,
  onChange,
}: {
  value: Status[];
  onChange: (value: Status[]) => void;
}) => {
  const selected = useMemo(
    () => options.filter((option) => value.indexOf(option.value) !== -1),
    [value]
  );

  return (
    <Select
      isMulti
      placeholder="Account status"
      value={selected}
      onChange={(options) => onChange(options.map(({ value }) => value))}
      options={options}
    />
  );
};
