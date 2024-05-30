"use client"
import React, { useEffect, ReactNode } from 'react'
import { Modal, Input, ModalContent, Listbox, ListboxItem, Divider, ScrollShadow } from "@nextui-org/react"

interface Item {
    id: number
    name: string
    icon?: ReactNode
}

interface MultiSelectModalProps {
    items: Item[] // list of items to display
    searchValue: string // search value
    selectedKeys: Set<number> // set of selected keys
    setSelectedKeys: (keys: Set<number>) => void // function to set the selected keys
    setSearchValue: (value: string) => void // function to set the search value
    createFunction: (newItem: string) => Promise<void> // function to create a new item
    isCreating: boolean // if the create new item button is in the loading state
    loadingIcon: ReactNode // icon to display in the create new item button when loading
    isInputDisabled: boolean // if the search input is disabled
    searchPlaceholder: string // placeholder for the search input
    isDissmissable: boolean // if the modal can be dismissed by clicking outside
    createIcon: ReactNode // icon to display in the create new item button
    allowCreate: boolean // shows the create new item button
    createText: string // text to display in the create new item button
    // deals with the modal state
    onOpen: () => void
    onOpenChange: (isOpen: boolean) => void
    isOpen: boolean
}




const MultiSelectModal: React.FC<MultiSelectModalProps> = ({
    items, searchValue, selectedKeys, setSelectedKeys, setSearchValue, createFunction, isCreating, isInputDisabled, isDissmissable, loadingIcon, searchPlaceholder, createIcon, allowCreate, createText, onOpen, onOpenChange, isOpen,
}) => {


    const [previousSearchValue, setPreviousSearchValue] = React.useState("")
    const [filteredItems, setFilteredItems] = React.useState<Item[]>(items)

    const trimmedSearchValue = searchValue.trim().toLowerCase()
    const showDivider = allowCreate && filteredItems.length > 0 && trimmedSearchValue !== "" && !items.some(item => item.name.toLowerCase() === trimmedSearchValue)
    const showCreateNew = allowCreate && !items.map(item => item.name.toLowerCase()).includes(searchValue.toLowerCase()) && searchValue.trim() !== ""



    useEffect(() => {
            const searchAndReorderItems = () => {
                let updatedItems = items;
    
                if (trimmedSearchValue !== "" || (trimmedSearchValue === "" && previousSearchValue !== "")) {
                    // @ts-ignore
                    const selectedItems = updatedItems.filter((item) => selectedKeys.has(item.id.toString()));
                    // @ts-ignore
                    const unselectedItems = updatedItems.filter((item) => !selectedKeys.has(item.id.toString()));
                    
                    if (trimmedSearchValue === "") {
                        updatedItems = [...selectedItems, ...unselectedItems];
                    } else {
                        updatedItems = updatedItems.filter((item) =>
                            item.name.toLowerCase().includes(trimmedSearchValue)
                        );
                    }
                } else {
                    updatedItems = items.filter((item) =>
                        item.name.toLowerCase().includes(trimmedSearchValue)
                    );
                }
    
                setFilteredItems(updatedItems);
            };
    
            searchAndReorderItems();
            setPreviousSearchValue(searchValue);
        }, [searchValue, items]);





    return (
            <Modal
                backdrop='blur'
                hideCloseButton
                isDismissable={isDissmissable}
                isKeyboardDismissDisabled={!isDissmissable}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div className="w-full py-2">
                            <Input
                                isDisabled={isInputDisabled}
                                value={searchValue}
                                onValueChange={setSearchValue}
                                className='mb-1'
                                placeholder={searchPlaceholder}
                                autoFocus
                                labelPlacement='inside'
                                size="lg"
                                variant="underlined"
                                classNames={{ input: 'pl-[10px] font-light' }}
                            />
                            <div className="flex flex-col gap-2 w-full">
                                <ScrollShadow className="flex h-full max-h-[200px] sm:max-h-[600px] flex-col overflow-y-auto">
                                    <Listbox
                                        variant="faded"
                                        aria-label="Listbox menu with icons"
                                        selectionMode="multiple"
                                        selectedKeys={selectedKeys}
                                        // @ts-ignore
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        {filteredItems.map((item) => (
                                            <ListboxItem
                                                key={item.id}
                                                startContent={item.icon}
                                            >
                                                {item.name}
                                            </ListboxItem>
                                        ))}
                                    </Listbox>
                                </ScrollShadow>

                                {showDivider && <Divider />}

                                {showCreateNew && (
                                    <Listbox
                                        disabledKeys={isCreating ? ['create'] : []}
                                        onAction={() => createFunction(searchValue)}
                                        variant="faded"
                                        aria-label="Listbox menu with icons"
                                    >
                                        <ListboxItem
                                            className='font-thin'
                                            key='create'
                                            startContent={createIcon}
                                            endContent={isCreating ? (
                                               loadingIcon
                                            ) : null}
                                        >
                                            <p className='font-normal ml-1'>{createText} <span className='font-normal text-default-500'>"{searchValue.trim()}"</span></p>
                                        </ListboxItem>
                                    </Listbox>
                                )}
                            </div>
                        </div>
                    )}
                </ModalContent>
            </Modal>
    )
}

export default MultiSelectModal