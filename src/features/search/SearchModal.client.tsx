import { FC } from "react";
import { Drawer } from "../../components/Drawer.client";
import { Keywords } from "../home/Keywords.client";
import { SearchForm } from "./SearchForm.client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SearchModal: FC<Props> = ({ open, onClose }) => (
  <Drawer position="top" open={open} onClose={onClose}>
    <div className="px-5 pb-10">
      <div className="mb-7">
        <SearchForm onClick={onClose} />
      </div>
      <div>
        <Keywords />
      </div>
    </div>
  </Drawer>
);
