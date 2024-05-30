# MultiSelectModal | NextUI

This project is a Next.js application with a focus on a `MultiSelectModal` component.



https://github.com/HaynesX/nextui-multiselect-modal-with-create/assets/99973461/a7ba6a84-d177-492e-931f-36ccf5471828



## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HaynesX/nextui-multiselect-modal-with-create.git
   cd nextui-multiselect-modal-with-create
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

## Live Demo Website: [Click Here](https://nextui-multiselect-modal-with-create.vercel.app/)

## Key Files

- `@/components/MultiSelectModal.tsx`
- `@/app/page.tsx`

## MultiSelectModal Component

The `MultiSelectModal` component is designed to display a modal with a list of selectable items. Here are some key features:

- **Search Functionality:** Users can search for items within the modal.
- **Create New Items:** If enabled, users can create new items if their search term does not match any existing items.
- **Selection:** Users can select multiple items from the list.
- **Dynamic Content:** The modal updates its content based on the search value and selected items.

### Props

- `items`: List of items to display.
- `searchValue`: Current search value.
- `selectedKeys`: Set of selected item keys.
- `setSelectedKeys`: Function to update selected keys.
- `setSearchValue`: Function to update search value.
- `createFunction`: Function to create a new item.
- `isCreating`: Indicates if the create new item button is in a loading state.
- `loadingIcon`: Icon to display when loading.
- `isInputDisabled`: Indicates if the search input is disabled.
- `searchPlaceholder`: Placeholder text for the search input.
- `isDissmissable`: Indicates if the modal can be dismissed by clicking outside.
- `createIcon`: Icon to display in the create new item button.
- `allowCreate`: Whether to show the create new item button.
- `createText`: Text to display in the create new item button.
- `onOpen`: Function to handle modal open state.
- `onOpenChange`: Function to handle changes in the modal's open state.
- `isOpen`: Indicates if the modal is currently open.

### Example Usage

The modal can be used within the `page.tsx` file as shown below:

```jsx
"use client"
import React from "react";
import { Icon } from "@iconify/react";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import MultiSelectModal from "@/components/MultiSelectModal";
import { useDisclosure } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  const [items, setItems] = React.useState([
    // List of items
  ]);

  const [searchValue, setSearchValue] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const [isDissmissable, setIsDissmissable] = React.useState(true);
  const [selectedKeys, setSelectedKeys] = React.useState<Set<number>>(new Set([]));
  const createIcon = <Icon icon="majesticons:plus-line" width={20} className="text-default-400" />;
  const createText = "Create new:";

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addNewItemToDB = async (newItem: string) => {
    // Function to add new item
  };

  return (
      <div className="flex gap-3">
        <Button
          onPress={onOpen}
          className="ml-auto mt-2 rounded-[6px] p-3 text-default-400"
          variant="bordered"
          endContent={
            <Icon className="text-default-400 [&>g]:stroke-[2px]" icon="solar:tag-horizontal-bold-duotone" width={20} />
          }
        >
          Add Watchlists
        </Button>
        <MultiSelectModal
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchPlaceholder="Add watchlist..."
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          createFunction={addNewItemToDB}
          isCreating={isCreating}
          loadingIcon={<Icon icon="line-md:loading-loop" width={20} className="text-default-400" />}
          isInputDisabled={isInputDisabled}
          isDissmissable={isDissmissable}
          createIcon={createIcon}
          allowCreate={true}
          createText={createText}
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>

  );
}
```

## Work in Progress

This project is a work in progress. Feel free to fork the repository and contribute.

---

By Brandon H
