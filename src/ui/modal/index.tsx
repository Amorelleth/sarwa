import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import css from "./modal.module.css";

export const Modal = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  return createPortal(
    <div className={css.modal}>
      <div className={css.overlay} onClick={close} />
      <div className={css.content}>{children}</div>
    </div>,
    document.body
  );
};
