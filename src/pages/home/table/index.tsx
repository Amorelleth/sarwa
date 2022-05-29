import classnames from "classnames";
import { useMemo, useState } from "react";

import { Statistics } from "../statistics";
import { StatusChangeModal } from "../status-change";
import { getAccounts, type Account, type Status } from "../../../api";
import { useRequest } from "../../../api/request";
import { changeStatus } from "../../../api";

import css from "./table.module.css";

const Content = ({
  accounts,
  statuses,
  refetch,
}: {
  accounts: Account[];
  statuses: Status[];
  refetch: () => void;
}) => {
  const [accountToEdit, setAccountToEdit] = useState<{
    id: number;
    account: Account;
  }>();

  const filtered = useMemo(
    () =>
      statuses.length
        ? accounts.filter(({ status }) => statuses.indexOf(status) !== -1)
        : accounts,
    [statuses, accounts]
  );

  return (
    <div className={css.table}>
      {filtered.length ? (
        <>
          <div className={classnames(css.row, css.disabled)}>
            <h3 className={classnames(css.id, css.th)}>Id</h3>
            <h3 className={css.th}>Status</h3>
            <h3 className={classnames(css.balance, css.th)}>Balance</h3>
          </div>
          {filtered.map((account, index) => (
            <div
              key={index}
              title="Change status"
              className={css.row}
              onClick={() => setAccountToEdit({ account, id: index })}
            >
              <div className={css.id}>{index}</div>
              <div>{account.status}</div>
              <div className={css.balance}>{account.balance}</div>
            </div>
          ))}
        </>
      ) : (
        <>Empty list</>
      )}
      {accountToEdit && (
        <StatusChangeModal
          {...accountToEdit.account}
          close={() => setAccountToEdit(undefined)}
          onChange={(status) => {
            changeStatus({ id: accountToEdit.id, status });
            refetch();
          }}
        />
      )}
    </div>
  );
};

export const Table = ({ statuses }: { statuses: Status[] }) => {
  const { data, isLoading, isError, refetch } = useRequest(getAccounts);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Something went wrong</>;
  }

  return (
    <>
      {data?.length && <Statistics accounts={data} />}
      {data && (
        <Content accounts={data} statuses={statuses} refetch={refetch} />
      )}
    </>
  );
};
