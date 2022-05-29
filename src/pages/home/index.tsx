import { useState } from "react";

import type { Status } from "../../api";
import { Table } from "./table";
import { Filters } from "./filters";

import css from "./home.module.css";

export const Home = () => {
  const [filters, setFilters] = useState<Status[]>([]);

  return (
    <section className={css.main}>
      <div className={css.content}>
        <Filters
          value={filters}
          onChange={(statuses) => setFilters(statuses)}
        />
        <Table statuses={filters} />
      </div>
    </section>
  );
};
