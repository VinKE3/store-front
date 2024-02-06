"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import { Color, Size, Product } from "@/types";

import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
  products: Product[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors,
  products,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const uniqueProductSizes = products
    .flatMap((product) => product.size)
    .reduce((unique: any, size) => {
      return unique.find((item: any) => item.id === size.id)
        ? unique
        : [...unique, size];
    }, []);

  const uniqueProductColors = products
    .flatMap((product) => product.color)
    .reduce((unique: any, color) => {
      return unique.find((item: any) => item.id === color.id)
        ? unique
        : [...unique, color];
    }, []);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filtro
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            <div className="p-4">
              <Filter
                valueKey="sizeId"
                name="Tamaños"
                data={uniqueProductSizes}
              />
              <Filter
                valueKey="colorId"
                name="Colores"
                data={uniqueProductColors}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
