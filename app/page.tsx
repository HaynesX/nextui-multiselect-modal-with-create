"use client"
import React from "react";
import { Icon } from "@iconify/react"
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import MultiSelectModal from "@/components/MultiSelectModal";
import { useDisclosure } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {

  const [items, setItems] = React.useState([
    { id: 1, name: "item 1", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 2, name: "item 2", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 3, name: "item 3", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 4, name: "item 4", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 5, name: "item 5", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 6, name: "item 6", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 7, name: "item 7", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 8, name: "item 8", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 9, name: "item 9", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
    { id: 10, name: "item 10", icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" /> },
  ]);

  const [searchValue, setSearchValue] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const [isDissmissable, setIsDissmissable] = React.useState(true);
  const [selectedKeys, setSelectedKeys] = React.useState<Set<number>>(new Set([]))
  const createIcon =  <Icon icon="majesticons:plus-line" width={20} className="text-default-400" />;
  const createText = "Create new:";

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const addNewItemToDB = async (newItem: string) => {
    setIsCreating(true)
    setIsInputDisabled(true)
    setIsDissmissable(false)

    try {
        // Add new item to DB
        console.log('Adding new item to DB:', newItem)
        // fake delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const newId = items.length + 1

        setItems((prevItems) => [
            ...prevItems,
            {
                id: newId,
                name: newItem,
                icon: <Icon icon="hugeicons:folder-01" width={20} className="text-default-400" />
            }
        ])

        // add to selected keys
        // @ts-ignore
        setSelectedKeys((prevSelectedKeys) => new Set([...prevSelectedKeys, newId.toString()]))
        

        


    } catch (error) {
        console.error('Error adding new item to DB:', error)
    } finally {
        setIsCreating(false)
        setIsInputDisabled(false)
        setIsDissmissable(true)
        setSearchValue("")
    }
}









  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h2 className={subtitle({ class: "mt-4" })}>
          MultiSelectModal
        </h2>
        <h3 className="">By Brandon H</h3>
        <div className="flex flex-row gap-2 mt-4 mb-8 items-center justify-center">
          <Button onPress={
            () => window.open('https://github.com/HaynesX/nextui-multiselect-modal-with-create', '_blank')
          } className="" variant="flat" size="sm">
            Visit Github
          </Button>
          <ThemeSwitch />
        </div>
        
      </div>







      <div className="flex gap-3">
        <Button
                onPress={onOpen}
                className="ml-auto mt-2 rounded-[6px] p-3 text-default-400"
                variant="bordered"
                endContent={
                    <Icon
                        className="text-default-400 [&>g]:stroke-[2px]"
                        icon="solar:tag-horizontal-bold-duotone"
                        width={20}
                    />
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
          loadingIcon={ <Icon icon="line-md:loading-loop" width={20} className="text-default-400" />}
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

     
    </section>
  );
}
