import { useMemo } from "react";
import type { Account, Status } from "../../../api";

import css from "./statistics.module.css";

export const Statistics = ({ accounts }: { accounts: Account[] }) => {
  const statistics = useMemo(() => {
    const result = {} as Record<Status, { total: number; amount: number }>;

    accounts.forEach(({ balance, status }) => {
      if (result[status]) {
        result[status].amount += 1;
        result[status].total += balance;
      } else {
        result[status] = {
          amount: 1,
          total: balance,
        };
      }
    });

    return result;
  }, [accounts]);

  return (
    <div className={css.statistics}>
      {Object.entries(statistics).map(([key, { total, amount }]) => (
        <div className={css.item} key={key}>
          <h3 className={css.status}>{key}</h3>
          <div className={css.info}>
            <span>Total balance: {total}</span>
            <span>Amount: {amount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
