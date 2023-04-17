import { ChangeEvent, FC, useState } from "react";
import { Responsive } from "./Responsive.client";
import { SortKey, sortOptionLabel } from "../constants/Sort";
import { Drawer } from "./Drawer.client";
import { categories } from "../constants/Categories";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  sort?: string;
  onClick: (params: { [key: string]: any }) => void;
}

export const Filters: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Responsive
        desktop={DesktopFilters}
        mobile={MobileFilters}
        props={{
          ...props,
          onOpenMolad: () => setOpen(true),
        }}
      />
      <FilterModal
        open={open}
        onClick={props.onClick}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

interface ResponsiveFiltersProps extends Props {
  onOpenMolad: () => void;
}

const DesktopFilters: FC<ResponsiveFiltersProps> = ({
  sort,
  onClick,
  onOpenMolad,
}) => (
  <div>
    <div className="border-b border-solid border-lightGray">
      <div className="wrapper flex justify-end">
        <div className="w-[150px] pb-1">
          <p className="text-xs font-outfit text-center">LIKE</p>
        </div>
        <div className="w-[150px] pb-1">
          <p className="text-xs font-outfit text-center">SORT</p>
        </div>
        <div className="w-[150px] pb-1">
          <p className="text-xs font-outfit text-center">FILTER</p>
        </div>
      </div>
    </div>
    <div className="border-b border-solid border-lightGray">
      <div className="wrapper flex justify-end">
        <div className="w-[150px] flex justify-center border-x border-solid border-lightGray">
          <LikeSelect />
        </div>
        <div className="w-[150px] flex justify-center border-r border-solid border-lightGray">
          <SortSelect
            defaltValue={sort}
            onChange={(e) => onClick({ sort: e.target.value })}
          />
        </div>
        <div className="w-[150px] flex justify-center border-r border-solid border-lightGray">
          <button onClick={onOpenMolad}>絞り込み</button>
        </div>
      </div>
    </div>
  </div>
);

const MobileFilters: FC<ResponsiveFiltersProps> = ({
  sort,
  onClick,
  onOpenMolad,
}) => (
  <div>
    <div className="grid grid-cols-3 border-b border-solid border-lightGray">
      <div className="pb-1">
        <p className="text-xs font-outfit text-center">LIKE</p>
      </div>
      <div className="pb-1">
        <p className="text-xs font-outfit text-center">SORT</p>
      </div>
      <div className="pb-1">
        <p className="text-xs font-outfit text-center">FILTER</p>
      </div>
    </div>
    <div className="grid grid-cols-3 border-b border-solid border-lightGray">
      <div className="flex justify-center border-r border-solid border-lightGray">
        <LikeSelect />
      </div>
      <div className="flex justify-center border-r border-solid border-lightGray">
        <SortSelect
          defaltValue={sort}
          onChange={(e) => onClick({ sort: e.target.value })}
        />
      </div>
      <div className="flex justify-center">
        <button onClick={onOpenMolad}>絞り込み</button>
      </div>
    </div>
  </div>
);

const LikeSelect = () => (
  <select className="py-4 text-center">
    <option value="">絞り込み</option>
  </select>
);

interface SortSelectProps {
  defaltValue?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect: FC<SortSelectProps> = ({ defaltValue, onChange }) => (
  <select
    defaultValue={defaltValue ?? ""}
    className="py-4 text-center"
    onChange={onChange}
  >
    <option value="">並べ替え</option>
    {Object.values(SortKey).map((sortKey) => (
      <option key={sortKey} value={sortKey}>
        {sortOptionLabel(sortKey)}
      </option>
    ))}
  </select>
);

interface FilterModalProps {
  open: boolean;
  onClick: (params: { [key: string]: any }) => void;
  onClose: () => void;
}

const FilterModal: FC<FilterModalProps> = ({ open, onClick, onClose }) => {
  const [selected, setSelected] = useState(new Set<string>());
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100 * 1000);

  return (
    <Drawer position="right" open={open} onClose={onClose}>
      <div>
        <div className="text-center py-4 border-b border-solid border-lightGray">
          <p className="text-xl font-semibold font-outfit">FILTER</p>
        </div>
        <div className="pt-4 px-5">
          <div className="mb-10">
            <div className="border-b border-solid border-black pb-1 mb-4">
              <p className="text-lg font-bold">カテゴリー</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-sm">{selected.size} 選択中</p>
              <button
                className="text-sm underline"
                onClick={() => setSelected(new Set())}
              >
                リセット
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {categories.map((category, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={category}
                    name={category}
                    value={category}
                    onChange={(e) =>
                      setSelected((preSelected) => {
                        const selected = new Set(preSelected);
                        if (e.target.checked) selected.add(e.target.value);
                        else selected.delete(e.target.value);
                        return selected;
                      })
                    }
                    checked={selected.has(category)}
                  />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-20">
            <div className="border-b border-solid border-black pb-1 mb-4">
              <p className="text-lg font-bold">価格</p>
            </div>
            <div className="flex justify-end mb-3">
              <button
                className="text-sm underline"
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(100 * 1000);
                }}
              >
                リセット
              </button>
            </div>
            <div>
              <div className="px-2 mb-5">
                <Slider
                  range
                  allowCross={false}
                  trackStyle={{
                    backgroundColor: "#000000",
                  }}
                  handleStyle={{
                    backgroundColor: "#000000",
                    border: "solid 1px #000000",
                  }}
                  value={[minPrice / 1000, maxPrice / 1000]}
                  onChange={(value) => {
                    if (typeof value === "number") return;
                    setMinPrice(value[0] * 1000);
                    setMaxPrice(value[1] * 1000);
                  }}
                />
              </div>
              <div className="grid grid-cols-11 items-center gap-2">
                <div className="col-span-5">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) * 1000)}
                    className="w-full border border-solid border-lightGray px-4 py-2 text-right"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <p className="font-bold">-</p>
                </div>
                <div className="col-span-5">
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) * 1000)}
                    className="w-full border border-solid border-lightGray px-4 py-2 text-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <button
              className="bg-dark text-white font-bold py-4 w-full"
              onClick={() => {
                onClose();
                onClick({
                  categories: selected.size
                    ? Array.from(selected).join("-")
                    : undefined,
                  minPrice: minPrice !== 0 ? minPrice : undefined,
                  maxPrice: maxPrice !== 100 * 1000 ? maxPrice : undefined,
                });
              }}
            >
              絞り込み
            </button>
          </div>
          <div>
            <button
              className="bg-dark text-white font-bold py-4 w-full"
              onClick={() => {
                setSelected(new Set());
                setMinPrice(0);
                setMaxPrice(100 * 1000);
              }}
            >
              全てリセット
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
