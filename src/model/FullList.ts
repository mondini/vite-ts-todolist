import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(item: ListItem): void;
    removeItem(id: string): void;
}

type ListItemPrivate = {
    _id: string;
    _item: string;
    _checked: boolean;
};

export default class Fulllist implements List {
    //singleton
    static instance: Fulllist = new Fulllist();

    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }

    set list(list: ListItem[]) {
        this._list = list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return;

        const parsedList: ListItemPrivate[] = JSON.parse(storedList);

        parsedList.forEach((item) => {
            const newListItem = new ListItem(
                item._id,
                item._item,
                item._checked
            );
            Fulllist.instance.addItem(newListItem);
        });
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(item: ListItem): void {
        this._list.push(item);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save();
    }
}
