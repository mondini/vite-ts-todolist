import Fulllist from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fulllist: Fulllist): void;
}

export default class ListTemplate implements DOMList {
    //singleton
    static instance: ListTemplate = new ListTemplate();

    ul: HTMLUListElement;

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }

    render(fulllist: Fulllist): void {
        this.clear();

        fulllist.list.forEach((item, index) => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;
            li.append(check);

            check.addEventListener("change", () => {
                item.checked = !item.checked;
                fulllist.save();
            });

            const label = document.createElement("label") as HTMLLabelElement;
            label.innerText = item.item;
            label.setAttribute("for", index.toString());
            li.append(label);

            const button = document.createElement(
                "button"
            ) as HTMLButtonElement;
            button.className = "button";
            button.innerText = "X";
            li.append(button);

            button.addEventListener("click", () => {
                fulllist.removeItem(item.id);
                this.render(fulllist);
            });

            this.ul.append(li);
        });
    }
}
