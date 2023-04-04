import Fulllist from "./model/FullList";
import ListTemplate from "./template/listTemplate";
import ListItem from "./model/ListItem";

const initApp = (): void => {
    const fulllist = Fulllist.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById(
        "itemEntryForm"
    ) as HTMLFormElement;

    itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) return;

        const itemId: number = fulllist.list.length
            ? parseInt(fulllist.list[fulllist.list.length - 1].id) + 1
            : 1;

        const item = new ListItem(itemId.toString(), newEntryText);
        fulllist.addItem(item);
        template.render(fulllist);
        input.value = "";
    });

    const clearItens = document.getElementById(
        "clearItemsButton"
    ) as HTMLButtonElement;
    clearItens.addEventListener("click", (): void => {
        fulllist.clearList();
        template.clear();
    });

    fulllist.load();
    template.render(fulllist);
};

document.addEventListener("DOMContentLoaded", initApp);
