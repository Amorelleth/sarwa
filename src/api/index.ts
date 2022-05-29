export type Status = "pending" | "approved" | "funded" | "closed";

export type Account = {
  balance: number;
  status: Status;
};

const data: Account[] = [
  {
    balance: 0.0,
    status: "pending",
  },
  {
    balance: 40000.0,
    status: "approved",
  },
  {
    balance: 0.0,
    status: "funded",
  },
  {
    balance: 0.0,
    status: "pending",
  },
  {
    balance: 0.0,
    status: "closed",
  },
  {
    balance: 10000.0,
    status: "funded",
  },
  {
    balance: 0.0,
    status: "pending",
  },
  {
    balance: 40000.0,
    status: "approved",
  },
  {
    balance: 0.0,
    status: "funded",
  },
  {
    balance: 0.0,
    status: "pending",
  },
  {
    balance: 0.0,
    status: "closed",
  },
  {
    balance: 10000.0,
    status: "funded",
  },
];

export const getAccounts = (): Promise<Account[]> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));

/*
 Status change availability

 Pending: Approved
 Approved: Funded / closed
 Funded: closed if balance === 0
 Closed: -
*/
export const changeStatus = ({ id, status }: { id: number; status: Status }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = data[id];

      if (!account) reject("account_does_not_exist");

      switch (account.status) {
        case "pending": {
          if (status !== "approved") reject("invalid_status");
          break;
        }
        case "approved": {
          if (status !== "funded" && status !== "closed")
            reject("invalid_status");
          break;
        }
        case "funded": {
          if (status !== "closed") reject("invalid_status");
          if (account.balance !== 0) reject("balance_should_be_zero");
          break;
        }
        case "closed":
          reject("account_is_closed");
      }

      account.status = status;
      resolve({ ...account });
    }, 1000);
  });
