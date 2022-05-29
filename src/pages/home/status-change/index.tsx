import Select from "react-select";
import { useState, type ReactNode } from "react";

import type { Account, Status } from "../../../api";
import { Modal } from "../../../ui/modal";

import css from "./status-change.module.css";

const ChangeStatusModal = ({
  title,
  children,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}: {
  title: string;
  children?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal close={onCancel}>
      <div className={css.modal}>
        <h3 className={css.title}>{title}</h3>
        {children}
        <div className={css.buttons}>
          {onConfirm && (
            <button
              className={css.save}
              onClick={() => {
                onConfirm();
                onCancel();
              }}
            >
              {confirmText}
            </button>
          )}
          <button className={css.cancel} onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

type Option = {
  readonly value: Status;
  readonly label: string;
};

const ChangeStatusApproved = ({
  onChange,
  onCancel,
}: {
  onChange: (status: Status) => void;
  onCancel: () => void;
}) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <ChangeStatusModal
      title="Change status"
      onCancel={onCancel}
      confirmText="Save"
      onConfirm={() => {
        if (selected) {
          onChange(selected?.value);
        }
      }}
    >
      <Select
        placeholder="New account status"
        value={selected}
        onChange={(option) => setSelected(option)}
        options={
          [
            { value: "funded", label: "Funded" },
            { value: "closed", label: "Closed" },
          ] as readonly Option[]
        }
      />
    </ChangeStatusModal>
  );
};

export const StatusChangeModal = ({
  status,
  balance,
  close,
  onChange,
}: Account & { onChange: (status: Status) => void; close: () => void }) => {
  switch (status) {
    case "pending":
      return (
        <ChangeStatusModal
          onCancel={close}
          onConfirm={() => onChange("approved")}
          title="Approve this account?"
        />
      );
    case "approved":
      return <ChangeStatusApproved onCancel={close} onChange={onChange} />;
    case "funded": {
      const isZeroBalance = balance === 0;
      return (
        <ChangeStatusModal
          onCancel={close}
          onConfirm={isZeroBalance ? () => onChange("closed") : undefined}
          title={
            isZeroBalance
              ? "Close this account?"
              : "You can't close funded account with nonzero balance."
          }
        />
      );
    }
    case "closed":
      return (
        <ChangeStatusModal
          onCancel={close}
          title="You can't change status of closed account."
        />
      );
  }
};
