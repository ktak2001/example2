import { FC } from "react";
import {
  useProductOptions,
  ProductPrice,
  BuyNowButton,
  AddToCartButton,
} from "@shopify/hydrogen";
import { gql, DocumentType } from "../../gql/index";

const ProductFormFragment = gql(`
  fragment ProductForm on Product {
    title
    variants(first: 100) {
      nodes {
        id
        availableForSale
        compareAtPriceV2 {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
      }
    }
  }
`);

interface Props {
  product: DocumentType<typeof ProductFormFragment>;
}

export const ProductForm: FC<Props> = ({ product }) => {
  const { options, selectedVariant } = useProductOptions();

  return (
    <section>
      <h1>{product.title}</h1>
      <form className="grid gap-10">
        {
          <div className="grid gap-4">
            {options?.map(({ name, values }) => {
              if (values.length === 1) {
                return null;
              }
              return (
                <div
                  key={name}
                  className="flex flex-wrap items-baseline justify-start gap-6"
                >
                  <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                    {name}
                  </legend>
                  <div className="flex flex-wrap items-baseline gap-4">
                    <OptionRadio name={name} values={values} />
                  </div>
                </div>
              );
            })}
          </div>
        }
        <div>
          {selectedVariant && (
            <ProductPrice
              className="text-gray-500 line-through text-lg font-semibold"
              priceType="compareAt"
              variantId={selectedVariant.id}
              data={product}
            />
          )}
          {selectedVariant && (
            <ProductPrice
              className="text-gray-900 text-lg font-semibold"
              variantId={selectedVariant.id}
              data={product}
            />
          )}
        </div>
        <div className="grid items-stretch gap-4">
          <PurchaseMarkup />
        </div>
      </form>
    </section>
  );
};

const PurchaseMarkup = () => {
  const { selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;

  return (
    <>
      <AddToCartButton
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={isOutOfStock}
      >
        <span className="bg-black text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full">
          {isOutOfStock ? "Sold out" : "Add to cart"}
        </span>
      </AddToCartButton>
      {isOutOfStock ? (
        <span className="text-black text-center py-3 px-6 border rounded-sm leading-none ">
          Available in 2-3 weeks
        </span>
      ) : (
        <BuyNowButton variantId={selectedVariant.id}>
          <span className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none border w-full">
            Buy it now
          </span>
        </BuyNowButton>
      )}
    </>
  );
};

const OptionRadio = ({ values, name }) => {
  const { selectedOptions, setSelectedOption } = useProductOptions();

  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? "border-gray-500" : "border-neutral-50"
              }`}
            >
              {value}
            </div>
          </label>
        );
      })}
    </>
  );
};
