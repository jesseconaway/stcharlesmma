export default function sortItems(items, path, order) {
    let sortedItems;
    if (order === "asc") {
        sortedItems = items.sort((a, b) => {
            if (a[path] < b[path]) {
                return -1;
            } else return 1;
        });
    } else {
        sortedItems = items.sort((a, b) => {
            if (a[path] > b[path]) {
                return -1;
            } else return 1;
        })
    }
    return sortedItems;
};